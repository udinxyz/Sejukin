import { Snowflake, Bell, Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

interface Props {
  onMenuClick: () => void
}

export default function DashboardNavbar({ onMenuClick }: Props) {
  const { user } = useAuth()
  const initials = (user?.full_name || user?.email || 'U').charAt(0).toUpperCase()

  return (
    <header className="bg-white border-b border-slate-100 h-16 flex items-center px-4 lg:px-6 gap-4 sticky top-0 z-30">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
        aria-label="Buka menu"
      >
        <Menu className="w-5 h-5 text-brand-navy" />
      </button>

      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-brand-blue rounded-xl flex items-center justify-center">
          <Snowflake className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <span className="font-extrabold text-brand-navy text-lg hidden sm:block">SEJUKIN</span>
      </Link>

      <div className="ml-auto flex items-center gap-3">
        <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500">
          <Bell className="w-5 h-5" />
        </button>

        <Link to="/dashboard/profile" className="flex items-center gap-2">
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt="profil"
              className="w-9 h-9 rounded-xl object-cover border-2 border-brand-blue/20"
            />
          ) : (
            <div className="w-9 h-9 rounded-xl bg-brand-blue flex items-center justify-center text-white font-bold text-sm">
              {initials}
            </div>
          )}
        </Link>
      </div>
    </header>
  )
}
