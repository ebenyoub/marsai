import { useTranslation } from 'react-i18next';
import { Award, Presentation, Users, Video } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import ProgramCard from '@/components/ui/ProgramCard';
import Button from '@/components/ui/button';

export default function ProgramSection() {
  const { t } = useTranslation();

  const programs = [
    {
      title: t('landing.program.cards.competition.title'),
      description: t('landing.program.cards.competition.description'),
      date: t('landing.program.cards.competition.date'),
      capacity: t('landing.program.cards.competition.capacity'),
      icon: Video,
      variant: 'purple' as const,
    },
    {
      title: t('landing.program.cards.masterclass.title'),
      description: t('landing.program.cards.masterclass.description'),
      date: t('landing.program.cards.masterclass.date'),
      capacity: t('landing.program.cards.masterclass.capacity'),
      icon: Presentation,
      variant: 'green' as const,
    },
    {
      title: t('landing.program.cards.conference.title'),
      description: t('landing.program.cards.conference.description'),
      date: t('landing.program.cards.conference.date'),
      capacity: t('landing.program.cards.conference.capacity'),
      icon: Users,
      variant: 'purple' as const,
    },
    {
      title: t('landing.program.cards.night.title'),
      description: t('landing.program.cards.night.description'),
      date: t('landing.program.cards.night.date'),
      capacity: t('landing.program.cards.night.capacity'),
      icon: Award,
      variant: 'gold' as const,
    },
  ];

  return (
    <section className="container mx-auto px-4 py-20">
      <article className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t('landing.program.title')}</h2>
        <p className="text-muted-foreground">{t('landing.program.subtitle')}</p>
      </article>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {programs.map((program, index) => (
          <ProgramCard key={index} {...program} />
        ))}
      </div>
      <div className="mt-16 flex w-full justify-center">
        <Card className="shadow-accent/15 flex flex-col items-center p-8 shadow-2xl">
          <div className="mb-4 flex items-center justify-center gap-3">
            <Users className="text-accent h-6 w-6" />
            <h2 className="text-2xl font-semibold text-white md:text-3xl">{t('landing.cta.title')}</h2>
          </div>
          <p className="text-muted-foreground mb-8 max-w-xl text-lg">{t('landing.cta.description')}</p>
          <Button className="bg-accent hover:bg-accent/90 border-accent-foreground/30">
            <Users />
            {t('landing.cta.button')}
          </Button>
        </Card>
      </div>
    </section>
  );
}
