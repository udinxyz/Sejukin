import { CalendarPlus, History, AirVent, ArrowRight, Wrench, CheckCircle, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { useAuth } from '@/contexts/AuthContext'

const quickActions = [
  {
    to: '/dashboard/booking',
    label: 'Pesan Service',
    desc: 'Jadwalkan kunjungan teknisi',
    icon: CalendarPlus,
    color: 'bg-brand-blue text-white',
  },
  {
    to: '/dashboard/units',
    label: 'Unit AC Saya',
    desc: 'Kelola unit AC Anda',
    icon: AirVent,
    color: 'bg-brand-cyan text-white',
  },
  {
    to: '/dashboard/history',
    label: 'Riwayat Servis',
    desc: 'Lihat history perbaikan',
    icon: History,
    color: 'bg-brand-navy text-white',
  },
]

const recentActivity = [
  {
    label: 'Cuci AC Kamar Utama',
    status: 'Selesai',
    date: '12 Sep 2026',
    icon: CheckCircle,
    statusColor: 'text-success',
  },
  {
    label: 'Isi Freon AC Ruang Tamu',
    status: 'Dalam Proses',
    date: '20 Sep 2026',
    icon: Wrench,
    statusColor: 'text-warning',
  },
  {
    label: 'Maintenance AC Kantor',
    status: 'Menunggu',
    date: '25 Sep 2026',
    icon: Clock,
    statusColor: 'text-slate-400',
  },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const name = user?.full_name || user?.email?.split('@')[0] || 'Pelanggan'

  return (
    <DashboardLayout title="Dashboard">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-brand-navy to-[#1e3a8a] rounded-2xl p-6 text-white mb-6">
        <p className="text-white/70 text-sm">Selamat datang kembali 👋</p>
        <h2 className="text-2xl font-extrabold mt-1">{name}</h2>
        <p className="text-white/60 text-sm mt-1">
          Yuk, jaga AC Anda tetap sejuk dan bersih!
        </p>
        <Link
          to="/dashboard/booking"
          className="inline-flex items-center gap-2 mt-4 bg-white text-brand-blue text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-brand-blue-light transition-colors"
        >
          <CalendarPlus className="w-4 h-4" />
          Pesan Service Sekarang
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {quickActions.map(({ to, label, desc, icon: Icon, color }) => (
          <Link
            key={to}
            to={to}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-card hover:shadow-card-hover transition-shadow flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-brand-navy text-sm">{label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-brand-navy">Aktivitas Terakhir</h3>
          <Link
            to="/dashboard/history"
            className="text-xs text-brand-blue font-medium hover:underline"
          >
            Lihat semua
          </Link>
        </div>
        <div className="space-y-3">
          {recentActivity.map(({ label, status, date, icon: Icon, statusColor }) => (
            <div
              key={label}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-brand-blue" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-brand-navy truncate">{label}</p>
                <p className="text-xs text-slate-400">{date}</p>
              </div>
              <span className={`text-xs font-semibold flex-shrink-0 ${statusColor}`}>
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
