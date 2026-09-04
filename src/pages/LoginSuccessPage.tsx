import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle, Snowflake, ArrowRight, Home, User, Calendar, Clock, AlertCircle } from 'lucide-react'
import { getDemoUser } from '@/services/authService'
import { supabase } from '@/lib/supabase'
import type { User as AppUser } from '@/types'

export default function LoginSuccessPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState<AppUser | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const processAuth = async () => {
      // 1. Cek jika ada demo session
      const demoUser = getDemoUser()
      if (demoUser) {
        if (!isMounted) return
        setUser(demoUser)
        setLoading(false)
        setTimeout(() => setIsVisible(true), 50)
        return
      }

      // 2. Cek apakah ada error dari redirect Google / Supabase di URL
      const hashStr = window.location.hash.startsWith('#')
        ? window.location.hash.substring(1)
        : window.location.hash
      const searchParams = new URLSearchParams(window.location.search)
      const hashParams = new URLSearchParams(hashStr)

      const urlError =
        hashParams.get('error_description') ||
        searchParams.get('error_description') ||
        hashParams.get('error') ||
        searchParams.get('error')

      if (urlError) {
        if (!isMounted) return
        setErrorMsg(decodeURIComponent(urlError.replace(/\+/g, ' ')))
        setLoading(false)
        return
      }

      // 3. Jika URL mengandung token (Implicit Flow)
      const accessToken = hashParams.get('access_token')
      const refreshToken = hashParams.get('refresh_token')

      if (accessToken && refreshToken) {
        try {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })
          if (error) {
            console.warn('setSession warning:', error)
          } else if (data?.session?.user && isMounted) {
            setUser({
              id: data.session.user.id,
              email: data.session.user.email ?? '',
              full_name:
                data.session.user.user_metadata?.full_name ||
                data.session.user.user_metadata?.name ||
                data.session.user.email?.split('@')[0],
              avatar_url:
                data.session.user.user_metadata?.avatar_url ||
                data.session.user.user_metadata?.picture,
              created_at: data.session.user.created_at,
            })
            setLoading(false)
            setTimeout(() => setIsVisible(true), 50)
            return
          }
        } catch (e) {
          console.warn('Error manual setSession:', e)
        }
      }

      // 4. Jika URL mengandung code (PKCE Flow)
      const code = searchParams.get('code')
      if (code) {
        try {
          const { data, error } = await supabase.auth.exchangeCodeForSession(code)
          if (!error && data?.session?.user && isMounted) {
            setUser({
              id: data.session.user.id,
              email: data.session.user.email ?? '',
              full_name:
                data.session.user.user_metadata?.full_name ||
                data.session.user.user_metadata?.name ||
                data.session.user.email?.split('@')[0],
              avatar_url:
                data.session.user.user_metadata?.avatar_url ||
                data.session.user.user_metadata?.picture,
              created_at: data.session.user.created_at,
            })
            setLoading(false)
            setTimeout(() => setIsVisible(true), 50)
            return
          }
        } catch (e) {
          console.warn('Error exchangeCodeForSession:', e)
        }
      }

      // 5. Cek session dari Supabase storage dengan polling (hingga 5x)
      for (let attempt = 0; attempt < 6; attempt++) {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user && isMounted) {
          setUser({
            id: session.user.id,
            email: session.user.email ?? '',
            full_name:
              session.user.user_metadata?.full_name ||
              session.user.user_metadata?.name ||
              session.user.email?.split('@')[0],
            avatar_url:
              session.user.user_metadata?.avatar_url ||
              session.user.user_metadata?.picture,
            created_at: session.user.created_at,
          })
          setLoading(false)
          setTimeout(() => setIsVisible(true), 50)
          return
        }
        // Tunggu 300ms sebelum retry
        await new Promise((r) => setTimeout(r, 300))
      }

      // 6. Jika benar-benar tidak ada sesi
      if (isMounted) {
        setLoading(false)
        navigate('/login', { replace: true })
      }
    }

    processAuth()

    return () => {
      isMounted = false
    }
  }, [navigate])

  const displayName =
    user?.full_name || user?.username || user?.email?.split('@')[0] || 'User'

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-3xl shadow-card border border-slate-100 max-w-sm w-full text-center">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
          <div>
            <h3 className="font-bold text-brand-navy text-lg">Memverifikasi Akun...</h3>
            <p className="text-sm text-[#64748B] mt-1">
              Menghubungkan sesi login Anda dengan SEJUKIN.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl border border-red-100 shadow-card p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-50 text-danger rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-brand-navy mb-2">Gagal Masuk Akun</h2>
          <p className="text-sm text-[#64748B] mb-6 leading-relaxed bg-red-50/50 p-3 rounded-xl border border-red-100 text-left">
            {errorMsg}
          </p>
          <Link to="/login" className="btn-primary w-full py-3">
            Kembali ke Halaman Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-100 px-4 py-3">
        <div className="container-max flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-blue rounded-xl flex items-center justify-center">
              <Snowflake className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-brand-navy text-lg">SEJUKIN</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div
          className={`w-full max-w-2xl transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Success card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-card overflow-hidden">
            {/* Top banner */}
            <div className="bg-gradient-to-r from-brand-navy to-[#1e3a8a] p-8 text-center relative overflow-hidden">
              <div className="absolute top-2 right-4 opacity-10">
                <Snowflake className="w-24 h-24 text-white" strokeWidth={0.5} />
              </div>
              <div className="absolute bottom-0 left-4 opacity-10">
                <Snowflake className="w-16 h-16 text-brand-cyan" strokeWidth={0.5} />
              </div>

              {/* Success icon */}
              <div className="relative inline-flex items-center justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-success/30 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-success" strokeWidth={2} />
                  </div>
                </div>
              </div>

              <h1 className="text-2xl font-extrabold text-white mb-2">Login Berhasil!</h1>
              <p className="text-white/70 text-sm">Selamat datang kembali di SEJUKIN.</p>
            </div>

            {/* Content */}
            <div className="p-8">
              <p className="text-[#64748B] text-sm text-center mb-6">
                Anda berhasil masuk ke akun Anda. Nikmati layanan AC profesional bersama SEJUKIN.
              </p>

              {/* User info card */}
              <div className="bg-brand-blue-light border border-brand-blue/20 rounded-2xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  {user?.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt={displayName}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-brand-blue/30 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-brand-blue flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <p className="font-bold text-brand-navy text-base truncate">{displayName}</p>
                    <p className="text-xs text-[#64748B] truncate">
                      {user?.email || 'Akun Google'}
                    </p>
                  </div>
                  <div className="ml-auto flex-shrink-0">
                    <span className="badge bg-success/10 text-success text-xs">
                      <CheckCircle className="w-3 h-3" />
                      Aktif
                    </span>
                  </div>
                </div>
              </div>

              {/* What's next */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
                  Fitur yang akan segera hadir
                </p>
                <div className="space-y-2">
                  {[
                    { Icon: Calendar, label: 'Book Service AC', desc: 'Pesan layanan langsung dari dashboard' },
                    { Icon: Clock, label: 'Jadwal Teknisi', desc: 'Pilih waktu yang paling nyaman' },
                    { Icon: CheckCircle, label: 'Riwayat Service', desc: 'Lihat semua histori perawatan AC' },
                  ].map(({ Icon, label, desc }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-brand-blue" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-brand-navy">{label}</p>
                        <p className="text-xs text-[#64748B]">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/" className="btn-secondary flex-1 justify-center">
                  <Home className="w-4 h-4" />
                  Back to Home
                </Link>
                <Link to="/" className="btn-primary flex-1 justify-center">
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-[#64748B] mt-6">
            © 2026 SEJUKIN. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  )
}
