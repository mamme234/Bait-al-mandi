import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hnbirefdpwfiroufyzdq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_vksQI_d_7iYBj6EgADSR8Q_4GUcxdJi';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
