import { createClient } from '@supabase/supabase-js';

const supabaseProjectUrl: string = process.env.SUPABASE_PROJECT_URL!;
const supabasePublicAnonKey: string = process.env.SUPABASE_PUBLIC_ANON_KEY!;

const supabase = createClient(supabaseProjectUrl, supabasePublicAnonKey);

export { supabase };
