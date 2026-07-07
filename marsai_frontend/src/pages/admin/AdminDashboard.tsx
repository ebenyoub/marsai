import { useState } from 'react'
import { AdminSidebar, type Festival } from './Components/AdminSidebar'
import { StatsGrid } from './Components/StatsGrid'
import { LucideIcon, User } from 'lucide-react'
import TabsListContainer from './Components/TabsListContainer'
import { useTranslation } from 'react-i18next'

export type DashboardStat = {
  label?: string,
  value?: string | number,
  icon?: LucideIcon
  color?: string,
  className?: string,
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedFestival, setSelectedFestival] = useState<string>('')
  const { t } = useTranslation()

  const stats: DashboardStat[] = [
    { label: 'Films soumis', value: 120, icon: User, className: 'text-primary' },
    { label: 'Jury actif', value: 8, icon: User, className: 'text-primary' },
    { label: 'Participants', value: 42, icon: User, className: 'text-primary' },
    { label: 'Prix remportés', value: 5, icon: User, className: 'text-primary' },
  ]
  const festivals: Festival[] = [
    { id: '1', name: 'Festival A', status: 'Actif' },
    { id: '2', name: 'Festival B', status: 'Brouillon' },
  ]

  return (
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-60px)]">
  <AdminSidebar
        festivals={festivals}
        selectedFestival={selectedFestival}
        onSelectFestival={setSelectedFestival}
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        t={t}
      />
  <main className="flex-1 overflow-auto">
    <section className="flex flex-col gap-6 w-full p-8 overflow-auto">
        <StatsGrid stats={stats} />
        <TabsListContainer />


      </section>
  </main>
</div>

  )

}

