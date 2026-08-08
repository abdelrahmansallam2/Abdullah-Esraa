import { motion, useReducedMotion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import SectionDivider from './SectionDivider';
import { weddingConfig } from '@/data/weddingConfig';

export default function EventInfo() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0 },
  };

  const dayLabel = weddingConfig.weddingDate
    .toLocaleDateString('en-US', { weekday: 'long' })
    .toUpperCase();
  const dateNum = weddingConfig.weddingDate.getDate().toString().padStart(2, '0');
  const monthLabel = weddingConfig.weddingDate
    .toLocaleDateString('en-US', { month: 'long' })
    .toUpperCase();
  const yearLabel = weddingConfig.weddingDate.getFullYear();

  return (
    <section
      id="reception"
      className="px-6 pt-4 pb-10"
      data-testid="section-reception-info"
    >
      <div className="invite-shell">
        <SectionDivider className="mb-4" />

        <motion.div
          className="flex flex-col items-center text-center py-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="font-display text-3xl sm:text-4xl text-[#1a3460] tracking-wide">
            RECEPTION INFO
          </h2>
          <p className="mt-3 text-xs tracking-[0.25em] uppercase text-[#1a3460]/60 font-sans">
            The reception will take place at:
          </p>

          <p
            className="mt-6 font-display text-4xl sm:text-5xl text-[#1a3460]"
            data-testid="text-reception-time"
          >
            {weddingConfig.hero.time}
          </p>

          <div className="mt-8 flex items-center gap-4 text-sm tracking-[0.2em] font-sans text-[#1a3460]/80">
            <span>{dayLabel}</span>
            <span className="text-[#c9a84c]">|</span>
            <span className="font-display text-2xl text-[#c9a84c]">{dateNum}</span>
            <span className="text-[#c9a84c]">|</span>
            <span>{monthLabel}</span>
          </div>

          <p className="mt-2 font-display text-2xl text-[#1a3460]/70">{yearLabel}</p>

          <p
            className="mt-8 font-display italic text-xl text-[#1a3460]"
            data-testid="text-venue-name"
          >
            {weddingConfig.venueName}
          </p>
          <p className="mt-1 font-display italic text-lg text-[#1a3460]/75">
            {weddingConfig.venueHall}
          </p>
          <p className="mt-1 text-xs tracking-wide font-sans text-[#1a3460]/60">
            {weddingConfig.venueAddress}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-sm">
            <a
              href={weddingConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-open-maps"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#1a3460] text-[#f5efe0] font-sans text-sm tracking-wide py-3.5 px-6 shadow-md shadow-[#1a3460]/20 hover:scale-[1.02] active:scale-95 transition-transform"
            >
              <MapPin className="h-4 w-4" />
              Open in Maps
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
