/*
  # Create screenplay management tables

  1. New Tables
    - `screenplays`
      - `id` (uuid, primary key)
      - `title` (text)
      - `type` (text) - e.g., "Film", "TV Show", "Theater"
      - `total_scenes` (integer)
      - `total_dialogues` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `scenes`
      - `id` (uuid, primary key)
      - `screenplay_id` (uuid, foreign key)
      - `scene_number` (integer)
      - `content` (text)
      - `created_at` (timestamptz)
    
    - `dialogues`
      - `id` (uuid, primary key)
      - `scene_id` (uuid, foreign key)
      - `character_name` (text)
      - `dialogue_text` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (demo purposes)
    - Add policies for authenticated users to manage data
*/

-- Create screenplays table
CREATE TABLE IF NOT EXISTS screenplays (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text DEFAULT 'Film',
  total_scenes integer DEFAULT 0,
  total_dialogues integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create scenes table
CREATE TABLE IF NOT EXISTS scenes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  screenplay_id uuid REFERENCES screenplays(id) ON DELETE CASCADE,
  scene_number integer NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create dialogues table
CREATE TABLE IF NOT EXISTS dialogues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scene_id uuid REFERENCES scenes(id) ON DELETE CASCADE,
  character_name text NOT NULL,
  dialogue_text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE screenplays ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE dialogues ENABLE ROW LEVEL SECURITY;

-- Policies for screenplays
CREATE POLICY "Anyone can view screenplays"
  ON screenplays FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert screenplays"
  ON screenplays FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update screenplays"
  ON screenplays FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete screenplays"
  ON screenplays FOR DELETE
  TO authenticated
  USING (true);

-- Policies for scenes
CREATE POLICY "Anyone can view scenes"
  ON scenes FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert scenes"
  ON scenes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update scenes"
  ON scenes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete scenes"
  ON scenes FOR DELETE
  TO authenticated
  USING (true);

-- Policies for dialogues
CREATE POLICY "Anyone can view dialogues"
  ON dialogues FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert dialogues"
  ON dialogues FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update dialogues"
  ON dialogues FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete dialogues"
  ON dialogues FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS scenes_screenplay_id_idx ON scenes(screenplay_id);
CREATE INDEX IF NOT EXISTS dialogues_scene_id_idx ON dialogues(scene_id);