import { Link } from 'react-router-dom'
import { Snowflake, Phone, Mail, MapPin, Instagram, MessageCircle, Facebook } from 'lucide-react'

const footerLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Services', href: '/#services' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#footer' },
]

export default function Footer() {
  return (
    <footer id="footer" className="bg-brand-navy text-white">
      <div className="container-max py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center">
                <Snowflake className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-extrabold tracking-tight">SEJUKIN</span>
                <span className="text-[9px] font-semibold text-slate-400 tracking-widest uppercase">
                  AC SERVICE
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              Jasa service AC profesional yang datang langsung ke rumah Anda. Teknisi terlatih,
              harga transparan, dan jadwal fleksibel.
            </p>
            <p className="text-brand-cyan font-semibold italic text-sm">"AC Sejuk. Rumah Nyaman."</p>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: Instagram, label: 'Instagram', href: '#' },
                { Icon: MessageCircle, label: 'WhatsApp', href: '#' },
                { Icon: Facebook, label: 'Facebook', href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand-blue flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {footerLinks.map(link => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate-300 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-cyan mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 text-sm">+62 812-3456-7890</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-cyan mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 text-sm">hello@sejukin.id</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-cyan mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 text-sm">Yogyakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-max py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">
            © 2026 SEJUKIN. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
