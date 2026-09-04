import { Link } from 'react-router-dom'
import { Snowflake } from 'lucide-react'
import AuthPanel from '@/components/auth/AuthPanel'
import RegisterForm from '@/components/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[55%] flex-shrink-0">
        <AuthPanel
          headline="Start Your Journey to Better AC Care."
          subheadline="Daftar dan nikmati pengalaman service AC yang lebih mudah, lebih cepat, dan lebih transparan."
          benefits={[
            'Easy Booking',
            'Professional Technicians',
            'Digital Service History',
          ]}
          imageUrl="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=85"
        />
      </div>

      {/* Right panel */}
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
        <div className="flex-1 flex items-center justify-center p-6 sm:p-10 py-10">
          <RegisterForm />
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
