import { motion, useReducedMotion } from 'framer-motion';
import FloralHeader from './FloralHeader';
import { weddingConfig } from '@/data/weddingConfig';

export default function CoupleSection() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="couple"
      className="px-6 py-10"
      data-testid="section-couple"
    >
      <div className="invite-shell">
        <FloralHeader />

        <motion.div
          className="flex flex-col items-center text-center py-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-[#1a3460]/60 font-sans">
            Groom
          </p>
          <h2
            className="font-ruqaa text-5xl leading-[1.35] text-[#1a3460] mt-1 sm:text-6xl"
            data-testid="text-groom-name"
            dir="rtl"
            lang="ar"
          >
            {weddingConfig.groomNameArabic}
          </h2>

          <p className="my-6 font-display italic text-3xl text-[#c9a84c]">&amp;</p>

          <h2
            className="font-ruqaa text-5xl leading-[1.35] text-[#1a3460] sm:text-6xl"
            data-testid="text-bride-name"
            dir="rtl"
            lang="ar"
          >
            {weddingConfig.brideNameArabic}
          </h2>
          <p className="text-xs tracking-[0.3em] uppercase text-[#1a3460]/60 font-sans mt-1">
            Bride
          </p>

          <p
            className="mt-8 max-w-md font-sans text-[#1a3460]/80 leading-relaxed text-[15px]"
            data-testid="text-couple-story"
          >
            {weddingConfig.invitationMessages.coupleStory}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
