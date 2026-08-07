import { motion, useReducedMotion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { weddingConfig } from '@/data/weddingConfig';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function buildAugust2026Grid(): (number | null)[] {
  // August 1, 2026 is a Saturday (index 6, if Sunday = 0)
  const firstWeekday = new Date(2026, 7, 1).getDay();
  const daysInMonth = 31;
  const cells: (number | null)[] = Array(firstWeekday).fill(null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day);
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }
  return cells;
}

export default function CalendarSection() {
  const shouldReduceMotion = useReducedMotion();
  const cells = buildAugust2026Grid();
  const weddingDay = weddingConfig.weddingDate.getDate();

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="calendar"
      className="bg-[#faf7f0] px-6 py-12"
      data-testid="section-calendar"
    >
      <div className="invite-shell flex flex-col items-center">
        <motion.h2
          className="font-display text-3xl sm:text-4xl text-[#1a3460] tracking-wide text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          transition={{ duration: 0.7 }}
        >
          AUGUST 2026
        </motion.h2>

        <motion.div
          className="relative mt-8 w-full max-w-sm rounded-2xl border border-[#c9a84c]/30 bg-white/60 p-5 sm:p-7 shadow-sm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="grid grid-cols-7 gap-1.5 mb-3">
            {WEEKDAYS.map((day, i) => (
              <div
                key={`${day}-${i}`}
                className="text-center text-[10px] sm:text-xs font-sans tracking-wide text-[#1a3460]/50"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {cells.map((day, index) => {
              const isWeddingDay = day === weddingDay;
              return (
                <div
                  key={index}
                  className="aspect-square flex items-center justify-center relative"
                >
                  {day !== null && (
                    <>
                      {isWeddingDay ? (
                        <div
                          className="relative flex items-center justify-center h-full w-full"
                          data-testid="cell-wedding-day"
                        >
                          <Heart
                            className="absolute h-full w-full text-[#1a3460]"
                            fill="#1a3460"
                            strokeWidth={0}
                          />
                          <span className="relative z-10 text-[11px] sm:text-xs font-bold text-[#f5efe0]">
                            {day}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs sm:text-sm font-sans text-[#1a3460]/70">
                          {day}
                        </span>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        <a
          href={weddingConfig.googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-calendar-add"
          className="mt-6 text-sm font-sans tracking-wide text-[#1a3460] underline decoration-[#c9a84c] decoration-2 underline-offset-4 hover:text-[#c9a84c] transition-colors"
        >
          Add to Calendar
        </a>
      </div>
    </section>
  );
}
