import { useState } from 'react'
import DashboardNavbar from './DashboardNavbar'
import DashboardSidebar from './DashboardSidebar'

interface Props {
  children: React.ReactNode
  title: string
}

export default function DashboardLayout({ children, title }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-brand-bg flex">
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 lg:p-8">
          <h1 className="text-2xl font-extrabold text-brand-navy mb-6">{title}</h1>
          {children}
        </main>
      </div>
    </div>
  )
}
