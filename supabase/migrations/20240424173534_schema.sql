-- Migration
-- Set session parameters
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Create required extensions
CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";
CREATE EXTENSION IF NOT EXISTS "fuzzystrmatch" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

-- Define table schema and create tables
CREATE TABLE "public"."Post" (
  "id" "text" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  "content" "text" NOT NULL,
  "is_visible" boolean NOT NULL,
  "is_offensive" boolean NOT NULL,
  "user_id" "text" NOT NULL,
  "activity_id" "text" NOT NULL,
  "category_id" "text" NOT NULL,
  "tag_id" "text", 
  "sentiment_id" "text" NOT NULL,
  "keywords_id" "text" NOT NULL,
  "event_id" "text" NOT NULL,
  "media_type_id" "text" NOT NULL,
  "created_at" timestamp NOT NULL
);

ALTER TABLE "public"."Post" OWNER TO "postgres";

CREATE TABLE "public"."Category" (
  "id" "text" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  "name" "text" NOT NULL
);

ALTER TABLE "public"."Category" OWNER TO "postgres";

CREATE TABLE "public"."Sentiment" (
  "id" "text" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  "type" integer NOT NULL
);

ALTER TABLE "public"."Sentiment" OWNER TO "postgres";

CREATE TABLE "public"."MediaType" (
  "id" "text" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  "type" "text" NOT NULL
);

ALTER TABLE "public"."MediaType" OWNER TO "postgres";

CREATE TABLE "public"."Keywords" (
  "id" "text" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  "words" "text"[] NOT NULL,
  "frequency" jsonb NOT NULL
);

ALTER TABLE "public"."Keywords" OWNER TO "postgres";

CREATE TABLE "public"."User" (
  "id" "text" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  "username" "text" NOT NULL,
  "email" "text" NOT NULL,
  "phone_number" "text" NOT NULL,
  "picture" bytea NULL,
  "languages" "text"[] NOT NULL,
  "gender" "text" NOT NULL,
  "interest" "text"[],
  "affiliation" "text"[],
  "birth_year" date NOT NULL,
  "user_type_id" "text" NOT NULL,
  "user_location_id" "text" NOT NULL,
  "notification_id" "text" NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL
);

ALTER TABLE "public"."User" OWNER TO "postgres";

CREATE TABLE "public"."Notification" (
  "id" "text" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  "eligible" boolean NOT NULL,
  "allow_email_notification" boolean NOT NULL,
  "allow_text_notification" boolean NOT NULL,
  "time_to_be_notified" timestamp NOT NULL,
  "notification_method" "text" NOT NULL,
  "notification_message" "text" NOT NULL
);

ALTER TABLE "public"."Notification" OWNER TO "postgres";

CREATE TABLE "public"."Location" (
  "id" "text" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  "city" "text" NOT NULL,
  "country" "text" NOT NULL,
  "latitude" "text" NOT NULL,
  "longitude" "text" NOT NULL
);

ALTER TABLE "public"."Location" OWNER TO "postgres";

CREATE TABLE "public"."Tag" (
  "id" "text" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  "name" "text"[] NOT NULL,
  "country_keyword" "text"[] NOT NULL,
  "bible_keyword" "text"[] NOT NULL
);

ALTER TABLE "public"."Tag" OWNER TO "postgres";

CREATE TABLE "public"."Event" (
  "id" "text" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  "name" "text" NOT NULL
);

ALTER TABLE "public"."Event" OWNER TO "postgres";

CREATE TABLE "public"."UserType" (
  "id" "text" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  "name" "text" NOT NULL
);

ALTER TABLE "public"."UserType" OWNER TO "postgres";

CREATE TABLE "public"."Activity" (
  "id" "text" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  "name" "text" NOT NULL
);

ALTER TABLE "public"."Activity" OWNER TO "postgres";

-- Add primary key constraints
ALTER TABLE ONLY "public"."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."Sentiment"
    ADD CONSTRAINT "Sentiment_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."MediaType"
    ADD CONSTRAINT "MediaType_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."Keywords"
    ADD CONSTRAINT "Keywords_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."UserType"
    ADD CONSTRAINT "UserType_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."Location"
    ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."Tag"
    ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."Event"
    ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."Activity"
    ADD CONSTRAINT "Activity_pkey" PRIMARY KEY ("id");


-- Add index on category_id
CREATE INDEX idx_category_id ON "public"."Post" ("category_id");

-- Add index on tag_id
CREATE INDEX idx_tag_id ON "public"."Post" ("tag_id");

-- Example for Category table (if frequently filtered or joined)
CREATE INDEX idx_category_name ON "public"."Category" ("name");

-- Example for Notification table (if frequently filtered or joined)
CREATE INDEX idx_notification_eligible ON "public"."Notification" ("eligible");

-- Add foreign key constraints
ALTER TABLE "public"."Post"
    ADD CONSTRAINT "FK_Post_Category" FOREIGN KEY ("category_id") REFERENCES "public"."Category"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."Post"
    ADD CONSTRAINT "FK_Sentiment_id" FOREIGN KEY ("sentiment_id") REFERENCES "public"."Sentiment"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."Post"
    ADD CONSTRAINT "FK_MediaType_id" FOREIGN KEY ("media_type_id") REFERENCES "public"."MediaType"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."Post"
    ADD CONSTRAINT "FK_Keywords_id" FOREIGN KEY ("keywords_id") REFERENCES "public"."Keywords"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."User"
    ADD CONSTRAINT "FK_Notification_id" FOREIGN KEY ("notification_id") REFERENCES "public"."Notification"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."Post"
    ADD CONSTRAINT "FK_Tag_id" FOREIGN KEY ("tag_id") REFERENCES "public"."Tag"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."Post"
    ADD CONSTRAINT "FK_Event_id" FOREIGN KEY ("event_id") REFERENCES "public"."Event"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."Post"
    ADD CONSTRAINT "FK_Activity_id" FOREIGN KEY ("activity_id") REFERENCES "public"."Activity"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."User"
    ADD CONSTRAINT "FK_UserType_id" FOREIGN KEY ("user_type_id") REFERENCES "public"."UserType"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."User"
    ADD CONSTRAINT "FK_Location_id" FOREIGN KEY ("user_location_id") REFERENCES "public"."Location"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE "public"."Post" ADD CONSTRAINT "FK_User_Post" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON UPDATE CASCADE ON DELETE CASCADE;

-- Schema permissions
REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";
