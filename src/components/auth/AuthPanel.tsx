import { Snowflake, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

interface AuthPanelProps {
  headline: string
  subheadline: string
  benefits: string[]
  imageUrl?: string
}

const defaultImages = {
  login: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=85',
  register: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=85',
}

export default function AuthPanel({
  headline,
  subheadline,
  benefits,
  imageUrl,
}: AuthPanelProps) {
  const bgImage = imageUrl ?? defaultImages.login

  return (
    <div className="relative h-full min-h-screen flex flex-col overflow-hidden">
      {/* Real background photo */}
      <img
        src={bgImage}
        alt="SEJUKIN AC Service – Teknisi Profesional"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(29,78,216,0.72) 100%)',
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Decorative snowflakes */}
      <div className="absolute top-20 right-12 opacity-10 pointer-events-none">
        <Snowflake className="w-32 h-32 text-white" strokeWidth={0.5} />
      </div>
      <div className="absolute bottom-24 left-8 opacity-10 pointer-events-none">
        <Snowflake className="w-20 h-20 text-white" strokeWidth={0.5} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-10 xl:p-14">
        {/* Logo */}
        <div>
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center shadow-md">
              <Snowflake className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-extrabold text-white tracking-tight">SEJUKIN</span>
              <span className="text-[9px] font-semibold text-blue-300 tracking-widest uppercase">
                AC SERVICE
              </span>
            </div>
          </Link>
        </div>

        {/* Middle copy */}
        <div className="py-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
            <Snowflake className="w-3.5 h-3.5 text-brand-cyan" strokeWidth={2} />
            <span className="text-white/80 text-xs font-medium">AC Sejuk. Rumah Nyaman.</span>
          </div>

          <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight mb-4">
            {headline}
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-8 max-w-sm">
            {subheadline}
          </p>

          <ul className="space-y-3">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-blue/30 border border-brand-blue/50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-3 h-3 text-brand-cyan" strokeWidth={2.5} />
                </div>
                <span className="text-white/85 text-sm font-medium">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
            <div className="text-2xl font-extrabold text-white mb-0.5">500+</div>
            <div className="text-white/60 text-xs">Happy Customers</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
            <div className="text-2xl font-extrabold text-white mb-0.5">4.9 ⭐</div>
            <div className="text-white/60 text-xs">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  )
}
