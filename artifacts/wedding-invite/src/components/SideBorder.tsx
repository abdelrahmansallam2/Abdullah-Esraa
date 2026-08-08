import sideBorder from '@references/flower/Floral_Side_Border.jpeg';

export default function SideBorder() {
  return (
    <div
      aria-hidden="true"
      data-testid="decoration-side-flower"
      className="pointer-events-none fixed inset-y-0 left-0 -z-10 w-12 opacity-60 sm:w-28 sm:opacity-70 lg:w-40"
    >
      <img
        src={sideBorder}
        alt=""
        draggable={false}
        className="floral-side-img h-full w-full object-cover object-left"
      />
    </div>
  );
}
