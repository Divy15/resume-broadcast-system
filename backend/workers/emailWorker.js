// workers/emailWorker.js
const { Worker } = require("bullmq");
const redis = require("../redis");
const { pgClient } = require("../db");
const config = require("config");
const googleEmailId = config.get("APP.EMAIL.USER");
const googlePass = config.get("APP.EMAIL.PASS");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: googleEmailId,
    pass: googlePass,
  },
});

const worker = new Worker(
  "bulk-email",
  async (job) => {
    console.log("Processing job:", job.data);

    const { campaignId, hrIds, templateId, resumePath } = job.data;
    let sendCount = 1;

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
        await sendDynamicEmail(dbData, resumePath);

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
    [campaignId, hrId.hr_id, status]
  );
      }
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

async function sendDynamicEmail(dbData, filePath) {
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

  const mailOptions = {
    from: `"Divy Gandhi" <${googleEmailId}>`,
    to: "gandhidivy51@gmail.com", // sendDynamicEmail
    subject: finalSubject,
    text: finalBody,
    attachments: [
      {
        filename: filePath.split("/").pop(),
        path: `/home/adminpc/Documents/bulk_hr_email_notification/backend${filePath}`,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Sent to ${hrInfo.email}`);
  } catch (error) {
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
