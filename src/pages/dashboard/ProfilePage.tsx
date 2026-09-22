import { User, Mail, Phone, LogOut } from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const displayName =
    user?.full_name || user?.email?.split('@')[0] || 'Pengguna'

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <DashboardLayout title="Profil Saya">
      <div className="max-w-xl space-y-4">
        {/* Avatar & name */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 flex items-center gap-4">
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt="profil"
              className="w-20 h-20 rounded-2xl object-cover border-2 border-brand-blue/20"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-brand-blue flex items-center justify-center text-white text-3xl font-extrabold">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h2 className="text-xl font-extrabold text-brand-navy">{displayName}</h2>
            <p className="text-sm text-slate-500">{user?.email || 'Akun Demo'}</p>
            <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold bg-success/10 text-success px-2.5 py-0.5 rounded-full">
              Akun Aktif
            </span>
          </div>
        </div>

        {/* Info fields */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-4">
          <h3 className="font-bold text-brand-navy">Informasi Akun</h3>
          {[
            { label: 'Nama Lengkap', value: displayName, icon: User },
            {
              label: 'Email',
              value: user?.email || 'demo@sejukin.id',
              icon: Mail,
            },
            {
              label: 'Nomor Telepon',
              value: user?.phone || '-',
              icon: Phone,
            },
          ].map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-brand-blue" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400">{label}</p>
                <p className="text-sm font-semibold text-brand-navy truncate">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-red-100 text-red-500 hover:bg-red-50 font-semibold transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Keluar dari Akun
        </button>
      </div>
    </DashboardLayout>
  )
}
