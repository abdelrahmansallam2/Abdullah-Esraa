import { motion, useReducedMotion } from 'framer-motion';
import ornamentalFrame from '@assets/WhatsApp_Image_2026-08-04_at_10.47.45_PM_1785873167783.jpeg';
import bouquetOrnament from '@assets/WhatsApp_Image_2026-08-04_at_10.50.03_PM_1785873167784.jpeg';
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
      className="relative overflow-hidden bg-[#faf7f0] pt-10 pb-16 px-6"
      data-testid="section-hero"
    >
      <div className="invite-shell flex flex-col items-center text-center relative z-10">
        <motion.img
          src={bouquetOrnament}
          alt=""
          aria-hidden="true"
          className="w-full max-w-[420px] -mb-4 select-none pointer-events-none"
          draggable={false}
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        <motion.div
          className="relative w-full max-w-[420px] mt-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <img
            src={ornamentalFrame}
            alt="Ornamental floral frame with Shady and Maryam names"
            className="w-full h-auto select-none"
            draggable={false}
          />
        </motion.div>

        <motion.p
          className="mt-8 text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#1a3460]/70 font-sans max-w-xs leading-relaxed"
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
