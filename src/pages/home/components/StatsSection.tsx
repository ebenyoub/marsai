import { useTranslation } from 'react-i18next';
import { Trophy, Users, Video } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';

export default function StatsSection() {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Users,
      value: '120+',
      label: t('landing.stats.countries'),
      color: 'text-primary',
      variant: 'purple' as const,
    },
    {
      icon: Video,
      value: '600+',
      label: t('landing.stats.films'),
      color: 'text-accent',
      variant: 'green' as const,
    },
    {
      icon: Trophy,
      value: '50 000$',
      label: t('landing.stats.prize'),
      color: 'text-amber-400',
      variant: 'gold' as const,
    },
  ];

  return (
    <section className="flex border border-[#2a3242] bg-[#171b29] py-7 md:px-80">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
