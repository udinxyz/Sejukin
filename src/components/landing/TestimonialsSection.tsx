import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Andi Pratama',
    location: 'Yogyakarta',
    initials: 'AP',
    color: 'bg-blue-500',
    rating: 5,
    text: 'Proses booking sangat mudah dan teknisinya datang tepat waktu. Sangat puas dengan hasilnya! AC saya jadi lebih dingin dari sebelumnya.',
  },
  {
    name: 'Sinta Maharani',
    location: 'Sleman',
    initials: 'SM',
    color: 'bg-purple-500',
    rating: 5,
    text: 'AC saya yang sebelumnya kurang dingin sekarang sudah kembali normal. Teknisinya juga sangat profesional dan ramah.',
  },
  {
    name: 'Rizky Ramadhan',
    location: 'Bantul',
    initials: 'RR',
    color: 'bg-brand-cyan',
    rating: 5,
    text: 'Teknisinya ramah dan menjelaskan masalah AC dengan sangat jelas. Harganya pun sangat terjangkau dan sesuai estimasi.',
  },
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding bg-brand-bg">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-semibold tracking-wide mb-4">
            Testimonials
          </span>
          <h2 className="heading-lg text-brand-navy mb-4">
            What Our Customers Say
          </h2>
          <p className="body-base max-w-md mx-auto">
            Ribuan pelanggan telah merasakan manfaat layanan SEJUKIN.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, location, initials, color, rating, text }) => (
            <div
              key={name}
              className="bg-white rounded-2xl border border-slate-100 shadow-card p-6
                hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-brand-blue/20" fill="currentColor" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4" aria-label={`${rating} out of 5 stars`}>
                {Array.from({ length: rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-warning"
                    fill="currentColor"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-[#64748B] leading-relaxed flex-1 mb-6">
                "{text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div
                  className={`w-10 h-10 rounded-full ${color} flex items-center justify-center flex-shrink-0`}
                  aria-hidden="true"
                >
                  <span className="text-white text-sm font-bold">{initials}</span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-brand-navy">{name}</p>
                  <p className="text-xs text-[#64748B]">{location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
