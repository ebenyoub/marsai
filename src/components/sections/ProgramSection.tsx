import { Award, Monitor, User, Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';
import ProgramCard from '../ui/ProgramCard';

export default function ProgramSection() {
  const { t } = useTranslation();

  const programs = [
    {
      title: t('landing.program.cards.competition.title'),
      description: t('landing.program.card.competition.discription'),
      date: t('landing.program.card.competition.date'),
      capacity: t('landing.program.card.competition.capacity'),
      icon: Video,
      variant: 'purple' as const,
    },
    {
      title: t('landing.program.cards.masterclass.title'),
      description: t('landing.program.card.masterclass.discription'),
      date: t('landing.program.card.masterclass.date'),
      capacity: t('landing.program.card.masterclass.capacity'),
      icon: Monitor,
      variant: 'green' as const,
    },
    {
      title: t('landing.program.cards.conference.title'),
      description: t('landing.program.card.conference.discription'),
      date: t('landing.program.card.conference.date'),
      capacity: t('landing.program.card.conference.capacity'),
      icon: User,
      variant: 'purple' as const,
    },
    {
      title: t('landing.program.cards.night.title'),
      description: t('landing.program.card.night.discription'),
      date: t('landing.program.card.night.date'),
      capacity: t('landing.program.card.night.capacity'),
      icon: Award,
      variant: 'gold' as const,
    },
  ];
  return (
    <section>
        <div>
      <h2>{t('landing.program>title')}</h2>
      <p>{t('landing.program.subtitle')}</p>
        </div>
      <div>
        {programs.map((procram, index) => (
            <ProgramCard key={index} {...programs}  />
        ))}
      </div>
    </section>
  );
}
