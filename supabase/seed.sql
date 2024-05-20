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

-- Seed data for UserType table
INSERT INTO "public"."UserType" ("id", "name") 
VALUES 
    ('53f8e720-1915-4dc8-a166-1226c5775330', 'Moderator'),
    ('a466268b-fb92-43c4-b174-4f9fd1c5c5f1', 'Influencer'),
    ('0320e47b-d1c1-43ed-9d61-503582d77527', 'Registered'),
    ('f3e2b590-60e3-4a01-a7a7-1c157c8a3b79', 'Minor'),
    ('baa26922-d9d9-4f9f-8de1-14d4740f97b4', 'HideMe'),
    ('97b2732b-7a2e-4d13-bd86-9ac7a9c17c1d', 'Anonymous');

-- Seed data for Location table
INSERT INTO "public"."Location" ("id", "city", "country", "latitude", "longitude") 
VALUES 
    ('5d82cdd3-3f2f-47ff-a805-25e7151926d7', 'Paris', 'France', '48.8566', '2.3522'),
    ('f1201b2c-b39b-4b20-8465-0b7898b159e9', 'New York', 'USA', '40.7128', '-74.0060'),
    ('6458e7db-490b-49e4-a25e-25a6666fd30f', 'Tokyo', 'Japan', '35.6895', '139.6917');

-- Seed data for Activities table
INSERT INTO "public"."Activity" ("id", "name") 
VALUES 
    ('6e6a36da-06ed-426d-80cc-d1ff2276fb98', 'Worship'),
    ('fd5101fc-0218-496f-91a1-04c1e6472b20', 'Prayer'),
    ('9cfe08ad-dbe7-4643-9e19-302ed4f5f72c', 'Communion'),
    ('8bde9d86-cb73-4f58-9a04-9fd3b74ed6a0', 'Voice of God');

-- Seed data for Sentiment table
INSERT INTO "public"."Sentiment" ("id", "type") 
VALUES 
    ('9f0d7f13-25d9-48cb-afcd-b1134a1a7f3a', 0), -- Example sentiment neutral
    ('56b169bf-b1b1-4f39-b0d3-4ee8103e25d4', 1), -- Example sentiment positive
    ('94ddc4f2-82f7-4c22-8e56-95b462d3b7ae', -1); -- Example sentiment negative

-- Seed data for MediaType table
INSERT INTO "public"."MediaType" ("id", "type") 
VALUES 
    ('f1075159-b937-4e9c-a5f1-2aa2d482086e', 'Image'), 
    ('8adcb636-5073-45d5-936b-5ae3ff5d64ae', 'Video'), 
    ('b43e4c0b-21e3-4f3f-9cf2-62c3f5e97935', 'Text');

-- Seed data for Keywords table
INSERT INTO "public"."Keywords" ("id", "words", "frequency") 
VALUES 
    ('5d82cdd3-3c2f-47ff-a805-25e7151926d7', ARRAY['God', 'faith', 'prayer'], '[{"God": 10}, {"faith": 15}, {"prayer": 20}]'::jsonb),
    ('b5901b2c-b39b-4b20-8465-0b7898b159e9', ARRAY['blessing', 'grace', 'worship'], '[{"blessing": 8}, {"grace": 12}, {"worship": 18}]'::jsonb),
    ('2a78e7db-490b-49e4-a25e-25a6666fd30f', ARRAY['bible', 'church', 'spiritual'], '[{"bible": 5}, {"church": 7}, {"spiritual": 11}]'::jsonb);

-- Seed data for Notification table
INSERT INTO "public"."Notification" ("id", "eligible", "allow_email_notification", "allow_text_notification", "time_to_be_notified", "notification_method", "notification_message") 
VALUES 
    ('5d82cdd3-3c2f-47ff-a805-25e715192624', true, true, false, '2024-04-26 10:00:00', 'email', 'In 5 minutes will start the activity prayer.'),
    ('b5901b2c-b39b-4b20-8465-0b7898b15924', false, true, true, '2024-04-27 15:30:00', 'text', 'Activity worship will begin shortly.'),
    ('2a78e7db-490b-49e4-a25e-25a6666fd324', true, true, true, '2024-04-28 09:45:00', 'both', 'Join us for the event Communion in 15 minutes.');

