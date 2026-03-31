// workers/emailWorker.js
const { Worker } = require("bullmq");
const redis = require("../redis");
const { pgClient } = require("../db");
const config = require("config");
const googleEmailId = config.get("APP.EMAIL.USER");
const googlePass = config.get("APP.EMAIL.PASS");
const nodemailer = require("nodemailer");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: config.get("APP.AWS.REGION"),
  credentials: {
    accessKeyId: config.get("APP.AWS.ACCESS_KEY"),
    secretAccessKey: config.get("APP.AWS.SECREATE_KEY"),
  }
});

let transporter = null

const worker = new Worker(
  "bulk-email",
  async (job) => {
    console.log("Processing job:", job.data);

    const { app_email, app_pass, campaignId, hrIds, templateId, resumePath } = job.data;
    let sendCount = 1;
    console.log(app_email, app_pass, resumePath);

     transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: app_email,
    pass: app_pass,
  },
});

    // 🔥 Send emails here
    for (const hrId of hrIds) {
      console.log(`Processing HR ID: ${hrId.hr_id} with status ${hrId.status}`);
      // await sendEmail(...)

      const response = await pgClient(
        "select * from email_campaign_get_job_info($1, $2, $3, $4)",
        [hrId.hr_id, campaignId, templateId, sendCount],
      );

      const dbData = response.rows[0].email_campaign_get_job_info;

      sendCount++;

      try {
        await sendDynamicEmail(dbData, resumePath, campaignId, hrId.hr_id);

        // Mark this HR as completed
        await pgClient(
          "select * from email_campaign_update_hr_status($1, $2, $3)",
          [campaignId, hrId.hr_id, "completed"],
        );
      } catch (error) {
        console.error("Email failed:", error.message);

        let status = "failed";

        if (error.message === "INVALID_EMAIL") {
          status = "invalid_email";
        }

        if (error.message === "TEMPORARY_FAILURE") {
          status = "retry_pending";
        }

        if (error.message === "SMTP_ERROR") {
          status = "smtp_error";
        }

        await pgClient(
          "select * from email_campaign_update_hr_status($1, $2, $3)",
          [campaignId, hrId.hr_id, status],
        );
      }

      // 🔥 Added delay between emails
      await delay(2000);
    }

    // Update DB status to COMPLETED for email_campaign job
    await pgClient(
      "select * from email_campaign_complete_email_campaign_job($1)",
      [campaignId],
    );
    sendCount = 1;
    
  },
  { connection: redis },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed`, err);
});

async function sendDynamicEmail(dbData, filePath, campaignId, hrId) {
  console.log(dbData)
  const hrInfo = dbData.find((d) => d.hr_info)?.hr_info;
  const templateInfo = dbData.find((d) => d.template_info)?.template_info;

  const dynamicData = {
    hr_name: hrInfo.hr_name,
    company_name: hrInfo.company_name,
    position_name: "Backend Developer",
    your_name: "Divy Gandhi",
  };

  const finalSubject = replaceTemplate(templateInfo.subject_title, dynamicData);
  const finalBody = replaceTemplate(templateInfo.body, dynamicData);

  const tokenRes = await pgClient(
    'SELECT * FROM email_campaign_get_tracking_token($1, $2)',
    [campaignId, hrId]
  );
  const trackingToken = tokenRes.rows[0]?.email_campaign_get_tracking_token;

  // ─── Build pixel URL ──────────────────────────────────────
  const BASE_URL    = 'http://192.168.0.163:3000/api/hr/management' || 'https://yourdomain.com';
  const pixelUrl    = `${BASE_URL}/track/open?token=${trackingToken}`;
  const trackingPixel = `<img src="${pixelUrl}" width="1" height="1" style="display:none" alt="" />`;

  // ─── Convert plain text body to HTML + append pixel ──────
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6;">
      ${finalBody.replace(/\n/g, '<br/>')}
    </div>
    ${trackingPixel}
  `;

  const bucketName = config.get("APP.AWS.BUCKET_NAME");

  // Create the S3 Get Command
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: filePath, // This is "resumes/1/1774958626402-Divy Gandhi.pdf"
  });

  // Fetch the file stream from S3
  const s3Response = await s3Client.send(command);

  const pdfBuffer = await streamToBuffer(s3Response.Body);

  const mailOptions = {
    from: `"Divy Gandhi" <${googleEmailId}>`,
    to: "gandhidivy51@gmail.com", // sendDynamicEmail
    subject: finalSubject,
    text: finalBody,
    html: htmlBody,
    attachments: [
      {
        filename: filePath.split("/").pop(), // Extract "1774958626402-Divy Gandhi.pdf"
        content: pdfBuffer, // Pass the stream directly to Nodemailer
        contentType: 'application/pdf'
      },
    ],
  };

  // /home/adminpc/Documents/bulk_hr_email_notification/backend/uploads/SSC Hall Ticket Distribution List_86-0168.pdf

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Sent to ${hrInfo.email}`);
  } catch (error) {
    console.error("SMTP ERROR FULL:", {
  message: error.message,
  code: error.code,
  response: error.response,
  responseCode: error.responseCode,
});
    // Invalid email
    if (error.responseCode === 550 || error.responseCode === 553) {
      console.log("Invalid email address");
      throw new Error("INVALID_EMAIL");
    }

    // Gmail temporary issue
    if (error.responseCode === 421 || error.responseCode === 450) {
      throw new Error("TEMPORARY_FAILURE");
    }

    // Other SMTP errors
    throw new Error("SMTP_ERROR");
  }
}

function replaceTemplate(template, variables) {
  return template.replace(/{{(.*?)}}/g, (_, key) => {
    return variables[key.trim()] || "";
  });
}


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const streamToBuffer = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });