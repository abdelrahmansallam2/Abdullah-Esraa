import { Heart } from 'lucide-react';
import { weddingConfig } from '@/data/weddingConfig';

export default function Footer() {
  return (
    <footer className="bg-[#1a3460] text-[#f2e6c2]/80 py-8 px-6 text-center">
      <div className="invite-shell flex flex-col items-center gap-2">
        <Heart className="h-4 w-4 text-[#c9a84c]" fill="#c9a84c" strokeWidth={0} />
        <p className="text-sm font-sans tracking-wide" data-testid="text-footer">
          Made with love for {weddingConfig.groomName} &amp; {weddingConfig.brideName} &hearts;
        </p>
        <p className="text-xs font-sans text-[#f2e6c2]/50">
          {weddingConfig.weddingDate.getFullYear()}
        </p>
      </div>
    </footer>
  );
}
