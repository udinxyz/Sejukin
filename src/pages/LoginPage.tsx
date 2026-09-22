import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Snowflake } from 'lucide-react'
import AuthPanel from '@/components/auth/AuthPanel'
import LoginForm from '@/components/auth/LoginForm'
import { getDemoUser } from '@/services/authService'
import type { User } from '@/types'

export default function LoginPage() {
  const navigate = useNavigate()

  // Redirect if already logged in
  useEffect(() => {
    const user = getDemoUser()
    if (user) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])

  const handleLoginSuccess = (_user: User) => {
    // Navigation is handled inside LoginForm after this callback
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel – brand visual (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[55%] flex-shrink-0">
        <AuthPanel
          headline="Comfort Starts With Better AC Care."
          subheadline="Kelola layanan AC Anda dengan mudah bersama SEJUKIN."
          benefits={[
            'Professional Technicians',
            'Easy Service Booking',
            'Digital Service History',
          ]}
          imageUrl="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=85"
        />
      </div>

      {/* Right panel – login form */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile logo bar */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-blue rounded-xl flex items-center justify-center">
              <Snowflake className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-brand-navy">SEJUKIN</span>
          </Link>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
          <LoginForm onSuccess={handleLoginSuccess} />
        </div>

        {/* Mobile bottom bar */}
        <div className="lg:hidden px-6 pb-6 text-center">
          <p className="text-xs text-[#64748B]">
            © 2026 SEJUKIN. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
