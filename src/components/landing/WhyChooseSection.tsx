import { Shield, Eye, Calendar, ClipboardList } from 'lucide-react'

const benefits = [
  {
    number: '01',
    Icon: Shield,
    title: 'Professional Technicians',
    desc: 'Ditangani oleh teknisi yang terlatih dan berpengalaman di bidangnya.',
  },
  {
    number: '02',
    Icon: Eye,
    title: 'Transparent Service',
    desc: 'Estimasi biaya dan pekerjaan dijelaskan dengan jelas sebelum pengerjaan.',
  },
  {
    number: '03',
    Icon: Calendar,
    title: 'Flexible Scheduling',
    desc: 'Pilih jadwal service yang sesuai dengan kebutuhan dan kesibukan Anda.',
  },
  {
    number: '04',
    Icon: ClipboardList,
    title: 'Service History',
    desc: 'Riwayat perawatan AC tersimpan secara digital dan mudah diakses.',
  },
]

export default function WhyChooseSection() {
  return (
    <section id="why" className="section-padding bg-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT – Real photo */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&q=85"
                alt="Teknisi SEJUKIN sedang memeriksa unit AC"
                className="w-full h-[480px] object-cover"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/40 to-transparent" />
            </div>

            {/* Floating stat card */}
            <div
              className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-float p-5 w-48"
              style={{ animation: 'float 3s ease-in-out infinite' }}
            >
              <p className="text-3xl font-extrabold text-brand-blue mb-0.5">1,200+</p>
              <p className="text-xs font-medium text-[#64748B]">Services Completed</p>
              <div className="mt-2 h-1.5 bg-brand-blue-light rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-brand-blue rounded-full" />
              </div>
            </div>

            {/* Top badge */}
            <div className="absolute -top-4 -left-4 bg-brand-blue text-white rounded-2xl shadow-float px-4 py-3">
              <p className="text-2xl font-extrabold">20+</p>
              <p className="text-xs text-white/80 font-medium">Expert Technicians</p>
            </div>
          </div>

          {/* RIGHT – Benefits */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-semibold tracking-wide mb-4">
              Why Choose Us
            </span>
            <h2 className="heading-lg text-brand-navy mb-3">
              Why Choose <span className="text-brand-blue">SEJUKIN</span>?
            </h2>
            <p className="body-base mb-8">
              Kami tidak hanya membersihkan AC. Kami membantu menjaga kenyamanan rumah Anda.
            </p>

            <div className="space-y-4">
              {benefits.map(({ number, Icon, title, desc }) => (
                <div
                  key={number}
                  className="group flex gap-4 p-4 rounded-2xl border border-slate-100 bg-white
                    hover:shadow-card-hover hover:border-brand-blue/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0
                    group-hover:bg-brand-blue transition-colors duration-300">
                    <Icon className="w-5 h-5 text-brand-blue group-hover:text-white transition-colors duration-300" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-brand-cyan">{number}</span>
                      <h3 className="text-sm font-bold text-brand-navy">{title}</h3>
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
