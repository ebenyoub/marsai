import heroImage from '@/assets/hero.jpg';
import { useTranslation } from 'react-i18next';
import { LogIn, Upload } from 'lucide-react';
import Button from '../ui/button';
import CountDown from '../ui/CountDown';
import Card from '../ui/Card'; // On importe ton composant Card

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section
      style={{ backgroundImage: `url(${heroImage})` }}
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center w-full py-20"
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center text-white space-y-12">
        {/* TITRES */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight">{t('hero.title')}</h1>
          <p className="text-lg md:text-xl text-gray-300 font-light">{t('hero.subtitle')}</p>
        </div>

        {/* LA GRANDE CARD (CONTENEUR) */}
        {/* On utilise ta Card en variante 'default' pour faire le cadre flou rectangulaire */}
        <Card variant="default" className="bg-white/5 backdrop-blur-md border-white/10 p-4 md:p-6 max-w-fit shadow-2xl">
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