import { Search, Calendar, User, Smile } from 'lucide-react'

const steps = [
  {
    number: '01',
    Icon: Search,
    title: 'Choose Service',
    desc: 'Pilih layanan AC yang Anda butuhkan dari berbagai opsi yang tersedia.',
  },
  {
    number: '02',
    Icon: Calendar,
    title: 'Set Your Schedule',
    desc: 'Pilih tanggal dan waktu yang paling nyaman untuk Anda.',
  },
  {
    number: '03',
    Icon: User,
    title: 'Professional Technician',
    desc: 'Teknisi profesional kami datang langsung ke lokasi Anda.',
  },
  {
    number: '04',
    Icon: Smile,
    title: 'Enjoy the Comfort',
    desc: 'AC kembali nyaman dan seluruh riwayat service tersimpan secara digital.',
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-semibold tracking-wide mb-4">
            How It Works
          </span>
          <h2 className="heading-lg text-brand-navy mb-4">
            Service AC Tanpa Ribet
          </h2>
          <p className="body-base max-w-md mx-auto">
            Pesan layanan dalam beberapa langkah sederhana.
          </p>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-10 left-0 right-0 h-0.5 flex items-center px-16 pointer-events-none">
              <div className="flex-1 border-t-2 border-dashed border-brand-blue/25" />
            </div>

            <div className="grid grid-cols-4 gap-6 relative">
              {steps.map(({ number, Icon, title, desc }, idx) => (
                <div key={number} className="flex flex-col items-center text-center relative">
                  {/* Step circle */}
                  <div className="relative z-10 w-20 h-20 rounded-full bg-brand-blue flex items-center justify-center shadow-md mb-5">
                    <Icon className="w-8 h-8 text-white" strokeWidth={1.75} />
                    {/* Step number badge */}
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-cyan text-white text-xs font-black flex items-center justify-center border-2 border-white">
                      {idx + 1}
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-brand-navy mb-2">{title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden space-y-0">
          {steps.map(({ number, Icon, title, desc }, idx) => (
            <div key={number} className="flex gap-4">
              {/* Line + circle */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                {idx < steps.length - 1 && (
                  <div className="flex-1 w-0.5 border-l-2 border-dashed border-brand-blue/25 my-1 min-h-[40px]" />
                )}
              </div>

              {/* Content */}
              <div className={`pb-8 ${idx === steps.length - 1 ? 'pb-0' : ''}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black text-brand-cyan">{number}</span>
                  <h3 className="text-base font-bold text-brand-navy">{title}</h3>
                </div>
                <p className="text-sm text-[#64748B] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
