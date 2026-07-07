import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { cartVariants } from '../../utils/variants';
import { Card } from './Card';
import { useFetch } from '@/hooks/useFetch';

interface Festival {
  id: string | number;
  name: string;
  status: string;
  start_at: string;
}

export default function CountDown() {
  const { t } = useTranslation();
  const { data: festivals, isLoading } = useFetch<Festival[]>('/festivals');

  // Find the active festival
  const activeFestival = festivals?.find(f => f.status === 'Actif');
  
  // Target deadline
  const deadline = activeFestival ? new Date(activeFestival.start_at).getTime() : null;

  // 1. STABILITÉ : Calcul immédiat pour éviter le 00:00:00 au rafraîchissement
  const calculateTimeLeft = useCallback(() => {
    if (!deadline) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

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

  // Initialisation lazy
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4 text-slate-400">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!activeFestival || !deadline) {
    return (
      <div className="text-center p-2">
        <span className="text-primary text-xl font-bold uppercase tracking-wider">
          {t('countdown.coming_soon')}
        </span>
      </div>
    );
  }

  const units = [
    { label: t('countdown.day'), value: timeLeft.days, variant: 'time_purple', delay: 0.1 },
    { label: t('countdown.hour'), value: timeLeft.hours, variant: 'time_green', delay: 0.2 },
    { label: t('countdown.min'), value: timeLeft.minutes, variant: 'time_green', delay: 0.3 },
    { label: t('countdown.sec'), value: timeLeft.seconds, variant: 'time_green', delay: 0.4 },
  ];

  return (
    <div className="grid grid-cols-4 gap-1.5 md:gap-2" role="timer" aria-live="polite">
      {units.map((unit, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: unit.delay }}
        >
          <Card
            variant={unit.variant as keyof typeof cartVariants}
            className="bg-background/50 border-primary/20 flex flex-col rounded-md border p-2 backdrop-blur-sm sm:min-w-30"
          >
            {/* CHIFFRE : Tabular-nums pour éviter que ça bouge + couleurs primaires/accent */}
            <span
              className={`mb-0.5 text-xl leading-none font-bold md:text-2xl ${unit.variant === 'time_purple' ? 'text-primary' : 'text-accent'}`}
            >
              {String(unit.value).padStart(2, '0')}
            </span>

            {/* LABEL : Petit, gris, majuscules, espacé */}
            <span className="text-muted-foreground text-md leading-none tracking-wide uppercase md:text-xl">
              {unit.label}
            </span>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
