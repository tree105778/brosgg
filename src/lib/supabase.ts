import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

export async function fetchChampionsS14Data() {
  const { data: champions } = await supabase.from('champions_s14').select();

  return champions;
}
