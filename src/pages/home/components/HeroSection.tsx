import { useTranslation } from 'react-i18next';
import { Upload, LogIn } from 'lucide-react'; // Ajout de LogIn pour le deuxième bouton
import heroImage from '@/assets/hero.jpg';

import CountDown from '@/components/ui/CountDown'; // On importe le décompte
import Card from '@/components/ui/Card'; // On importe ta Card

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section
      style={{ backgroundImage: `url(${heroImage})` }}
      className="relative z-1 flex min-h-150 w-full flex-col items-center justify-center bg-cover bg-center py-20"
    >
      {/* 1. L'OVERLAY : Pour assombrir l'image et lire le texte */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* 2. LE CONTENEUR PRINCIPAL (Z-10) */}
      <div className="relative z-10 container mx-auto flex flex-col items-center space-y-10 px-4 text-center text-white md:max-w-[70%]">
        
        {/* BLOC TEXTE */}
        <div className="space-y-4">
          <h1 className="text-4xl leading-tight font-semibold md:text-6xl">
            {t('hero.title')}
          </h1>
          <p className="text-lg font-light text-gray-300 md:text-xl">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* 3. L'INSERTION DU DÉCOMPTE (DANS UNE CARD) */}
        <Card variant="default" className="bg-white/5 backdrop-blur-md border-white/10 p-4 md:p-6 max-w-fit shadow-2xl">
          <CountDown />
        </Card>

        {/* 4. LE BLOC BOUTONS (Regroupés ensemble) */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button icon={<Upload size={15} />} variant="purple">
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