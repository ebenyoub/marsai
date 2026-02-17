import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { cartVariants } from '../utils/viariants';
import Card from './Card';

export default function CountDown() {
  const { t } = useTranslation();
  const deadline = new Date('2026-07-01T00:00:00').getTime();

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
    { label: t('countdown.day'), value: timeLeft.days, variant: 'time_purple', delay: 0.1 },
    { label: t('countdown.hour'), value: timeLeft.hours, variant: 'time_green', delay: 0.2 },
    { label: t('countdown.min'), value: timeLeft.minutes, variant: 'time_green', delay: 0.3 },
    { label: t('countdown.sec'), value: timeLeft.seconds, variant: 'time_green', delay: 0.4 },
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
            className="bg-background/50 border-primary/20 flex flex-col rounded-md border p-2 backdrop-blur-sm sm:min-w-30"
          >
            {/* CHIFFRE : Tabular-nums pour éviter que ça bouge + couleurs primaires/accent */}
            <span
              className={`mb-0.5 text-lg leading-none font-bold sm:text-xl md:text-2xl ${unit.variant === 'time_purple' ? 'text-primary' : 'text-accent'}`}
            >
              {String(unit.value).padStart(2, '0')}
            </span>

            {/* LABEL : Petit, gris, majuscules, espacé */}
            <span className="text-muted-foreground text-[9px] leading-none tracking-wide uppercase sm:text-[10px] md:text-xs">
              {unit.label}
            </span>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
