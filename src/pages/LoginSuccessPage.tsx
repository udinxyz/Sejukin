import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import { getDemoUser } from '@/services/authService'
import { supabase } from '@/lib/supabase'

export default function LoginSuccessPage() {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const processAuth = async () => {
      // 1. Cek jika ada demo session -> langsung ke dashboard
      const demoUser = getDemoUser()
      if (demoUser) {
        if (!isMounted) return
        navigate('/dashboard', { replace: true })
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
          if (!error && data?.session?.user && isMounted) {
            navigate('/dashboard', { replace: true })
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
            navigate('/dashboard', { replace: true })
            return
          }
        } catch (e) {
          console.warn('Error exchangeCodeForSession:', e)
        }
      }

      // 5. Cek session dari Supabase storage dengan polling (hingga 6x)
      for (let attempt = 0; attempt < 6; attempt++) {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user && isMounted) {
          navigate('/dashboard', { replace: true })
          return
        }
        await new Promise((r) => setTimeout(r, 300))
      }

      // 6. Jika tidak ada sesi sama sekali, redirect ke login
      if (isMounted) {
        navigate('/login', { replace: true })
      }
    }

    processAuth()

    return () => {
      isMounted = false
    }
  }, [navigate])

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
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-3xl shadow-card border border-slate-100 max-w-sm w-full text-center">
        <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
        <div>
          <h3 className="font-bold text-brand-navy text-lg">Mengalihkan ke Dashboard...</h3>
          <p className="text-sm text-[#64748B] mt-1">
            Menghubungkan sesi Anda dengan SEJUKIN.
          </p>
        </div>
      </div>
    </div>
  )
}
