import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import blueFlowerCluster from '@assets/WhatsApp_Image_2026-08-04_at_10.46.16_PM_1785873167786.jpeg';
import { weddingConfig } from '@/data/weddingConfig';

const OPENED_KEY = 'wedding-invitation-opened';

interface OpeningScreenProps {
  onOpen: () => void;
}

export default function OpeningScreen({ onOpen }: OpeningScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const formattedDate = weddingConfig.weddingDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleOpen = () => {
    localStorage.setItem(OPENED_KEY, 'true');
    setIsExiting(true);
    window.setTimeout(() => {
      onOpen();
    }, shouldReduceMotion ? 50 : 700);
  };

  return (
    <AnimatePresence>
      {!isExiting || true ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#152c52] px-6"
          initial={{ opacity: 1 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{ duration: shouldReduceMotion ? 0.05 : 0.6, ease: 'easeInOut' }}
          style={{ pointerEvents: isExiting ? 'none' : 'auto' }}
        >
          {/* ambient radial glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 30%, rgba(201,168,76,0.15), transparent 60%), radial-gradient(circle at 50% 100%, rgba(26,52,96,0.9), #152c52 70%)',
            }}
          />

          <motion.div
            className="relative w-full max-w-sm rounded-2xl bg-[#faf7f0] shadow-2xl overflow-hidden border border-[#c9a84c]/30"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{
              opacity: isExiting ? 0 : 1,
              y: 0,
              scale: isExiting ? 0.85 : 1,
            }}
            transition={{ duration: shouldReduceMotion ? 0.05 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* corner floral decorations */}
            <img
              src={blueFlowerCluster}
              alt=""
              aria-hidden="true"
              className="absolute -top-6 -left-10 w-32 sm:w-40 opacity-80 mix-blend-multiply pointer-events-none select-none"
              draggable={false}
            />
            <img
              src={blueFlowerCluster}
              alt=""
              aria-hidden="true"
              className="absolute -bottom-10 -right-10 w-32 sm:w-40 opacity-80 mix-blend-multiply pointer-events-none select-none rotate-180"
              draggable={false}
            />

            <div className="relative z-10 flex flex-col items-center text-center px-8 py-14 sm:py-16">
              <p className="text-[10px] tracking-[0.35em] uppercase text-[#8a7845] mb-6">
                Together with their families
              </p>

              <h1 className="font-display text-5xl sm:text-6xl text-[#1a3460] tracking-wide leading-none">
                {weddingConfig.groomName.toUpperCase()}
              </h1>
              <p className="font-display italic text-2xl text-[#c9a84c] my-2">&amp;</p>
              <h1 className="font-display text-5xl sm:text-6xl text-[#1a3460] tracking-wide leading-none">
                {weddingConfig.brideName.toUpperCase()}
              </h1>

              <div className="w-16 gold-divider my-6" />

              <p className="font-sans text-sm tracking-wide text-[#1a3460]/80">
                {formattedDate}
              </p>
              <p className="font-display italic text-lg text-[#1a3460]/70 mt-1">
                Cordially Invite You
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
      ) : null}
    </AnimatePresence>
  );
}

export function hasOpenedInvitation(): boolean {
  return localStorage.getItem(OPENED_KEY) === 'true';
}
