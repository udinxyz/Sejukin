import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://vuwpgktppfwixwvoukkz.supabase.co'
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1d3Bna3RwcGZ3aXh3dm91a2t6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MjQ1NDYsImV4cCI6MjEwNDEwMDU0Nn0.t60v7hmok9unNOFHuoxUjsGMX4jrML6BC4eJSl9u8uU'

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey && !supabaseAnonKey.includes('your-anon-key')
)

// Direct standard Supabase client with persist session & auto refresh
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})
