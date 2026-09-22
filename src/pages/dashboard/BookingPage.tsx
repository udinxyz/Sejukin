import { useState } from 'react'
import {
  Check,
  ChevronRight,
  AirVent,
  CalendarDays,
  ClipboardList,
  CheckCircle,
} from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { cn } from '@/lib/utils'

const SERVICES = [
  {
    id: 'cuci',
    label: 'Cuci AC',
    desc: 'Pembersihan menyeluruh unit indoor & outdoor',
    price: 'Rp 89.000',
    icon: '🧹',
  },
  {
    id: 'repair',
    label: 'Perbaikan AC',
    desc: 'Diagnosa dan perbaikan kerusakan',
    price: 'Rp 150.000+',
    icon: '🔧',
  },
  {
    id: 'freon',
    label: 'Isi Freon',
    desc: 'Pengisian ulang refrigerant',
    price: 'Rp 200.000+',
    icon: '❄️',
  },
  {
    id: 'maintenance',
    label: 'Maintenance Rutin',
    desc: 'Paket perawatan lengkap',
    price: 'Rp 349.000',
    icon: '⭐',
  },
]

const COMPLAINTS = [
  'AC tidak dingin',
  'AC bunyi berisik',
  'AC mati total',
  'AC bocor air',
  'AC bau tidak sedap',
  'Remote tidak berfungsi',
  'AC hanya kipas (tidak ada pendingin)',
]

const STEPS = ['Pilih Layanan', 'Keluhan', 'Jadwal', 'Konfirmasi']

export default function BookingPage() {
  const [step, setStep] = useState(0)
  const [selectedService, setSelectedService] = useState('')
  const [selectedComplaints, setSelectedComplaints] = useState<string[]>([])
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [address, setAddress] = useState('')
  const [done, setDone] = useState(false)

  const toggleComplaint = (c: string) => {
    setSelectedComplaints((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    )
  }

  const service = SERVICES.find((s) => s.id === selectedService)

  const resetForm = () => {
    setDone(false)
    setStep(0)
    setSelectedService('')
    setSelectedComplaints([])
    setDate('')
    setTime('')
    setAddress('')
  }

  if (done) {
    return (
      <DashboardLayout title="Pesan Service">
        <div className="max-w-md mx-auto text-center bg-white rounded-2xl border border-slate-100 shadow-card p-10">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-xl font-extrabold text-brand-navy mb-2">
            Pesanan Berhasil!
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Pesanan service AC Anda telah diterima. Tim kami akan segera menghubungi
            Anda untuk konfirmasi jadwal.
          </p>
          <button onClick={resetForm} className="btn-primary mt-6 px-8">
            Pesan Lagi
          </button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Pesan Service">
      {/* Stepper */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-shrink-0">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors',
                i < step
                  ? 'bg-success text-white'
                  : i === step
                  ? 'bg-brand-blue text-white'
                  : 'bg-slate-100 text-slate-400'
              )}
            >
              {i < step ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={cn(
                'text-sm font-medium hidden sm:block',
                i === step ? 'text-brand-navy' : 'text-slate-400'
              )}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      <div className="max-w-2xl">
        {/* Step 0 — Pilih Layanan */}
        {step === 0 && (
          <div>
            <p className="text-sm text-slate-500 mb-4">
              Pilih jenis layanan yang Anda butuhkan:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICES.map(({ id, label, desc, price, icon }) => (
                <button
                  key={id}
                  onClick={() => setSelectedService(id)}
                  className={cn(
                    'p-4 rounded-2xl border-2 text-left transition-all',
                    selectedService === id
                      ? 'border-brand-blue bg-brand-blue-light'
                      : 'border-slate-100 bg-white hover:border-brand-blue/40'
                  )}
                >
                  <span className="text-2xl mb-2 block">{icon}</span>
                  <p className="font-bold text-brand-navy text-sm">{label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                  <p className="text-xs font-bold text-brand-blue mt-2">{price}</p>
                </button>
              ))}
            </div>
            <button
              disabled={!selectedService}
              onClick={() => setStep(1)}
              className="btn-primary mt-6 px-8 disabled:opacity-40 flex items-center gap-2"
            >
              Lanjut <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 1 — Keluhan */}
        {step === 1 && (
          <div>
            <p className="text-sm text-slate-500 mb-4">
              Apa keluhan AC Anda? (boleh pilih lebih dari satu)
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {COMPLAINTS.map((c) => (
                <button
                  key={c}
                  onClick={() => toggleComplaint(c)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium border transition-all',
                    selectedComplaints.includes(c)
                      ? 'bg-brand-blue text-white border-brand-blue'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-brand-blue/50'
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="btn-secondary px-6">
                Kembali
              </button>
              <button
                onClick={() => setStep(2)}
                className="btn-primary px-8 flex items-center gap-2"
              >
                Lanjut <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2 — Jadwal */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-1.5">
                  Tanggal Kunjungan
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-1.5">
                  Jam Kunjungan
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      className={cn(
                        'py-2.5 rounded-xl text-sm font-medium border transition-all',
                        time === t
                          ? 'bg-brand-blue text-white border-brand-blue'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-brand-blue/50'
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-1.5">
                  Alamat Lengkap
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  placeholder="Jl. Contoh No. 123, Yogyakarta"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setStep(1)} className="btn-secondary px-6">
                Kembali
              </button>
              <button
                disabled={!date || !time || !address}
                onClick={() => setStep(3)}
                className="btn-primary px-8 disabled:opacity-40 flex items-center gap-2"
              >
                Lanjut <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Konfirmasi */}
        {step === 3 && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
            <h3 className="font-bold text-brand-navy mb-4">Ringkasan Pesanan</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <ClipboardList className="w-5 h-5 text-brand-blue flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400">Layanan</p>
                  <p className="font-semibold text-brand-navy text-sm">
                    {service?.label} —{' '}
                    <span className="text-brand-blue">{service?.price}</span>
                  </p>
                </div>
              </div>
              {selectedComplaints.length > 0 && (
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-400 mb-1">Keluhan</p>
                  <p className="text-sm text-brand-navy">{selectedComplaints.join(', ')}</p>
                </div>
              )}
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <CalendarDays className="w-5 h-5 text-brand-blue flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400">Jadwal</p>
                  <p className="font-semibold text-brand-navy text-sm">
                    {date} pukul {time}
                  </p>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-400 mb-1">Alamat</p>
                <p className="text-sm text-brand-navy">{address}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="btn-secondary px-6">
                Kembali
              </button>
              <button
                onClick={() => setDone(true)}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                <AirVent className="w-4 h-4" />
                Konfirmasi Pesanan
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
