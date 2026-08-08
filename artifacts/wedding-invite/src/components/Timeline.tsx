import { motion, useReducedMotion } from 'framer-motion';
import { Cake, DoorOpen, Gift, Heart, Sparkles, Star, Utensils } from 'lucide-react';
import { weddingConfig, type ScheduleItem } from '@/data/weddingConfig';
import sideBorder from '@references/flower/Floral_Side_Border.jpeg';

const icons = { 'door-open': DoorOpen, gift: Gift, sparkles: Sparkles, utensils: Utensils, cake: Cake, star: Star, heart: Heart };

export default function Timeline() {
  const reduced = useReducedMotion();
  return (
    <section id="schedule" className="relative overflow-hidden px-6 py-14" data-testid="section-schedule">
      <div className="invite-shell">
        <div
          aria-hidden="true"
          data-testid="decoration-timeline-floral"
          className="pointer-events-none absolute -z-10 right-0 top-10 bottom-10 w-16 opacity-40 sm:w-32 sm:opacity-50"
        >
          <img
            src={sideBorder}
            alt=""
            draggable={false}
            className="floral-side-img -scale-x-100 h-full w-full object-cover object-left"
          />
        </div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow">The celebration</p>
          <h2 className="section-title mt-2">WEDDING DAY SCHEDULE</h2>
        </motion.div>
        <div className="relative mx-auto mt-10 max-w-lg">
          <div className="timeline-line" aria-hidden="true" />
          <div className="space-y-6">
            {weddingConfig.schedule.map((item, index) => <TimelineRow key={item.event} item={item} index={index} reduced={Boolean(reduced)} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineRow({ item, index, reduced }: { item: ScheduleItem; index: number; reduced: boolean }) {
  const Icon = icons[item.icon];
  return (
    <motion.div
      className="relative grid grid-cols-[1fr_44px_1fr] items-center gap-2"
      initial={{ opacity: 0, y: reduced ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      data-testid={`timeline-item-${index}`}
    >
      <span className="text-right font-display text-lg text-[#1a3460]/75">{item.time}</span>
      <span className="timeline-dot flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#f6f1e8] bg-[#1a3460] text-[#f5efe0]">
        <Icon className="h-4 w-4" strokeWidth={1.5} />
      </span>
      <span className="font-display text-xl text-[#1a3460]">{item.event}</span>
    </motion.div>
  );
}