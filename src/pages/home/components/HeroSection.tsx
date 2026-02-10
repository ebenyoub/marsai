import { useTranslation } from 'react-i18next';
import { Upload } from 'lucide-react';
import heroImage from '@/assets/hero.jpg';
import Button from '@/components/ui/button';

export default function HeroSection() {
  const { t } = useTranslation();
  return (
    <section
      style={{ backgroundImage: `url(${heroImage})` }}
      className="over relative z-1 flex h-150 min-h-150 w-full flex-col items-center justify-center bg-cover bg-center md:max-h-186"
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 container mx-auto flex flex-col items-center space-y-8 px-4 text-center text-white md:max-w-[50%]">
        <h1 className="text-4xl leading-tight font-semibold md:text-5xl">{t('hero.title')}</h1>
        <p className="md:text-l text-lg font-light text-gray-300">{t('hero.subtitle')}</p>
      </div>
      <Button className="mt-3 text-white" icon={<Upload size={15} />} variant="purple">
        Soumettre mon Film
      </Button>
    </section>
  );
}
