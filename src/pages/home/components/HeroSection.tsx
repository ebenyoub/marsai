import { useTranslation } from 'react-i18next';
import { Upload } from 'lucide-react';
// Ajout de LogIn pour le deuxième bouton
import heroImage from '@/assets/hero.jpg';
// On importe le décompte
import Card from '@/components/ui/Card';
import CountDown from '@/components/ui/CountDown';
// On importe ta Card
import Button from '@/components/ui/button';

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
          <h1 className="text-4xl leading-tight font-semibold md:text-6xl">{t('hero.title')}</h1>
          <p className="text-lg font-light text-gray-300 md:text-xl">{t('hero.subtitle')}</p>
        </div>

        {/* 3. L'INSERTION DU DÉCOMPTE (DANS UNE CARD) */}
        <Card variant="default" className="max-w-fit border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-md md:p-6">
          <CountDown />
        </Card>

        {/* 4. LE BLOC BOUTONS (Regroupés ensemble) */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button icon={<Upload size={15} />} variant="purple">
            Soumettre mon Film
          </Button>
        </div>
      </div>
    </section>
  );
}
