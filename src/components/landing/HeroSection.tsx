import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ChevronDown,
  Snowflake,
  Star,
  Users,
  CheckCircle,
  Shield,
  Zap,
  BadgeCheck,
} from 'lucide-react'

function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0')
          el.classList.remove('opacity-0', 'translate-y-6')
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return ref
}

export default function HeroSection() {
  const leftRef = useScrollReveal(0.1)
  const rightRef = useScrollReveal(0.1)

  const handleExplore = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden bg-brand-bg pt-16"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue-light/50 rounded-bl-[80px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-brand-cyan/5 blur-3xl" />
      </div>

      <div className="container-max relative z-10 w-full py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* LEFT – Copy */}
          <div
            ref={leftRef}
            className="opacity-0 translate-y-6 transition-all duration-700"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 mb-6">
              <Snowflake className="w-3.5 h-3.5 text-brand-blue" strokeWidth={2} />
              <span className="text-brand-blue text-xs font-semibold tracking-wide">
                Professional AC Service
              </span>
            </div>

            <h1 className="heading-xl text-brand-navy mb-5">
              Professional{' '}
              <span className="text-brand-blue">AC Service</span>,<br />
              Right at Your Door.
            </h1>

            <p className="body-lg max-w-lg mb-8">
              Jaga AC tetap dingin, bersih, dan bekerja optimal dengan layanan service
              profesional yang datang langsung ke rumah Anda.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link to="/login" className="btn-primary px-7 py-3.5 text-base">
                Book Service
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={handleExplore}
                className="btn-secondary px-7 py-3.5 text-base"
              >
                Explore Services
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-5">
              {[
                { Icon: CheckCircle, label: 'Teknisi Profesional' },
                { Icon: Zap, label: 'Jadwal Fleksibel' },
                { Icon: Shield, label: 'Service Transparan' },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon className="w-4 h-4 text-success flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-sm font-medium text-[#64748B]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT – Real photo */}
          <div
            ref={rightRef}
            className="opacity-0 translate-y-6 transition-all duration-700 delay-200 relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-[480px] mx-auto">

              {/* Main photo */}
              <div className="relative rounded-3xl overflow-hidden shadow-float">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=85"
                  alt="Teknisi profesional SEJUKIN sedang melakukan service AC"
                  className="w-full h-[420px] object-cover"
                  loading="eager"
                />
                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-brand-navy/70 to-transparent" />

                {/* Badge inside photo */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-soft">
                    <BadgeCheck className="w-4 h-4 text-brand-blue flex-shrink-0" />
                    <span className="text-xs font-bold text-brand-navy">Teknisi Terverifikasi</span>
                  </div>
                </div>
              </div>

              {/* Floating card – Rating */}
              <div
                className="absolute -top-4 -left-6 bg-white rounded-2xl shadow-float p-3.5 flex items-center gap-3 min-w-[145px]"
                style={{ animation: 'float 3s ease-in-out infinite' }}
              >
                <div className="w-9 h-9 bg-warning/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-warning" fill="currentColor" />
                </div>
                <div>
                  <div className="text-base font-extrabold text-brand-navy leading-none">4.9/5</div>
                  <div className="text-[10px] text-[#64748B] font-medium">Customer Rating</div>
                </div>
              </div>

              {/* Floating card – Customers */}
              <div
                className="absolute -bottom-4 -right-6 bg-white rounded-2xl shadow-float p-3.5 flex items-center gap-3 min-w-[150px]"
                style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '1.5s' }}
              >
                <div className="w-9 h-9 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-brand-blue" />
                </div>
                <div>
                  <div className="text-base font-extrabold text-brand-navy leading-none">500+</div>
                  <div className="text-[10px] text-[#64748B] font-medium">Happy Customers</div>
                </div>
              </div>

              {/* Decorative blur circle behind image */}
              <div className="absolute -z-10 top-8 right-0 w-72 h-72 rounded-full bg-brand-blue/10 blur-3xl" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
