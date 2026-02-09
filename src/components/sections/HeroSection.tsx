import heroImage from '@/assets/hero.jpg';
import { useTranslation } from 'react-i18next';
import { LogIn, Upload } from 'lucide-react';
import Button from '../ui/button';

export default function HeroSection() {
  const { t } = useTranslation();
  return (
    <section
      style={{ backgroundImage: `url(${heroImage})` }}
      className="relative h-150 min-h-150 flex flex-col items-center justify-center bg-cover bg-center over z-1 w-full md:max-h-186"
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center text-white space-y-8 md:max-w-[50%]">
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-l text-gray-300 font-light">
          {t('hero.subtitle')}
        </p>
      </div>
      <Button className="text-white mt-3" icon={<Upload size={15}/>} variant='purple' >
        Soumettre mon Film
      </Button>

      <Button className="mt-3" icon={<LogIn size={15}/>} variant='connexion' >
        Se connecter
      </Button>
      <Button className="mt-3" icon={<LogIn size={15}/>} variant='ghost' >
        Ghost
      </Button>
      <Button className="mt-3" icon={<LogIn size={15}/>} variant='active' >
        active
      </Button>
    </section>
  );
}
