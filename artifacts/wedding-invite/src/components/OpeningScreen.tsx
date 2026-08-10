import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import CornerFlower from './CornerFlower';
import { playMusic } from '@/lib/music';
import { weddingConfig } from '@/data/weddingConfig';
import backgroundImage from '@references/background.jpg';

const OPENED_KEY = 'wedding_opened';

interface OpeningScreenProps {
  onOpen: () => void;
}

export default function OpeningScreen({ onOpen }: OpeningScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleOpen = () => {
    sessionStorage.setItem(OPENED_KEY, 'true');
    void playMusic();
    setIsExiting(true);
    window.setTimeout(() => {
      onOpen();
    }, shouldReduceMotion ? 50 : 700);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#faf7f0] px-6"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: shouldReduceMotion ? 0.05 : 0.6, ease: 'easeInOut' }}
      style={{ pointerEvents: isExiting ? 'none' : 'auto' }}
      data-testid="screen-opening"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <motion.div
        className="relative w-full max-w-sm rounded-2xl bg-[#faf7f0] shadow-2xl shadow-[#1a3460]/20 overflow-hidden border border-[#c9a84c]/30"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{
          opacity: isExiting ? 0 : 1,
          y: 0,
          scale: isExiting ? 0.85 : 1,
        }}
        transition={{ duration: shouldReduceMotion ? 0.05 : 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <CornerFlower
          placement="top-left"
          className="-top-8 -left-8 h-24 w-24 opacity-80 sm:-top-10 sm:-left-10 sm:h-28 sm:w-28"
        />
        <CornerFlower
          placement="bottom-right"
          className="-bottom-10 -right-10 h-24 w-24 opacity-80 sm:-bottom-12 sm:-right-12 sm:h-28 sm:w-28"
        />

        <div className="relative z-10 flex flex-col items-center text-center px-8 py-14 sm:py-16">
          <h1
            className="font-ruqaa text-4xl leading-[1.3] text-[#1a3460] sm:text-5xl"
            dir="rtl"
            lang="ar"
          >
            {weddingConfig.groomNameArabic}
          </h1>
          <p className="font-display italic text-2xl text-[#c9a84c] my-2">&amp;</p>
          <h1
            className="font-ruqaa text-4xl leading-[1.3] text-[#1a3460] sm:text-5xl"
            dir="rtl"
            lang="ar"
          >
            {weddingConfig.brideNameArabic}
          </h1>

          <div className="w-16 gold-divider my-6" />

          <p className="font-sans text-sm tracking-wide text-[#1a3460]/80">
            {weddingConfig.hero.date}
          </p>
          <p className="font-display italic text-lg text-[#1a3460]/70 mt-1">
            {weddingConfig.invitationMessages.inviteLine}
          </p>

          <button
            type="button"
            onClick={handleOpen}
            data-testid="button-open-invitation"
            className="mt-10 w-full max-w-[220px] rounded-full bg-[#1a3460] text-[#f5efe0] font-sans tracking-[0.15em] text-sm py-4 shadow-lg shadow-[#1a3460]/30 transition-transform hover:scale-[1.03] active:scale-95"
          >
            OPEN INVITATION
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function hasOpenedInvitation(): boolean {
  return sessionStorage.getItem(OPENED_KEY) === 'true';
}
