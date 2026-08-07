import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { weddingConfig } from '@/data/weddingConfig';

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const images = weddingConfig.galleryImages;

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0 },
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === null ? null : (prev + 1) % images.length));
  };

  return (
    <section
      id="gallery"
      className="bg-[#faf7f0] px-6 py-10"
      data-testid="section-gallery"
    >
      <div className="invite-shell">
        <motion.h2
          className="text-center font-display text-3xl sm:text-4xl text-[#1a3460] tracking-wide mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          transition={{ duration: 0.7 }}
        >
          PHOTO GALLERY
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {images.map((image, index) => (
            <motion.button
              key={image.alt}
              type="button"
              onClick={() => setActiveIndex(index)}
              data-testid={`button-gallery-item-${index}`}
              className="group relative aspect-square rounded-xl overflow-hidden border border-[#c9a84c]/30 bg-[#f2ece0] shadow-sm flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: index * 0.06 }}
            >
              {image.src ? (
                <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
              ) : (
                <>
                  <Camera className="h-7 w-7 text-[#1a3460]/40" strokeWidth={1.2} />
                  <span className="text-[10px] tracking-wide uppercase text-[#1a3460]/40 font-sans">
                    Photo Coming Soon
                  </span>
                </>
              )}
              <div className="absolute inset-0 border border-transparent group-hover:border-[#c9a84c]/60 rounded-xl transition-colors" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1c33]/85 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
            data-testid="modal-gallery-lightbox"
          >
            <motion.div
              className="relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close"
                data-testid="button-close-lightbox"
                className="absolute -top-12 right-0 text-[#f5efe0] hover:text-[#c9a84c] transition-colors"
              >
                <X className="h-7 w-7" />
              </button>

              <div className="aspect-square rounded-2xl bg-[#f2ece0] border border-[#c9a84c]/40 flex flex-col items-center justify-center gap-3">
                {images[activeIndex].src ? (
                  <img
                    src={images[activeIndex].src as string}
                    alt={images[activeIndex].alt}
                    className="h-full w-full object-cover rounded-2xl"
                  />
                ) : (
                  <>
                    <Camera className="h-12 w-12 text-[#1a3460]/40" strokeWidth={1} />
                    <span className="text-xs tracking-wide uppercase text-[#1a3460]/50 font-sans">
                      Photo Coming Soon
                    </span>
                    <span className="text-sm font-display italic text-[#1a3460]/60">
                      {images[activeIndex].alt}
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between mt-4">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous photo"
                  data-testid="button-lightbox-prev"
                  className="h-10 w-10 rounded-full bg-[#f5efe0] flex items-center justify-center text-[#1a3460] hover:bg-[#c9a84c]/30 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-[#f5efe0] text-sm font-sans tracking-wide">
                  {activeIndex + 1} / {images.length}
                </span>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next photo"
                  data-testid="button-lightbox-next"
                  className="h-10 w-10 rounded-full bg-[#f5efe0] flex items-center justify-center text-[#1a3460] hover:bg-[#c9a84c]/30 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
