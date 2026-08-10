import { motion, useReducedMotion } from 'framer-motion';
import ornamentalFrame from '@references/Ornamental_Floral_Frame 1.webp';
import { weddingConfig } from '@/data/weddingConfig';

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 28 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-10 pb-16 px-6"
      data-testid="section-hero"
    >
      <div className="invite-shell flex flex-col items-center text-center relative z-10">
        <motion.div
          className="relative w-full max-w-[420px] mt-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <img
            src={ornamentalFrame}
            alt="Ornamental floral frame"
            className="floral-frame-img w-full h-auto select-none"
            draggable={false}
          />

          {/* Couple names rendered dynamically in the frame's empty center.
              All text below is config-driven (weddingConfig.hero). */}
          <div className="absolute inset-x-[24%] top-[22%] bottom-[26%] flex flex-col items-center justify-center text-center">
            <p className="text-[9px] font-sans uppercase tracking-[0.3em] text-[#8a7845] sm:text-[10px]">
              {weddingConfig.hero.preTitle}
            </p>
            <h1
              className="mt-1.5 font-calligraphy text-shadow-gold text-3xl leading-[1.4] text-[#1a3460] sm:text-[38px]"
              data-testid="text-hero-groom"
              dir="rtl"
              lang="ar"
            >
              {weddingConfig.groomNameArabic}
            </h1>
            <p className="my-1 font-display text-lg italic leading-none text-[#c9a84c] sm:text-xl">
              &amp;
            </p>
            <h1
              className="font-calligraphy text-shadow-gold text-3xl leading-[1.4] text-[#1a3460] sm:text-[38px]"
              data-testid="text-hero-bride"
              dir="rtl"
              lang="ar"
            >
              {weddingConfig.brideNameArabic}
            </h1>

            <div className="gold-divider my-2.5 w-12" />

            <p className="text-[9px] font-sans uppercase tracking-[0.25em] text-[#1a3460]/70 sm:text-[11px]">
              {weddingConfig.hero.weekday}
            </p>
            <p
              className="mt-0.5 font-display text-sm text-[#1a3460] sm:text-lg"
              data-testid="text-hero-date"
            >
              {weddingConfig.hero.date}
            </p>
            <p className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#1a3460]/60 sm:text-[10px]">
              {weddingConfig.hero.time}
            </p>
          </div>
        </motion.div>

        <motion.p
          className="mt-8 max-w-xs text-[11px] font-sans uppercase tracking-[0.3em] text-[#1a3460]/70 leading-relaxed sm:text-xs"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          data-testid="text-hero-tagline"
        >
          {weddingConfig.invitationMessages.heroTagline}
        </motion.p>
      </div>
    </section>
  );
}
