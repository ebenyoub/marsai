import { Award, Presentation, Users, Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ProgramCard from '../ui/ProgramCard';
import Card from '../ui/Card';
import { Button } from '../ui/button';

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
    <section className="py-20 container mx-auto px-4">
      <article className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t('landing.program.title')}
        </h2>
        <p className="text-muted-foreground">{t('landing.program.subtitle')}</p>
      </article>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {programs.map((program, index) => (
          <ProgramCard key={index} {...program} />
        ))}
      </div>
      <div className="flex justify-center mt-16 w-full">
        <Card className="text-center p-4">
          <div className='flex items-center justify-center gap-3 mb-4'>
            <Users className="w-6 h-6 text-accent" />
            <h2 className='text-2xl md:text-3xl font-semibold text-white'>{t('landing.cta.title')}</h2>
          </div>
          <p className="text-muted-foreground mb-8 text-lg max-w-xl ">
            {t('landing.cta.description')}
          </p>
          <Button
          size='lg'
          className='bg-accent hover:bg-accent/90 shadow-[0_0_20px_rgba(16,185,129,0.4)]'>
            <Users />
            {t('landing.cta.button')}</Button>
        </Card>
      </div>
    </section>
  );
}
