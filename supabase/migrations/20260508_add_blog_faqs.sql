-- Add FAQ section to blog posts
-- FAQs are an array of { question, answer } pairs, stored as JSONB so writers
-- can add as many as they need from the editor UI.

ALTER TABLE blog_posts
    ADD COLUMN IF NOT EXISTS faqs JSONB NOT NULL DEFAULT '[]'::jsonb;
