import { motion, useReducedMotion } from 'framer-motion';
import SectionDivider from './SectionDivider';
import { weddingConfig } from '@/data/weddingConfig';

export default function ChildhoodMemories() {
  const reduced = useReducedMotion();
  const photos = weddingConfig.childhood.photos;

  return (
    <section
      id="childhood"
      className="px-6 pt-16 pb-8"
      data-testid="section-childhood-memories"
    >
      <div className="invite-shell">
        <SectionDivider />

        <motion.div
          className="flex flex-col items-center py-10"
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="font-display text-3xl sm:text-4xl text-[#1a3460] tracking-wide">
            {weddingConfig.childhood.title}
          </h2>
        </motion.div>

        <motion.div
          className="mx-auto grid w-full max-w-lg grid-cols-2 gap-3.5 sm:gap-4"
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {photos.map((photo, index) => (
            <div
              key={photo.name}
              className="aspect-[1/1.05] w-full overflow-hidden rounded-lg"
              data-testid={`card-childhood-${index}`}
            >
              {photo.src ? (
                <img
                  src={photo.src}
                  alt={photo.name}
                  className="h-full w-full object-cover object-center"
                />
              ) : null}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
