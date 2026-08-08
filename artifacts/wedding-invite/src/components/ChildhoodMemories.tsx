import { motion, useReducedMotion } from 'framer-motion';
import { Camera } from 'lucide-react';
import SectionDivider from './SectionDivider';
import { weddingConfig } from '@/data/weddingConfig';

export default function ChildhoodMemories() {
  const reduced = useReducedMotion();
  const photos = weddingConfig.childhood.photos;

  return (
    <section
      id="childhood"
      className="px-6 py-10"
      data-testid="section-childhood-memories"
    >
      <div className="invite-shell">
        <SectionDivider />

        <motion.div
          className="flex flex-col items-center text-center py-8"
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="font-display text-3xl sm:text-4xl text-[#1a3460] tracking-wide">
            {weddingConfig.childhood.title}
          </h2>
          <p className="mt-3 max-w-sm font-sans text-[15px] text-[#1a3460]/75 leading-relaxed">
            {weddingConfig.childhood.subtitle}
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-xl grid-cols-1 gap-8 sm:grid-cols-2">
          {photos.map((photo, index) => (
            <motion.figure
              key={photo.name}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: reduced ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              data-testid={`card-childhood-${index}`}
            >
              <div className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-2xl border border-[#c9a84c]/35 bg-[#f2ece0] shadow-sm">
                {photo.src ? (
                  <img
                    src={photo.src}
                    alt={`${photo.name} childhood`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 px-4 text-center">
                    <Camera
                      className="h-8 w-8 text-[#1a3460]/40"
                      strokeWidth={1.2}
                    />
                    <span className="text-[10px] font-sans uppercase tracking-wide text-[#1a3460]/45">
                      Photo coming soon
                    </span>
                  </div>
                )}
              </div>

              <figcaption className="mt-4 text-center">
                <p className="font-display text-2xl text-[#1a3460]">
                  {photo.name}
                </p>
                <p className="mt-1 text-[10px] font-sans uppercase tracking-[0.3em] text-[#1a3460]/55">
                  {photo.label}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
