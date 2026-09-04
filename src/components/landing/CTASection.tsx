import { Link } from 'react-router-dom'
import { ArrowRight, Snowflake, LogIn } from 'lucide-react'

export default function CTASection() {
  return (
    <section id="cta" className="section-padding bg-brand-navy relative overflow-hidden">
      {/* Decorative snowflakes */}
      <div className="absolute top-8 left-8 opacity-5 pointer-events-none">
        <Snowflake className="w-48 h-48 text-white" strokeWidth={0.5} />
      </div>
      <div className="absolute bottom-8 right-8 opacity-5 pointer-events-none">
        <Snowflake className="w-64 h-64 text-brand-cyan" strokeWidth={0.5} />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <Snowflake className="w-[500px] h-[500px] text-white" strokeWidth={0.3} />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container-max relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
          <Snowflake className="w-3.5 h-3.5 text-brand-cyan" strokeWidth={2} />
          <span className="text-white/80 text-xs font-medium">Siap Melayani Anda</span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5 max-w-2xl mx-auto">
          Ready to Make Your AC{' '}
          <span className="text-brand-cyan">Feel Like New?</span>
        </h2>

        <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Pesan layanan AC profesional dan nikmati kenyamanan tanpa harus repot.
          Teknisi kami siap datang ke lokasi Anda.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-blue
              font-bold rounded-xl hover:bg-brand-blue-light transition-all duration-200 shadow-soft
              hover:shadow-md active:scale-[0.98] text-base min-w-[180px]"
          >
            Book Service
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white
              font-bold rounded-xl border-2 border-white/30 hover:border-white/60 hover:bg-white/10
              transition-all duration-200 text-base min-w-[180px]"
          >
            <LogIn className="w-5 h-5" />
            Login
          </Link>
        </div>

        {/* Trust line */}
        <p className="mt-8 text-white/40 text-sm">
          Bergabung dengan 500+ pelanggan yang sudah mempercayakan AC mereka pada SEJUKIN.
        </p>
      </div>
    </section>
  )
}
