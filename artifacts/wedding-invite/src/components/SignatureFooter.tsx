import { weddingConfig } from '@/data/weddingConfig';

export default function SignatureFooter() {
  return (
    <footer
      className="border-t border-[#c9a84c]/15 bg-[#12264c] px-6 py-8 text-center"
      data-testid="signature-footer"
    >
      <div className="mx-auto max-w-md">
        <p className="text-[10px] font-sans uppercase tracking-[0.35em] text-[#f7f3e9]/60">
          Made by Sallam for
        </p>
        <p className="mt-4 font-display text-3xl leading-tight text-[#f7f3e9]" data-testid="text-footer-groom">
          {weddingConfig.groomName}
        </p>
        <p className="my-2 font-display italic text-xl text-[#c9a84c]">&amp;</p>
        <p className="font-display text-3xl leading-tight text-[#f7f3e9]" data-testid="text-footer-bride">
          {weddingConfig.brideName}
        </p>
      </div>
    </footer>
  );
}
