import { useTranslation } from 'react-i18next';
import { LogIn, Upload } from 'lucide-react';
import heroImage from '@/assets/hero.jpg';
import Card from '../ui/Card';
import CountDown from '../ui/CountDown';
import Button from '../ui/button';

// On importe ton composant Card

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section
      style={{ backgroundImage: `url(${heroImage})` }}
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-cover bg-center py-20"
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 container mx-auto flex flex-col items-center space-y-12 px-4 text-center text-white">
        {/* TITRES */}
        <div className="space-y-4">
          <h1 className="text-4xl leading-tight font-semibold md:text-6xl">{t('hero.title')}</h1>
          <p className="text-lg font-light text-gray-300 md:text-xl">{t('hero.subtitle')}</p>
        </div>

        {/* LA GRANDE CARD (CONTENEUR) */}
        {/* On utilise ta Card en variante 'default' pour faire le cadre flou rectangulaire */}
        <Card variant="default" className="max-w-fit border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-md md:p-6">
          <CountDown />
        </Card>

        {/* TES BOUTONS RÉUTILISABLES */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button className="text-white" icon={<Upload size={15} />} variant="purple">
            Soumettre mon Film
          </Button>
          <Button icon={<LogIn size={15} />} variant="connexion">
            Se connecter
          </Button>
        </div>
      </div>
    </section>
  );
}
