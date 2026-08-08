import floralHeader from '@references/flower/Floral_Header.jpeg';

interface FloralHeaderProps {
  className?: string;
}

export default function FloralHeader({ className = '' }: FloralHeaderProps) {
  return (
    <div
      className={`relative flex justify-center py-2 select-none ${className}`}
      data-testid="ornament-floral-header"
      aria-hidden="true"
    >
      <img
        src={floralHeader}
        alt=""
        draggable={false}
        className="floral-header-img h-auto w-4/5 max-w-[420px] object-contain opacity-95"
      />
    </div>
  );
}
