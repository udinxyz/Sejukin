import { Star } from 'lucide-react'

const stats = [
  { value: '500+', label: 'Customers Served', icon: null },
  { value: '1,200+', label: 'Services Completed', icon: null },
  { value: '20+', label: 'Professional Technicians', icon: null },
  { value: '4.9/5', label: 'Customer Rating', icon: Star },
]

export default function TrustStatsSection() {
  return (
    <section className="bg-brand-blue-light py-16">
      <div className="container-max">
        <div className="text-center mb-10">
          <h2 className="heading-md text-brand-navy mb-3">
            Trusted AC Care for Your Comfort
          </h2>
          <p className="body-base max-w-xl mx-auto">
            Perawatan AC yang tepat membuat rumah lebih nyaman dan membantu menjaga
            performa AC lebih lama.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ value, label, icon: Icon }, idx) => (
            <div
              key={label}
              className={`text-center py-6 px-4 ${
                idx < stats.length - 1 ? 'lg:border-r border-brand-blue/15' : ''
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <span className="text-4xl md:text-5xl font-extrabold text-brand-blue">
                  {value}
                </span>
                {Icon && (
                  <Icon
                    className="w-6 h-6 text-warning mb-1"
                    fill="currentColor"
                    aria-hidden="true"
                  />
                )}
              </div>
              <p className="text-sm font-semibold text-[#64748B]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
