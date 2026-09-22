import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Snowflake, Menu, X, PhoneCall, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Services', href: '/#services' },
  { label: 'Why SEJUKIN', href: '/#why' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'About', href: '/#about' },
  { label: 'Dashboard', href: '/dashboard' },
]

export default function Navbar() {
  const { user } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const location = useLocation()
  const isLanding = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Active section detection
      const sections = ['home', 'services', 'why', 'how-it-works', 'about']
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [location])

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#') && isLanding) {
      const id = href.slice(2)
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    setIsMobileOpen(false)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-slate-100'
            : 'bg-white/80 backdrop-blur-sm'
        )}
      >
        <div className="container-max">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-brand-blue rounded-xl flex items-center justify-center shadow-sm group-hover:bg-brand-blue-dark transition-colors">
                <Snowflake className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-extrabold text-brand-navy tracking-tight">
                  SEJUKIN
                </span>
                <span className="text-[9px] font-semibold text-[#64748B] tracking-widest uppercase">
                  AC SERVICE
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                if (link.href.startsWith('/#')) {
                  const sectionId = link.href.slice(2)
                  const isActive = isLanding && activeSection === sectionId
                  return (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className={cn(
                        'nav-link px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'text-brand-blue bg-brand-blue-light'
                          : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
                      )}
                    >
                      {link.label}
                    </button>
                  )
                }

                // Regular link (e.g. /dashboard)
                const isActive = location.pathname.startsWith(link.href)
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      'nav-link px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'text-brand-blue bg-brand-blue-light'
                        : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="btn-secondary text-sm px-4 py-2 flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4 text-brand-blue" />
                    Dashboard
                  </Link>
                  <Link to="/dashboard/booking" className="btn-primary text-sm px-5 py-2.5">
                    Pesan Service
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-ghost text-sm">
                    Login
                  </Link>
                  <Link to="/login" className="btn-primary text-sm px-5 py-2.5">
                    Book Service
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileOpen ? (
                <X className="w-5 h-5 text-brand-navy" />
              ) : (
                <Menu className="w-5 h-5 text-brand-navy" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden transition-all duration-300',
          isMobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />

        {/* Drawer */}
        <div
          className={cn(
            'absolute top-0 right-0 h-full w-72 bg-white shadow-float flex flex-col transition-transform duration-300',
            isMobileOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex items-center justify-between p-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-blue rounded-xl flex items-center justify-center">
                <Snowflake className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-brand-navy">SEJUKIN</span>
            </div>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col p-4 gap-1 flex-1 overflow-y-auto">
            {navLinks.map((link) => {
              if (link.href.startsWith('/#')) {
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left px-4 py-3 text-[#64748B] font-medium rounded-xl hover:bg-brand-blue-light hover:text-brand-blue transition-colors"
                  >
                    {link.label}
                  </button>
                )
              }
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-left px-4 py-3 text-[#64748B] font-medium rounded-xl hover:bg-brand-blue-light hover:text-brand-blue transition-colors"
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 flex flex-col gap-3 border-t border-slate-100">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50">
              <PhoneCall className="w-4 h-4 text-brand-blue flex-shrink-0" />
              <span className="text-sm font-medium text-brand-navy">+62 812-3456-7890</span>
            </div>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="btn-secondary justify-center flex items-center gap-2"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <LayoutDashboard className="w-4 h-4 text-brand-blue" />
                  Dashboard
                </Link>
                <Link
                  to="/dashboard/booking"
                  className="btn-primary justify-center"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Pesan Service
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn-ghost justify-center"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/login"
                  className="btn-primary justify-center"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Book Service
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
