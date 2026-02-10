import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Card from './Card'; // On réutilise TA Card ici aussi

export default function CountDown() {
  const { i18n } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Logique de calcul du temps (identique à ton Figma)
  useEffect(() => {
    const deadline = new Date("2026-07-01T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = deadline - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // On prépare les données pour boucler dessus
  const units = [
    { label: i18n.language === 'fr' ? 'Jours' : 'Days', value: timeLeft.days, variant: 'purple' },
    { label: i18n.language === 'fr' ? 'Heures' : 'Hours', value: timeLeft.hours, variant: 'purple' },
    { label: i18n.language === 'fr' ? 'Min' : 'Min', value: timeLeft.minutes, variant: 'green' },
    { label: i18n.language === 'fr' ? 'Sec' : 'Sec', value: timeLeft.seconds, variant: 'green' },
  ];

  return (
    <div className="flex items-center gap-2 md:gap-4">
      {units.map((unit, index) => (
        <motion.div key={index} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
          {/* LES 4 PETITES CARDS INTERNES */}
          <Card 
            variant={unit.variant as any} 
            className="flex flex-col items-center justify-center w-16.25 h-18.75 md:w-22.5 md:h-25 p-0 bg-black/20 border-white/5"
          >
            {/* Le chiffre */}
            <span className={`text-xl md:text-3xl font-bold tabular-nums ${unit.variant === 'purple' ? 'text-primary' : 'text-emerald-400'}`}>
              {String(unit.value).padStart(2, '0')}
            </span>
            {/* Le texte sous le chiffre */}
            <span className="text-[8px] md:text-[10px] text-gray-400 uppercase tracking-widest mt-1">
              {unit.label}
            </span>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}