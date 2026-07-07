import { CMSStatsCard } from "./CMSStatsCard"
import { FestivalInstance } from "./CreateFestivalForm"

export function CMSStatsGrid({ festivals }: { festivals: FestivalInstance[] }) {
  const stats = [
    { label: 'Festivals Actifs', value: festivals.filter(f => f.status === 'active').length },
    { label: 'Festivals à Venir', value: festivals.filter(f => f.status === 'upcoming').length },
    { label: 'Total Soumissions', value: festivals.reduce((a, f) => a + (f.submissionsCount ?? 0), 0) },
    { label: 'Instances Totales', value: festivals.length },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <CMSStatsCard key={stat.label} stat={stat} index={i} />
      ))}
    </div>
  )
}