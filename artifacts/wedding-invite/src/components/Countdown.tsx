import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { weddingConfig } from '@/data/weddingConfig';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function computeTimeLeft(): TimeLeft {
  const diff = weddingConfig.weddingDate.getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isPast: false };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(computeTimeLeft);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(computeTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0 },
  };

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section
      id="countdown"
      className="bg-[#1a3460] px-6 py-14"
      data-testid="section-countdown"
    >
      <div className="invite-shell flex flex-col items-center text-center">
        <motion.h2
          className="font-display text-3xl sm:text-4xl text-[#f5efe0] tracking-wide"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          transition={{ duration: 0.7 }}
        >
          COUNTDOWN
        </motion.h2>

        <div className="w-16 gold-divider my-5 opacity-70" />

        {timeLeft.isPast ? (
          <motion.p
            className="font-display italic text-2xl text-[#c9a84c] mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            data-testid="text-countdown-complete"
          >
            Today is our special day!
          </motion.p>
        ) : (
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 mt-4 w-full max-w-md">
            {units.map((unit, index) => (
              <motion.div
                key={unit.label}
                className="rounded-xl border border-[#c9a84c]/40 bg-[#f5efe0]/[0.04] py-4 sm:py-6 flex flex-col items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-testid={`box-countdown-${unit.label.toLowerCase()}`}
              >
                <span className="font-display text-3xl sm:text-4xl text-[#c9a84c] tabular-nums">
                  {unit.value.toString().padStart(2, '0')}
                </span>
                <span className="mt-1.5 text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#f5efe0]/70 font-sans">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
