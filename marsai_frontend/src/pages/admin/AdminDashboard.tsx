import { useState } from 'react'
import { AdminSidebar, type Festival } from './Components/AdminSidebar'
import { StatsGrid } from './Components/StatsGrid'
import { LucideIcon, User, Menu } from 'lucide-react'
import TabsListContainer from './Components/TabsListContainer'
import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/button'
import { useFetch } from '@/hooks/useFetch'

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

  const { data: statsData } = useFetch<{
    moviesCount: number;
    juryCount: number;
    directorsCount: number;
    selectionsCount: number;
  }>('/movies/stats');

  const stats: DashboardStat[] = [
    { label: t('admin.stats.films'), value: statsData?.moviesCount ?? 0, icon: User, className: 'text-primary' },
    { label: t('admin.stats.jury'), value: statsData?.juryCount ?? 0, icon: User, className: 'text-primary' },
    { label: t('admin.stats.directors'), value: statsData?.directorsCount ?? 0, icon: User, className: 'text-primary' },
    { label: t('admin.stats.selection'), value: statsData?.selectionsCount ?? 0, icon: User, className: 'text-primary' },
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
          {!sidebarOpen && (
            <div className="flex items-center">
              <Button
                onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-2 bg-slate-900 border border-slate-800 text-white hover:bg-slate-800"
                size="sm"
              >
                <Menu className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider">{t('admin.sidebar.open')}</span>
              </Button>
            </div>
          )}
          <StatsGrid stats={stats} />
          <TabsListContainer />
        </section>
      </main>
    </div>
  )
}
