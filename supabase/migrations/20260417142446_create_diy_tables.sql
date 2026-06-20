/*
  # HOW TO DIY - Initial Schema

  ## New Tables

  ### categories
  - `id` (uuid, primary key)
  - `name` (text) - category display name
  - `icon` (text) - emoji icon for the category
  - `slug` (text, unique) - URL-safe identifier
  - `color` (text) - hex color for card background accent
  - `created_at` (timestamptz)

  ### diy_posts
  - `id` (uuid, primary key)
  - `title` (text) - post title
  - `description` (text) - short description
  - `thumbnail_url` (text) - cover image URL
  - `video_url` (text, nullable) - optional video URL
  - `category_id` (uuid, FK -> categories)
  - `difficulty` (text) - easy | medium | hard
  - `duration_minutes` (int) - estimated time
  - `tags` (text[]) - searchable tags
  - `likes_count` (int) - denormalized like count
  - `saves_count` (int) - denormalized save count
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on both tables
  - Public read access for all users (no auth required)
  - No write access from client (admin only via service role)

  ## Seed Data
  - 6 categories with icons and colors
  - 12 DIY posts across categories with Pexels images
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text NOT NULL DEFAULT '',
  slug text UNIQUE NOT NULL,
  color text NOT NULL DEFAULT '#333333',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS diy_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  thumbnail_url text NOT NULL DEFAULT '',
  video_url text,
  category_id uuid REFERENCES categories(id),
  difficulty text NOT NULL DEFAULT 'easy' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  duration_minutes int NOT NULL DEFAULT 30,
  tags text[] NOT NULL DEFAULT '{}',
  likes_count int NOT NULL DEFAULT 0,
  saves_count int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE diy_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read diy_posts"
  ON diy_posts FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS diy_posts_category_id_idx ON diy_posts(category_id);
CREATE INDEX IF NOT EXISTS diy_posts_created_at_idx ON diy_posts(created_at DESC);

-- Seed categories
INSERT INTO categories (name, icon, slug, color) VALUES
  ('Home Repair', '🔨', 'home-repair', '#B45309'),
  ('Woodworking', '🪵', 'woodworking', '#92400E'),
  ('Gardening', '🌱', 'gardening', '#15803D'),
  ('Electronics', '⚡', 'electronics', '#1D4ED8'),
  ('Crafts', '✂️', 'crafts', '#BE185D'),
  ('Plumbing', '🚿', 'plumbing', '#0369A1')
ON CONFLICT (slug) DO NOTHING;

-- Seed diy_posts
INSERT INTO diy_posts (title, description, thumbnail_url, category_id, difficulty, duration_minutes, tags, likes_count, saves_count)
SELECT
  'Fix a Leaky Faucet',
  'Stop that drip for good with basic tools you already own. No plumber needed.',
  'https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=800',
  c.id, 'easy', 20,
  ARRAY['plumbing','faucet','water','beginner'],
  1240, 389
FROM categories c WHERE c.slug = 'plumbing'
ON CONFLICT DO NOTHING;

INSERT INTO diy_posts (title, description, thumbnail_url, category_id, difficulty, duration_minutes, tags, likes_count, saves_count)
SELECT
  'Build a Floating Shelf',
  'Create clean, modern floating shelves that look like they cost a fortune.',
  'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800',
  c.id, 'medium', 90,
  ARRAY['shelf','woodworking','storage','decor'],
  3421, 1102
FROM categories c WHERE c.slug = 'woodworking'
ON CONFLICT DO NOTHING;

INSERT INTO diy_posts (title, description, thumbnail_url, category_id, difficulty, duration_minutes, tags, likes_count, saves_count)
SELECT
  'Patch Drywall Like a Pro',
  'Fill holes and cracks seamlessly. Your walls will look brand new.',
  'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800',
  c.id, 'medium', 45,
  ARRAY['drywall','wall','repair','painting'],
  892, 334
FROM categories c WHERE c.slug = 'home-repair'
ON CONFLICT DO NOTHING;

INSERT INTO diy_posts (title, description, thumbnail_url, category_id, difficulty, duration_minutes, tags, likes_count, saves_count)
SELECT
  'Install a Raised Garden Bed',
  'Grow your own vegetables in a beautiful raised bed you built yourself.',
  'https://images.pexels.com/photos/1084540/pexels-photo-1084540.jpeg?auto=compress&cs=tinysrgb&w=800',
  c.id, 'easy', 120,
  ARRAY['garden','vegetables','outdoor','wood'],
  5670, 2341
FROM categories c WHERE c.slug = 'gardening'
ON CONFLICT DO NOTHING;

INSERT INTO diy_posts (title, description, thumbnail_url, category_id, difficulty, duration_minutes, tags, likes_count, saves_count)
SELECT
  'Wire an Outdoor Light Fixture',
  'Add curb appeal and security with a new outdoor light. Safe step-by-step guide.',
  'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800',
  c.id, 'hard', 60,
  ARRAY['electrical','lighting','outdoor','wiring'],
  2103, 879
FROM categories c WHERE c.slug = 'electronics'
ON CONFLICT DO NOTHING;

INSERT INTO diy_posts (title, description, thumbnail_url, category_id, difficulty, duration_minutes, tags, likes_count, saves_count)
SELECT
  'Make a Macrame Wall Hanging',
  'Craft a boho-chic wall art piece with just rope and a wooden dowel.',
  'https://images.pexels.com/photos/4992975/pexels-photo-4992975.jpeg?auto=compress&cs=tinysrgb&w=800',
  c.id, 'easy', 75,
  ARRAY['macrame','decor','rope','boho','craft'],
  7812, 3204
FROM categories c WHERE c.slug = 'crafts'
ON CONFLICT DO NOTHING;

INSERT INTO diy_posts (title, description, thumbnail_url, category_id, difficulty, duration_minutes, tags, likes_count, saves_count)
SELECT
  'Build a Wooden Coffee Table',
  'Design and build a sturdy, stylish coffee table from scratch for under $50.',
  'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
  c.id, 'hard', 240,
  ARRAY['furniture','table','wood','living room'],
  4390, 1876
FROM categories c WHERE c.slug = 'woodworking'
ON CONFLICT DO NOTHING;

INSERT INTO diy_posts (title, description, thumbnail_url, category_id, difficulty, duration_minutes, tags, likes_count, saves_count)
SELECT
  'Replace a Door Lock',
  'Upgrade your home security in under 30 minutes with a new deadbolt.',
  'https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=800',
  c.id, 'easy', 25,
  ARRAY['security','door','lock','hardware'],
  1567, 612
FROM categories c WHERE c.slug = 'home-repair'
ON CONFLICT DO NOTHING;

INSERT INTO diy_posts (title, description, thumbnail_url, category_id, difficulty, duration_minutes, tags, likes_count, saves_count)
SELECT
  'Build a Drip Irrigation System',
  'Save water and time with a DIY drip system that keeps your plants happy.',
  'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800',
  c.id, 'medium', 90,
  ARRAY['garden','irrigation','water','plants'],
  3210, 1405
FROM categories c WHERE c.slug = 'gardening'
ON CONFLICT DO NOTHING;

INSERT INTO diy_posts (title, description, thumbnail_url, category_id, difficulty, duration_minutes, tags, likes_count, saves_count)
SELECT
  'Solder a Custom PCB',
  'Learn the basics of soldering and build your first custom circuit board.',
  'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=800',
  c.id, 'hard', 120,
  ARRAY['electronics','soldering','pcb','maker'],
  2987, 1103
FROM categories c WHERE c.slug = 'electronics'
ON CONFLICT DO NOTHING;

INSERT INTO diy_posts (title, description, thumbnail_url, category_id, difficulty, duration_minutes, tags, likes_count, saves_count)
SELECT
  'Hand-Stitch a Leather Wallet',
  'Craft a minimalist leather wallet that will last for decades.',
  'https://images.pexels.com/photos/4252525/pexels-photo-4252525.jpeg?auto=compress&cs=tinysrgb&w=800',
  c.id, 'medium', 60,
  ARRAY['leather','wallet','sewing','accessories'],
  6120, 2780
FROM categories c WHERE c.slug = 'crafts'
ON CONFLICT DO NOTHING;

INSERT INTO diy_posts (title, description, thumbnail_url, category_id, difficulty, duration_minutes, tags, likes_count, saves_count)
SELECT
  'Install a Shower Head',
  'Upgrade to a rainfall shower in minutes with zero plumbing experience.',
  'https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=800',
  c.id, 'easy', 15,
  ARRAY['plumbing','shower','bathroom','upgrade'],
  4201, 1923
FROM categories c WHERE c.slug = 'plumbing'
ON CONFLICT DO NOTHING;
