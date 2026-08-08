import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, MapPin } from 'lucide-react';
import { weddingConfig } from '@/data/weddingConfig';

export default function MapSection() {
  const reduced = useReducedMotion();
  return (
    <section id="venue" className="relative px-6 py-14" data-testid="section-venue">
      <div className="invite-shell">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: reduced ? 0 : 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow">Find us there</p>
          <h2 className="section-title mt-2">WEDDING RECEPTION VENUE</h2>
          <p className="mt-4 font-display text-2xl text-[#1a3460]">{weddingConfig.venueName}</p>
          <p className="mt-1 font-display italic text-lg text-[#1a3460]/75">{weddingConfig.venueHall}</p>
          <p className="mt-1 text-sm text-[#1a3460]/65">{weddingConfig.venueAddress}</p>
        </motion.div>
        <div className="mt-8 overflow-hidden rounded-2xl border border-[#c9a84c]/35 bg-[#e9e1d3] shadow-sm">
          <div
            className="map-placeholder"
            role="img"
            aria-label={`Map showing ${weddingConfig.venueName} - ${weddingConfig.venueHall}`}
          >
            <div className="map-road map-road-one" />
            <div className="map-road map-road-two" />
            <div className="map-water" />
            <div className="map-pin">
              <MapPin className="h-7 w-7" fill="#1a3460" />
              <span>{weddingConfig.venueName}</span>
            </div>
          </div>
        </div>
        <a
          href={weddingConfig.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-venue-maps"
          className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-[#1a3460] px-6 py-3 text-sm tracking-wide text-[#f5efe0] shadow-md transition-transform hover:scale-[1.02]"
        >
          Open in Maps <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}