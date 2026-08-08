import type { CSSProperties } from 'react';
import cornerFlower from '@references/flower/Floral_Corner.jpeg';

type CornerPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface CornerFlowerProps {
  className?: string;
  placement?: CornerPlacement;
}

const CORNER_VARS: Record<CornerPlacement, CSSProperties> = {
  'top-left': { '--corner-x': '0%', '--corner-y': '0%' } as CSSProperties,
  'top-right': { '--corner-x': '100%', '--corner-y': '0%' } as CSSProperties,
  'bottom-left': { '--corner-x': '0%', '--corner-y': '100%' } as CSSProperties,
  'bottom-right': { '--corner-x': '100%', '--corner-y': '100%' } as CSSProperties,
};

export default function CornerFlower({
  className = '',
  placement = 'bottom-right',
}: CornerFlowerProps) {
  return (
    <div
      aria-hidden="true"
      data-testid="ornament-corner-flower"
      className={`pointer-events-none absolute overflow-hidden ${className}`}
      style={CORNER_VARS[placement]}
    >
      <img
        src={cornerFlower}
        alt=""
        draggable={false}
        className="floral-corner-img h-full w-full object-cover object-center opacity-80"
      />
    </div>
  );
}
