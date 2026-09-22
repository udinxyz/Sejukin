import { useState } from 'react'
import { AirVent, Plus, MapPin, Thermometer, QrCode, MoreVertical, X } from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { cn } from '@/lib/utils'

interface ACUnit {
  id: string
  name: string
  brand: string
  location: string
  type: string
  lastService: string
  status: 'baik' | 'perlu_service' | 'dalam_perbaikan'
}

const mockUnits: ACUnit[] = [
  {
    id: '1',
    name: 'AC Kamar Utama',
    brand: 'Daikin',
    location: 'Lantai 2',
    type: 'Split 1 PK',
    lastService: '12 Sep 2026',
    status: 'baik',
  },
  {
    id: '2',
    name: 'AC Ruang Tamu',
    brand: 'Panasonic',
    location: 'Lantai 1',
    type: 'Split 2 PK',
    lastService: '3 Agt 2026',
    status: 'perlu_service',
  },
]

const statusConfig = {
  baik: { label: 'Baik', className: 'bg-success/10 text-success' },
  perlu_service: { label: 'Perlu Service', className: 'bg-warning/10 text-warning' },
  dalam_perbaikan: {
    label: 'Dalam Perbaikan',
    className: 'bg-brand-blue/10 text-brand-blue',
  },
}

export default function MyACUnitsPage() {
  const [units] = useState<ACUnit[]>(mockUnits)
  const [showAddForm, setShowAddForm] = useState(false)
  const [form, setForm] = useState({ name: '', brand: '', location: '', type: '' })

  const handleChange = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  return (
    <DashboardLayout title="Unit AC Saya">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">{units.length} unit terdaftar</p>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary text-sm px-4 py-2.5 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Tambah Unit AC
        </button>
      </div>

      {/* Unit cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {units.map((unit) => {
          const st = statusConfig[unit.status]
          return (
            <div
              key={unit.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-card p-5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-blue-light rounded-xl flex items-center justify-center">
                    <AirVent className="w-6 h-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy">{unit.name}</h3>
                    <p className="text-xs text-slate-500">
                      {unit.brand} · {unit.type}
                    </p>
                  </div>
                </div>
                <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>{unit.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Thermometer className="w-4 h-4 flex-shrink-0" />
                  <span>Service terakhir: {unit.lastService}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'text-xs font-semibold px-3 py-1 rounded-full',
                    st.className
                  )}
                >
                  {st.label}
                </span>
                <button className="flex items-center gap-1.5 text-xs text-brand-blue hover:underline font-medium">
                  <QrCode className="w-3.5 h-3.5" />
                  AC Passport
                </button>
              </div>
            </div>
          )
        })}

        {units.length === 0 && (
          <div className="col-span-2 bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center">
            <AirVent className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="font-semibold text-slate-500">Belum ada unit AC</p>
            <p className="text-sm text-slate-400 mt-1">
              Tambahkan unit AC pertama Anda
            </p>
          </div>
        )}
      </div>

      {/* Add unit modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-float">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-brand-navy text-lg">Tambah Unit AC</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {[
                {
                  label: 'Nama Unit',
                  placeholder: 'AC Kamar Utama',
                  key: 'name',
                },
                { label: 'Merk AC', placeholder: 'Daikin, Panasonic...', key: 'brand' },
                {
                  label: 'Lokasi di Rumah',
                  placeholder: 'Lantai 1, Kamar 2...',
                  key: 'location',
                },
                {
                  label: 'Tipe AC',
                  placeholder: 'Split 1 PK, Split 2 PK...',
                  key: 'type',
                },
              ].map(({ label, placeholder, key }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-brand-navy mb-1">
                    {label}
                  </label>
                  <input
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 btn-secondary py-2.5"
              >
                Batal
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 btn-primary py-2.5"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
