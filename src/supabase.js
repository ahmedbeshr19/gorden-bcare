import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ynvukudbobtamgklgwdx.supabase.co'
const supabaseAnonKey = 'sb_publishable_z7CnMXxLezgVpOPHaxDrYg_2xjK-YCJ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
