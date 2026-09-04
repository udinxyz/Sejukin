import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=600&q=80',
    title: 'AC Deep Cleaning',
    desc: 'Membersihkan unit indoor dan outdoor untuk membantu menjaga kualitas udara dan performa AC.',
    price: 'Mulai Rp75.000',
    badge: 'Most Popular',
    badgeColor: 'bg-brand-blue text-white',
  },
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
    title: 'AC Repair',
    desc: 'Menangani berbagai masalah AC seperti tidak dingin, bocor, berisik, dan masalah lainnya.',
    price: 'Mulai Rp100.000',
    badge: null,
    badgeColor: '',
  },
  {
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80',
    title: 'Freon Service',
    desc: 'Pemeriksaan dan pengisian refrigerant untuk membantu mengembalikan performa pendinginan AC.',
    price: 'Mulai Rp150.000',
    badge: null,
    badgeColor: '',
  },
  {
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80',
    title: 'AC Maintenance',
    desc: 'Perawatan berkala untuk membantu menjaga AC tetap bekerja optimal sepanjang waktu.',
    price: 'Mulai Rp100.000',
    badge: null,
    badgeColor: '',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-brand-bg">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-semibold tracking-wide mb-4">
            Our Services
          </span>
          <h2 className="heading-lg text-brand-navy mb-4">
            Complete AC Service Solutions
          </h2>
          <p className="body-base max-w-xl mx-auto">
            Solusi perawatan dan perbaikan AC untuk menjaga ruangan tetap nyaman sepanjang hari.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map(({ image, title, desc, price, badge, badgeColor }) => (
            <div
              key={title}
              className="group bg-white rounded-2xl border border-slate-100 shadow-card
                hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Real photo header */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 via-transparent to-transparent" />

                {badge && (
                  <span className={`absolute top-3 left-3 ${badgeColor} text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm`}>
                    {badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-base font-bold text-brand-navy mb-2">{title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed mb-4 flex-1">{desc}</p>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-brand-blue font-bold text-sm">{price}</span>
                </div>

                {/* CTA */}
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
                    border border-slate-200 text-brand-navy text-sm font-semibold
                    group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue
                    transition-all duration-200"
                >
                  Book Service
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
