import { useState, useId } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { loginWithDemo, loginWithGoogle } from '@/services/authService'
import type { User } from '@/types'
import { isSupabaseConfigured } from '@/lib/supabase'

interface LoginFormProps {
  onSuccess: (user: User) => void
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const id = useId()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ usernameOrEmail: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{ usernameOrEmail?: string; password?: string }>({})

  const validate = () => {
    const errors: typeof fieldErrors = {}
    if (!formData.usernameOrEmail.trim()) {
      errors.usernameOrEmail = 'Username atau email wajib diisi.'
    }
    if (!formData.password) {
      errors.password = 'Password wajib diisi.'
    }
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!validate()) return

    setIsLoading(true)
    try {
      const user = await loginWithDemo({
        usernameOrEmail: formData.usernameOrEmail,
        password: formData.password,
      })
      onSuccess(user)
      navigate('/login-success', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError(null)
    if (!isSupabaseConfigured) {
      setError(
        'Google Login memerlukan konfigurasi Supabase. Tambahkan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY ke file .env Anda.'
      )
      return
    }
    setIsGoogleLoading(true)
    try {
      await loginWithGoogle()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google Login gagal.')
      setIsGoogleLoading(false)
    }
  }

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: undefined }))
    }
    if (error) setError(null)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-navy mb-2">Welcome Back</h1>
        <p className="text-[#64748B] text-sm">Masuk ke akun SEJUKIN Anda.</p>
      </div>

      {/* Google Login */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading || isLoading}
        className={cn(
          'w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-white',
          'text-brand-navy font-medium text-sm transition-all duration-200',
          'hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm',
          'focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:ring-offset-2',
          'disabled:opacity-60 disabled:cursor-not-allowed'
        )}
        aria-label="Continue with Google"
      >
        {isGoogleLoading ? (
          <Loader2 className="w-5 h-5 animate-spin text-brand-blue" />
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
        )}
        {isGoogleLoading ? 'Menghubungkan...' : 'Continue with Google'}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-[#64748B] text-xs font-medium">atau masuk dengan</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      {/* Error Alert */}
      {error && (
        <div
          role="alert"
          className="mb-4 flex items-start gap-3 p-3.5 rounded-xl bg-red-50 border border-red-100 text-danger text-sm"
        >
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Username / Email */}
        <div>
          <label htmlFor={`${id}-username`} className="block text-sm font-medium text-brand-navy mb-1.5">
            Username / Email
          </label>
          <input
            id={`${id}-username`}
            type="text"
            autoComplete="username"
            placeholder="sejukin atau nama@email.com"
            value={formData.usernameOrEmail}
            onChange={handleChange('usernameOrEmail')}
            disabled={isLoading}
            aria-invalid={!!fieldErrors.usernameOrEmail}
            aria-describedby={fieldErrors.usernameOrEmail ? `${id}-username-error` : undefined}
            className={cn('input-field', fieldErrors.usernameOrEmail && 'error')}
          />
          {fieldErrors.usernameOrEmail && (
            <p id={`${id}-username-error`} role="alert" className="mt-1.5 text-xs text-danger flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {fieldErrors.usernameOrEmail}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor={`${id}-password`} className="block text-sm font-medium text-brand-navy">
              Password
            </label>
            <a href="#" className="text-xs text-brand-blue hover:underline font-medium">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <input
              id={`${id}-password`}
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Masukkan password Anda"
              value={formData.password}
              onChange={handleChange('password')}
              disabled={isLoading}
              aria-invalid={!!fieldErrors.password}
              aria-describedby={fieldErrors.password ? `${id}-password-error` : undefined}
              className={cn('input-field pr-11', fieldErrors.password && 'error')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-brand-navy transition-colors p-1"
              aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {fieldErrors.password && (
            <p id={`${id}-password-error`} role="alert" className="mt-1.5 text-xs text-danger flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {fieldErrors.password}
            </p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2">
          <input
            id={`${id}-remember`}
            type="checkbox"
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue/40 cursor-pointer"
          />
          <label htmlFor={`${id}-remember`} className="text-sm text-[#64748B] cursor-pointer">
            Remember me
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || isGoogleLoading}
          className="btn-primary w-full py-3"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              Signing in...
            </>
          ) : (
            <>
              Masuk
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      {/* Demo credentials hint */}
      <div className="mt-4 p-3.5 rounded-xl bg-brand-blue-light border border-brand-blue/20">
        <div className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" aria-hidden="true" />
          <div>
            <p className="text-xs font-semibold text-brand-navy">Demo Credentials</p>
            <p className="text-xs text-[#64748B] mt-0.5">
              Username: <code className="font-mono bg-white px-1 rounded">sejukin</code>{' '}
              | Password: <code className="font-mono bg-white px-1 rounded">sejukbanget23</code>
            </p>
          </div>
        </div>
      </div>

      {/* Register link */}
      <p className="text-center text-sm text-[#64748B] mt-6">
        Belum punya akun?{' '}
        <Link to="/register" className="text-brand-blue font-semibold hover:underline">
          Daftar sekarang
        </Link>
      </p>
    </div>
  )
}
