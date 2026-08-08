import { motion, useReducedMotion } from 'framer-motion';
import { weddingConfig } from '@/data/weddingConfig';
import SectionDivider from './SectionDivider';

export default function DressCode() {
  const reduced = useReducedMotion();
  return (
    <section id="dress-code" className="px-6 py-14" data-testid="section-dress-code">
      <div className="invite-shell text-center">
        <SectionDivider />
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow mt-5">A little inspiration</p>
          <h2 className="section-title mt-2">DRESS CODE</h2>
          <p className="mt-3 font-display text-xl italic text-[#1a3460]/70">Party Attire</p>
          <div className="mx-auto mt-8 flex max-w-md justify-center gap-4 sm:gap-6">
            {weddingConfig.dressCodeColors.map((color) => (
              <div key={color.name} className="flex flex-col items-center gap-2" data-testid={`swatch-${color.name.toLowerCase().replaceAll(' ', '-')}`}>
                <span
                  className="h-11 w-11 rounded-full border border-[#1a3460]/15 shadow-sm sm:h-14 sm:w-14"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
                <span className="hidden text-[10px] text-[#1a3460]/60 sm:block">{color.name}</span>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-sm font-display text-xl italic leading-relaxed text-[#1a3460]/75">
            {weddingConfig.invitationMessages.dressCodeNote}
          </p>
        </motion.div>
      </div>
    </section>
  );
}