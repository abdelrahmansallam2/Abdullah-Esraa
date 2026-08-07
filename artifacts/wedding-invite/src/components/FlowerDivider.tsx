import vineDivider from '@assets/WhatsApp_Image_2026-08-04_at_10.48.58_PM_1785873167784.jpeg';

interface FlowerDividerProps {
  className?: string;
}

export default function FlowerDivider({ className = '' }: FlowerDividerProps) {
  return (
    <div
      className={`flex justify-center items-center py-2 select-none ${className}`}
      data-testid="divider-flower"
      aria-hidden="true"
    >
      <img
        src={vineDivider}
        alt=""
        className="h-8 sm:h-10 w-auto max-w-[280px] object-contain mix-blend-multiply opacity-90"
        draggable={false}
      />
    </div>
  );
}
