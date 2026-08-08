import floralDivider from '@references/flower/Floral_Divider.jpeg';

interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({ className = '' }: SectionDividerProps) {
  return (
    <div
      className={`relative flex justify-center py-3 select-none ${className}`}
      data-testid="divider-floral"
      aria-hidden="true"
    >
      <img
        src={floralDivider}
        alt=""
        draggable={false}
        className="floral-divider-img h-auto w-4/5 max-w-[380px] object-contain opacity-95"
      />
    </div>
  );
}
