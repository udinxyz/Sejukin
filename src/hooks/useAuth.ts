import { useState, useEffect, useCallback } from 'react'
import type { User, AuthState } from '@/types'
import { getDemoUser, getSupabaseUser, signOut } from '@/services/authService'
import { isSupabaseConfigured } from '@/lib/supabase'

export function useAuth(): AuthState & {
  setUser: (user: User | null) => void
  logout: () => Promise<void>
} {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cleanup: (() => void) | undefined

    const initAuth = async () => {
      // Check demo session first
      const demoUser = getDemoUser()
      if (demoUser) {
        setUser(demoUser)
        setIsLoading(false)
        return
      }

      // Check Supabase session only if configured
      if (isSupabaseConfigured) {
        try {
          const { supabase } = await import('@/lib/supabase')
          const supabaseUser = await getSupabaseUser()
          if (supabaseUser) {
            setUser(supabaseUser)
          }

          // Subscribe to Supabase auth state changes
          const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
              if (session?.user) {
                setUser({
                  id: session.user.id,
                  email: session.user.email ?? '',
                  full_name: session.user.user_metadata?.full_name,
                  avatar_url: session.user.user_metadata?.avatar_url,
                  created_at: session.user.created_at,
                })
              } else {
                const demo = getDemoUser()
                if (!demo) setUser(null)
              }
            }
          )
          cleanup = () => subscription.unsubscribe()
        } catch {
          // Supabase not available, continue in demo mode
        }
      }

      setIsLoading(false)
    }

    initAuth()
    return () => cleanup?.()
  }, [])

  const logout = useCallback(async () => {
    await signOut()
    setUser(null)
  }, [])

  return {
    user,
    isLoading,
    isAuthenticated: user !== null,
    setUser,
    logout,
  }
}