-- Seed data for Event table
INSERT INTO "public"."Event" ("id", "name") 
VALUES 
    ('9eac149d-12b1-4c91-b14b-8fd87341b572', 'One Accord'),
    ('ef370a46-03a6-4b1c-96fd-d0c7b8bf1c41', 'Event2'),
    ('3bc9057d-3de2-4778-84e6-1e9b393d4f27', 'Event3');
    
-- Seed data for Tag table
INSERT INTO "public"."Tag" ("id", "name", "country_keyword", "bible_keyword") 
VALUES 
    ('1f9ab05c-b97a-40b4-b43a-f308df75ec26', ARRAY['#prayer', '#faith'], ARRAY['#Colombia', '#China'], ARRAY['#Genesis', '#Exodus', '#John']),
    ('be6e97de-19e4-4af1-bd62-c0d350c011ec', ARRAY['#word', '#hope'], ARRAY['#USA', '#UK'], ARRAY['#Psalms', '#Proverbs']),
    ('b1b4e757-0bc0-48ff-b430-6c9a3b978ee7', ARRAY['#prophecy', '#worship'], ARRAY['#India', '#Nigeria'], ARRAY['#Isaiah', '#Revelation']);

-- Seed data for Category table
INSERT INTO "public"."Category" ("id", "name") 
VALUES 
    ('2525edcc-b972-4a14-bfc5-66697a89b5bc', 'prayer'),
    ('d842e447-17d1-4a3a-84a0-61cd48e68d7d', 'word'),
    ('3c31f6bb-fa6f-49bc-98b4-9f173e6d9ebf', 'prophecy'),
    ('f4872d2c-c51a-4da7-bcc5-245c8fe01e14', 'vision'),
    ('94f4f09d-b0a6-4b79-a474-fc35a5bb6f59', 'dream');


-- Seed data for User table
-- You will need to provide the bytea value for the picture column

-- Seed data for User table
INSERT INTO "public"."User" (
    "id", "username", "email","phone_number", "picture", "languages", 
    "gender", "interest", "affiliation", "birth_year", 
    "user_type_id", "user_location_id", "notification_id", "created_at", "updated_at"
) 
VALUES 
    ('94b2a736-d8c7-4722-8d64-86a0a24d4f80', 'user1', 'user1@example.com', '123456789', NULL, ARRAY['English'], 'Male', ARRAY['Interest1'], ARRAY['Affiliation1'], '1990-01-01', '53f8e720-1915-4dc8-a166-1226c5775330', '5d82cdd3-3f2f-47ff-a805-25e7151926d7', '5d82cdd3-3c2f-47ff-a805-25e715192624', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Seed data for Post table
INSERT INTO "public"."Post" (
    "id", "content", "is_visible", "is_offensive", "user_id", "activity_id", "category_id", "tag_id", "sentiment_id", "keywords_id", "event_id", "media_type_id", "created_at"
)
VALUES
    ('b12118e4-57b1-4f81-af47-f389f8f22cf9', 'This is the content of post 1', true, false, '94b2a736-d8c7-4722-8d64-86a0a24d4f80', '6e6a36da-06ed-426d-80cc-d1ff2276fb98', '2525edcc-b972-4a14-bfc5-66697a89b5bc', '1f9ab05c-b97a-40b4-b43a-f308df75ec26', '9f0d7f13-25d9-48cb-afcd-b1134a1a7f3a', '5d82cdd3-3c2f-47ff-a805-25e7151926d7', '9eac149d-12b1-4c91-b14b-8fd87341b572', 'f1075159-b937-4e9c-a5f1-2aa2d482086e', CURRENT_TIMESTAMP);