import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  AirVent,
  CalendarPlus,
  History,
  User,
  LogOut,
  X,
  Snowflake,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/dashboard/units', label: 'Unit AC Saya', icon: AirVent, end: false },
  { to: '/dashboard/booking', label: 'Pesan Service', icon: CalendarPlus, end: false },
  { to: '/dashboard/history', label: 'Riwayat Servis', icon: History, end: false },
  { to: '/dashboard/profile', label: 'Profil Saya', icon: User, end: false },
]

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function DashboardSidebar({ isOpen, onClose }: Props) {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-100 z-50 flex flex-col transition-transform duration-300',
          'lg:translate-x-0 lg:static lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Mobile header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-blue rounded-xl flex items-center justify-center">
              <Snowflake className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-brand-navy">SEJUKIN</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Tutup menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop logo */}
        <div className="hidden lg:flex items-center gap-2 px-6 h-16 border-b border-slate-100">
          <div className="w-8 h-8 bg-brand-blue rounded-xl flex items-center justify-center">
            <Snowflake className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-extrabold text-brand-navy text-lg">SEJUKIN</span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-blue text-white'
                    : 'text-slate-600 hover:bg-brand-blue-light hover:text-brand-blue'
                )
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            Keluar
          </button>
        </div>
      </aside>
    </>
  )
}
