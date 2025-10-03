import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Screenplay {
  id: string;
  title: string;
  type: string;
  total_scenes: number;
  total_dialogues: number;
  created_at: string;
  updated_at: string;
}

export interface Scene {
  id: string;
  screenplay_id: string;
  scene_number: number;
  content: string;
  created_at: string;
}

export interface Dialogue {
  id: string;
  scene_id: string;
  character_name: string;
  dialogue_text: string;
  created_at: string;
}
