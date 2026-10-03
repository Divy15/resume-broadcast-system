-- CreateTable
CREATE TABLE "application_history" (
    "id" SERIAL NOT NULL,
    "campaign_id" INTEGER NOT NULL,
    "hr_id" INTEGER NOT NULL,
    "tracking_token" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "send_status" VARCHAR(20) NOT NULL DEFAULT 'pending',
    "is_opened" BOOLEAN NOT NULL DEFAULT false,
    "opened_at" TIMESTAMP(6),
    "open_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "send_at" TIMESTAMP(6),

    CONSTRAINT "application_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_info" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER,
    "name" VARCHAR,
    "website" VARCHAR,
    "linkedin" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_campaigns" (
    "campaign_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "position_name" VARCHAR,
    "template_id" INTEGER,
    "resumeid" VARCHAR,
    "status" VARCHAR DEFAULT 'PROCESSING',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "scheduled_time" VARCHAR,

    CONSTRAINT "email_campaigns_pkey" PRIMARY KEY ("campaign_id")
);

-- CreateTable
CREATE TABLE "event_master" (
    "event_id" SERIAL NOT NULL,
    "event_type" VARCHAR(50) NOT NULL,

    CONSTRAINT "event_master_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "hr_info" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "company_name" VARCHAR,
    "hr_name" VARCHAR,
    "email" VARCHAR,
    "mobileno" VARCHAR,
    "company_website" VARCHAR,
    "position_id" INTEGER,
    "is_applied" BOOLEAN DEFAULT false,
    "is_verified" BOOLEAN,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "hr_linkedin_profile_link" VARCHAR,

    CONSTRAINT "hr_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "notification_id" SERIAL NOT NULL,
    "campaign_id" INTEGER,
    "notification_message" TEXT,
    "is_read" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("notification_id")
);

-- CreateTable
CREATE TABLE "position_master" (
    "id" SERIAL NOT NULL,
    "position_name" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "position_master_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "template_deletion_log" (
    "id" SERIAL NOT NULL,
    "template_id" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "template_deletion_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "template_master" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER,
    "template_name" VARCHAR,
    "subject_title" VARCHAR,
    "body" VARCHAR,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "template_master_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "template_updation_log" (
    "id" SERIAL NOT NULL,
    "template_id" INTEGER,
    "template_name" VARCHAR,
    "template_subject" VARCHAR,
    "template_body" VARCHAR,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "template_updation_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_master" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR,
    "email" VARCHAR,
    "password" VARCHAR,
    "country" VARCHAR,
    "dob" DATE,
    "app_email" VARCHAR,
    "app_password" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_master_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_resume" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER,
    "filename" VARCHAR,
    "filepath" VARCHAR,
    "upload_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_resume_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "application_history_tracking_token_key" ON "application_history"("tracking_token");

-- CreateIndex
CREATE UNIQUE INDEX "position_master_position_name_key" ON "position_master"("position_name");

