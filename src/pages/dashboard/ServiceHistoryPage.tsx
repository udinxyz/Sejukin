import { CheckCircle, Clock, Wrench, Star, ChevronRight } from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { cn } from '@/lib/utils'

type BookingStatus = 'selesai' | 'dalam_proses' | 'menunggu'

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; className: string; icon: typeof CheckCircle }
> = {
  selesai: { label: 'Selesai', className: 'bg-success/10 text-success', icon: CheckCircle },
  dalam_proses: {
    label: 'Dalam Proses',
    className: 'bg-warning/10 text-warning',
    icon: Wrench,
  },
  menunggu: { label: 'Menunggu', className: 'bg-slate-100 text-slate-500', icon: Clock },
}

interface HistoryItem {
  id: string
  service: string
  unit: string
  date: string
  technician: string
  status: BookingStatus
  rating: number | null
  price: string
}

const mockHistory: HistoryItem[] = [
  {
    id: '1',
    service: 'Cuci AC (Deep Cleaning)',
    unit: 'AC Kamar Utama',
    date: '12 Sep 2026',
    technician: 'Budi Santoso',
    status: 'selesai',
    rating: 5,
    price: 'Rp 89.000',
  },
  {
    id: '2',
    service: 'Isi Freon R32',
    unit: 'AC Ruang Tamu',
    date: '20 Sep 2026',
    technician: 'Ahmad Rizki',
    status: 'dalam_proses',
    rating: null,
    price: 'Rp 220.000',
  },
  {
    id: '3',
    service: 'Maintenance Rutin',
    unit: 'AC Kamar Utama',
    date: '25 Sep 2026',
    technician: '-',
    status: 'menunggu',
    rating: null,
    price: 'Rp 349.000',
  },
]

export default function ServiceHistoryPage() {
  return (
    <DashboardLayout title="Riwayat Servis">
      <div className="space-y-3">
        {mockHistory.map((item) => {
          const st = STATUS_CONFIG[item.status]
          const Icon = st.icon
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-card p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-brand-navy text-sm">{item.service}</h3>
                    <span
                      className={cn(
                        'text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1',
                        st.className
                      )}
                    >
                      <Icon className="w-3 h-3" />
                      {st.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Unit: {item.unit}</p>
                  <p className="text-xs text-slate-500">
                    Tanggal: {item.date} · Teknisi: {item.technician}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-brand-navy text-sm">{item.price}</p>
                  {item.rating && (
                    <div className="flex items-center gap-0.5 justify-end mt-1">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-warning fill-warning" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {item.status === 'selesai' && (
                <button className="mt-3 flex items-center gap-1.5 text-xs text-brand-blue font-medium hover:underline">
                  Lihat laporan servis{' '}
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )
        })}
      </div>
    </DashboardLayout>
  )
}
