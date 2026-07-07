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
    <section className="bg-background/40 flex w-full justify-evenly border py-7 shadow-xl shadow-white/5">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </section>
  );
}
