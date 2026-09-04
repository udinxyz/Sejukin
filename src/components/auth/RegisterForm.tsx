import { useState, useId } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, AlertCircle, ArrowRight, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { registerWithEmail, registerWithGoogle } from '@/services/authService'
import { validateEmail, validatePhone, validatePassword, validateFullName, getPasswordStrength, type PasswordStrength } from '@/utils/validation'
import { isSupabaseConfigured } from '@/lib/supabase'

export default function RegisterForm() {
  const id = useId()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | undefined>>({})

  const passwordStrength: PasswordStrength = formData.password
    ? getPasswordStrength(formData.password)
    : 'weak'

  const strengthConfig = {
    weak: { label: 'Weak', color: 'bg-danger', width: 'w-1/3', textColor: 'text-danger' },
    medium: { label: 'Medium', color: 'bg-warning', width: 'w-2/3', textColor: 'text-warning' },
    strong: { label: 'Strong', color: 'bg-success', width: 'w-full', textColor: 'text-success' },
  }
  const strength = strengthConfig[passwordStrength]

  const validateForm = () => {
    const errors: Record<string, string | undefined> = {}

    const nameResult = validateFullName(formData.fullName)
    if (!nameResult.isValid) errors.fullName = nameResult.error

    const emailResult = validateEmail(formData.email)
    if (!emailResult.isValid) errors.email = emailResult.error

    const phoneResult = validatePhone(formData.phone)
    if (!phoneResult.isValid) errors.phone = phoneResult.error

    const pwResult = validatePassword(formData.password)
    if (!pwResult.isValid) errors.password = pwResult.error

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Konfirmasi password wajib diisi.'
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Password tidak cocok.'
    }

    if (!formData.agreeTerms) {
      errors.agreeTerms = 'Anda harus menyetujui Terms of Service.'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!validateForm()) return

    if (!isSupabaseConfigured) {
      // Demo mode: simulate successful registration
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1200))
      setIsLoading(false)
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2500)
      return
    }

    setIsLoading(true)
    try {
      await registerWithEmail({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      })
      setSuccess(true)
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registrasi gagal. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleRegister = async () => {
    setError(null)
    if (!isSupabaseConfigured) {
      setError(
        'Google Sign Up memerlukan konfigurasi Supabase. Tambahkan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY ke file .env Anda.'
      )
      return
    }
    setIsGoogleLoading(true)
    try {
      await registerWithGoogle()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google Sign Up gagal.')
      setIsGoogleLoading(false)
    }
  }

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData(prev => ({ ...prev, [field]: value }))
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: undefined }))
    }
    if (error) setError(null)
  }

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-8">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h2 className="text-xl font-bold text-brand-navy mb-2">Pendaftaran Berhasil!</h2>
        <p className="text-[#64748B] text-sm mb-1">
          {isSupabaseConfigured
            ? 'Akun berhasil dibuat. Silakan cek email Anda untuk verifikasi akun.'
            : 'Akun demo berhasil dibuat. Mengalihkan ke halaman login...'}
        </p>
        <p className="text-xs text-[#64748B]">Anda akan diarahkan ke halaman login sebentar lagi.</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-navy mb-1.5">Create Your Account</h1>
        <p className="text-[#64748B] text-sm">Daftar sekarang untuk mengelola kebutuhan service AC Anda.</p>
      </div>

      {/* Google Register */}
      <button
        type="button"
        onClick={handleGoogleRegister}
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
      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-[#64748B] text-xs font-medium">atau daftar dengan email</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      {/* Error Alert */}
      {error && (
        <div role="alert" className="mb-4 flex items-start gap-3 p-3.5 rounded-xl bg-red-50 border border-red-100 text-danger text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor={`${id}-name`} className="block text-sm font-medium text-brand-navy mb-1.5">
            Nama Lengkap
          </label>
          <input
            id={`${id}-name`}
            type="text"
            autoComplete="name"
            placeholder="Contoh: Budi Santoso"
            value={formData.fullName}
            onChange={handleChange('fullName')}
            disabled={isLoading}
            aria-invalid={!!fieldErrors.fullName}
            aria-describedby={fieldErrors.fullName ? `${id}-name-error` : undefined}
            className={cn('input-field', fieldErrors.fullName && 'error')}
          />
          {fieldErrors.fullName && (
            <p id={`${id}-name-error`} role="alert" className="mt-1.5 text-xs text-danger flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {fieldErrors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor={`${id}-email`} className="block text-sm font-medium text-brand-navy mb-1.5">
            Email
          </label>
          <input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            placeholder="nama@email.com"
            value={formData.email}
            onChange={handleChange('email')}
            disabled={isLoading}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? `${id}-email-error` : undefined}
            className={cn('input-field', fieldErrors.email && 'error')}
          />
          {fieldErrors.email && (
            <p id={`${id}-email-error`} role="alert" className="mt-1.5 text-xs text-danger flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor={`${id}-phone`} className="block text-sm font-medium text-brand-navy mb-1.5">
            Nomor HP
          </label>
          <input
            id={`${id}-phone`}
            type="tel"
            autoComplete="tel"
            placeholder="08123456789"
            value={formData.phone}
            onChange={handleChange('phone')}
            disabled={isLoading}
            aria-invalid={!!fieldErrors.phone}
            aria-describedby={fieldErrors.phone ? `${id}-phone-error` : undefined}
            className={cn('input-field', fieldErrors.phone && 'error')}
          />
          {fieldErrors.phone && (
            <p id={`${id}-phone-error`} role="alert" className="mt-1.5 text-xs text-danger flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {fieldErrors.phone}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor={`${id}-password`} className="block text-sm font-medium text-brand-navy mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              id={`${id}-password`}
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Minimal 8 karakter"
              value={formData.password}
              onChange={handleChange('password')}
              disabled={isLoading}
              aria-invalid={!!fieldErrors.password}
              aria-describedby={`${id}-pw-strength ${fieldErrors.password ? `${id}-password-error` : ''}`}
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

          {/* Password Strength */}
          {formData.password && (
            <div id={`${id}-pw-strength`} className="mt-2" role="status" aria-label={`Password strength: ${strength.label}`}>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all duration-500', strength.color, strength.width)}
                />
              </div>
              <p className={cn('text-xs font-medium mt-1', strength.textColor)}>
                Password Strength: {strength.label}
              </p>
            </div>
          )}

          {fieldErrors.password && (
            <p id={`${id}-password-error`} role="alert" className="mt-1.5 text-xs text-danger flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {fieldErrors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor={`${id}-confirm`} className="block text-sm font-medium text-brand-navy mb-1.5">
            Konfirmasi Password
          </label>
          <div className="relative">
            <input
              id={`${id}-confirm`}
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Ulangi password Anda"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              disabled={isLoading}
              aria-invalid={!!fieldErrors.confirmPassword}
              aria-describedby={fieldErrors.confirmPassword ? `${id}-confirm-error` : undefined}
              className={cn('input-field pr-11', fieldErrors.confirmPassword && 'error')}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-brand-navy transition-colors p-1"
              aria-label={showConfirm ? 'Sembunyikan konfirmasi password' : 'Tampilkan konfirmasi password'}
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {formData.confirmPassword && !fieldErrors.confirmPassword && formData.password === formData.confirmPassword && (
            <p className="mt-1.5 text-xs text-success flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Password cocok
            </p>
          )}
          {fieldErrors.confirmPassword && (
            <p id={`${id}-confirm-error`} role="alert" className="mt-1.5 text-xs text-danger flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {fieldErrors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms */}
        <div>
          <div className="flex items-start gap-2.5">
            <input
              id={`${id}-terms`}
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={handleChange('agreeTerms')}
              disabled={isLoading}
              aria-invalid={!!fieldErrors.agreeTerms}
              aria-describedby={fieldErrors.agreeTerms ? `${id}-terms-error` : undefined}
              className="w-4 h-4 mt-0.5 rounded border-slate-300 text-brand-blue focus:ring-brand-blue/40 cursor-pointer flex-shrink-0"
            />
            <label htmlFor={`${id}-terms`} className="text-sm text-[#64748B] cursor-pointer leading-relaxed">
              Saya menyetujui{' '}
              <a href="#" className="text-brand-blue hover:underline font-medium">Terms of Service</a>{' '}
              dan{' '}
              <a href="#" className="text-brand-blue hover:underline font-medium">Privacy Policy</a>{' '}
              SEJUKIN.
            </label>
          </div>
          {fieldErrors.agreeTerms && (
            <p id={`${id}-terms-error`} role="alert" className="mt-1.5 text-xs text-danger flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {fieldErrors.agreeTerms}
            </p>
          )}
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
              Creating account...
            </>
          ) : (
            <>
              Daftar
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      {/* Login link */}
      <p className="text-center text-sm text-[#64748B] mt-6">
        Sudah punya akun?{' '}
        <Link to="/login" className="text-brand-blue font-semibold hover:underline">
          Masuk
        </Link>
      </p>
    </div>
  )
}
