import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { getDemoUser, logoutDemo } from '@/services/authService'
import type { User as AppUser } from '@/types'

interface AuthContextValue {
  user: AppUser | null
  isLoading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Cek demo user dulu
    const demoUser = getDemoUser()
    if (demoUser) {
      setUser(demoUser)
      setIsLoading(false)
      return
    }

    // Cek Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          full_name:
            session.user.user_metadata?.full_name ||
            session.user.user_metadata?.name,
          avatar_url:
            session.user.user_metadata?.avatar_url ||
            session.user.user_metadata?.picture,
          created_at: session.user.created_at,
        })
      }
      setIsLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          full_name:
            session.user.user_metadata?.full_name ||
            session.user.user_metadata?.name,
          avatar_url:
            session.user.user_metadata?.avatar_url ||
            session.user.user_metadata?.picture,
          created_at: session.user.created_at,
        })
      } else {
        const demo = getDemoUser()
        if (!demo) setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    logoutDemo()
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
