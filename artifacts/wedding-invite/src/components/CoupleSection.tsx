import { motion, useReducedMotion } from 'framer-motion';
import { User } from 'lucide-react';
import FlowerDivider from './FlowerDivider';
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
      className="bg-[#faf7f0] px-6 py-10"
      data-testid="section-couple"
    >
      <div className="invite-shell">
        <FlowerDivider />

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
          <h2 className="font-display text-4xl sm:text-5xl text-[#1a3460] mt-1" data-testid="text-groom-name">
            {weddingConfig.groomName}
          </h2>

          <div className="my-6 flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
            <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full bg-gradient-to-br from-[#8AAAC4] via-[#c9d6e6] to-[#1a3460]/30 border-2 border-[#c9a84c]/50 shadow-inner flex items-center justify-center">
              <User className="h-12 w-12 text-[#1a3460]/50" strokeWidth={1} />
            </div>
            <p className="font-display italic text-3xl text-[#c9a84c]">&amp;</p>
            <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full bg-gradient-to-br from-[#D4A5A5] via-[#eadcd4] to-[#1a3460]/30 border-2 border-[#c9a84c]/50 shadow-inner flex items-center justify-center">
              <User className="h-12 w-12 text-[#1a3460]/50" strokeWidth={1} />
            </div>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl text-[#1a3460]" data-testid="text-bride-name">
            {weddingConfig.brideName}
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

        <FlowerDivider />
      </div>
    </section>
  );
}
