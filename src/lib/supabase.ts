import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getGlobalCount(): Promise<number> {
  const { data, error } = await supabase
    .from('divination_count')
    .select('count')
    .eq('id', 1)
    .single()

  if (error || !data) return 0
  return data.count
}

export async function incrementGlobalCount(): Promise<number> {
  const { data, error } = await supabase.rpc('increment_divination_count')
  if (error || data === null) return 0
  return data
}
