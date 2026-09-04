import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { LoginPayload, RegisterPayload, User } from '@/types'
import { sleep } from '@/lib/utils'

// Demo credentials – safe for prototype; replace with DB lookup in production
const DEMO_USERNAME = 'sejukin'
const DEMO_PASSWORD = 'sejukbanget23'

const DEMO_USER: User = {
  id: 'demo-user-001',
  email: 'demo@sejukin.id',
  username: 'sejukin',
  full_name: 'Demo User – SEJUKIN',
  created_at: new Date().toISOString(),
}

// ─── Demo Authentication ────────────────────────────────────────────────────

export async function loginWithDemo(payload: LoginPayload): Promise<User> {
  // Simulate network latency for realistic UX
  await sleep(800)

  const isDemo =
    payload.usernameOrEmail === DEMO_USERNAME &&
    payload.password === DEMO_PASSWORD

  if (!isDemo) {
    throw new Error('Username atau password tidak valid. Silakan coba lagi.')
  }

  // Persist demo session in sessionStorage (not localStorage to be safe)
  sessionStorage.setItem('sejukin_demo_user', JSON.stringify(DEMO_USER))
  return DEMO_USER
}

export function getDemoUser(): User | null {
  const raw = sessionStorage.getItem('sejukin_demo_user')
  if (!raw) return null
  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export function logoutDemo(): void {
  sessionStorage.removeItem('sejukin_demo_user')
}

// ─── Supabase Authentication ────────────────────────────────────────────────

export async function loginWithEmail(email: string, password: string): Promise<User> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase belum dikonfigurasi. Gunakan demo login.')
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error || !data.user) {
    throw new Error('Username atau password tidak valid. Silakan coba lagi.')
  }

  return {
    id: data.user.id,
    email: data.user.email ?? '',
    full_name: data.user.user_metadata?.full_name,
    avatar_url: data.user.user_metadata?.avatar_url,
    created_at: data.user.created_at,
  }
}

export async function loginWithGoogle(): Promise<void> {
  const supabaseUrl =
    import.meta.env.VITE_SUPABASE_URL || 'https://vuwpgktppfwixwvoukkz.supabase.co'
  const redirectUrl = `${window.location.origin}/login-success`

  // Directly navigate to Supabase Google OAuth endpoint - 100% reliable, zero chance of getting stuck
  const authUrl = `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(
    redirectUrl
  )}`

  window.location.href = authUrl
}

export async function registerWithEmail(payload: RegisterPayload): Promise<void> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase belum dikonfigurasi.')
  }

  const { error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        full_name: payload.fullName,
        phone: payload.phone,
      },
    },
  })

  if (error) {
    throw new Error(error.message)
  }
}

export async function registerWithGoogle(): Promise<void> {
  return loginWithGoogle()
}

export async function getSupabaseUser(): Promise<User | null> {
  if (!isSupabaseConfigured) return null

  const { data } = await supabase.auth.getUser()
  if (!data.user) return null

  return {
    id: data.user.id,
    email: data.user.email ?? '',
    full_name: data.user.user_metadata?.full_name,
    avatar_url: data.user.user_metadata?.avatar_url,
    created_at: data.user.created_at,
  }
}

export async function signOut(): Promise<void> {
  logoutDemo()
  if (isSupabaseConfigured) {
    await supabase.auth.signOut()
  }
}
