type IconProps = {
  className?: string;
  active?: boolean;
};

export function LogoIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 56 61" aria-hidden="true">
      <use href="#logo-path" />
    </svg>
  );
}

export function ArrowRight({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        fill="none"
        stroke="var(--icon-color, currentColor)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightLong({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 24" aria-hidden="true">
      <path
        d="M3 12h24M19 4l8 8-8 8"
        fill="none"
        stroke="var(--icon-color, currentColor)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Plus({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 5v14M5 12h14"
        fill="none"
        stroke="var(--icon-color, currentColor)"
        strokeWidth="var(--stroke-width, 2)"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Pin({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z"
        fill="none"
        stroke="var(--icon-color, currentColor)"
        strokeWidth="2"
      />
      <circle cx="12" cy="9" r="2.4" fill="var(--icon-color, currentColor)" />
    </svg>
  );
}

export function SwipeUp({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20V5M6 11l6-6 6 6"
        fill="none"
        stroke="var(--icon-color, currentColor)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Volume({ className, active }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 28 24" aria-hidden="true">
      <path
        className={active ? "volume-body volume-body-active" : "volume-body"}
        d="M3 9v6h5l6 5V4L8 9H3Z"
        fill="var(--icon-color, currentColor)"
      />
      <path
        className={
          active ? "volume-wave-1 volume-wave-1-active" : "volume-wave-1"
        }
        d="M18 8c1.2 1 1.8 2.3 1.8 4s-.6 3-1.8 4"
        fill="none"
        stroke="var(--icon-color, currentColor)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        className={
          active ? "volume-wave-2 volume-wave-2-active" : "volume-wave-2"
        }
        d="M21 5c2 1.8 3 4.1 3 7s-1 5.2-3 7"
        fill="none"
        stroke="var(--icon-color, currentColor)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6 6 18"
        fill="none"
        stroke="var(--icon-color, currentColor)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
