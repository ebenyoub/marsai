import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Card from './Card';
import { cartVariants } from '../utils/viariants';

export default function CountDown() {
  const { i18n } = useTranslation();
  const deadline = new Date("2026-07-01T00:00:00").getTime();

  // 1. STABILITÉ : Calcul immédiat pour éviter le 00:00:00 au rafraîchissement
  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const diff = deadline - now;

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  }, [deadline]);

  // Initialisation "Lazy" : l'état est calculé AVANT le premier affichage
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  const units = [
    { label: i18n.language === 'fr' ? 'Jours' : 'Days', value: timeLeft.days, variant: 'time_purple', delay: 0.1 },
    { label: i18n.language === 'fr' ? 'Heures' : 'Hours', value: timeLeft.hours, variant: 'time_purple', delay: 0.2 },
    { label: i18n.language === 'fr' ? 'Min' : 'Min', value: timeLeft.minutes, variant: 'time_green', delay: 0.3 },
    { label: i18n.language === 'fr' ? 'Sec' : 'Sec', value: timeLeft.seconds, variant: 'time_green', delay: 0.4 },
  ];

  return (
    /* VISUEL FIGMA : Conteneur avec dégradé radial/diagonal, bordure 30% et flou */

    <div className="grid grid-cols-4 gap-1.5 md:gap-2" role="timer" aria-live="polite">
      {units.map((unit, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0.9, opacity: 0 }} // Animation d'entrée Figma
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: unit.delay }}
        >
          {/* BOÎTE INDIVIDUELLE : Fond sombre 50%, bordure subtile */}
          <Card
            variant={unit.variant as keyof typeof cartVariants}
            className="bg-background/50 backdrop-blur-sm rounded-md p-1.5 md:p-2 border border-primary/20 flex flex-col items-center justify-center min-w-30 md:min-w-40"
          >
            {/* CHIFFRE : Tabular-nums pour éviter que ça bouge + couleurs primaires/accent */}
            <span className={`text-lg sm:text-xl md:text-2xl font-bold tabular-nums leading-none ${unit.variant === 'time_purple' ? 'text-primary' : 'text-accent'}`}>
              {String(unit.value).padStart(2, '0')}
            </span>

            {/* LABEL : Petit, gris, majuscules, espacé */}
            <span className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide mt-1">
              {unit.label}
            </span>
          </Card>
        </motion.div>
      ))}
    </div>
  );
} 