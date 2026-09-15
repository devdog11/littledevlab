interface LogoProps {
  size?: number;
}

export function Logo({ size = 28 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28">
      <rect width="28" height="28" rx="7" fill="#f3ede1" />
      <path
        d="M10.4 14.7 Q14 13.5 17.6 14.7 L19.8 19.5 Q19.8 22 17.2 22 L10.8 22 Q8.2 22 8.2 19.5 Z"
        fill="#b0492a"
      />
      <path
        d="M12.3 7.6 L12.3 10.5 L8.2 19.5 Q8.2 22 10.8 22 L17.2 22 Q19.8 22 19.8 19.5 L15.7 10.5 L15.7 7.6"
        fill="none"
        stroke="#2c2820"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="11.7" y="6.3" width="4.6" height="1.3" rx="0.65" fill="#2c2820" />
      <path
        d="M10.6 7.3 L9.0 8.8 L10.6 10.3"
        fill="none"
        stroke="#c8a96e"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.4 7.3 L19.0 8.8 L17.4 10.3"
        fill="none"
        stroke="#c8a96e"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.3 19.3 L14 17.3 L16.2 18.6"
        fill="none"
        stroke="#f3ede1"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="13.3" y="16.6" width="1.4" height="1.4" fill="#c8a96e" transform="rotate(45 14 17.3)" />
      <rect x="10.6" y="18.6" width="1.4" height="1.4" fill="#c8a96e" transform="rotate(45 11.3 19.3)" />
      <rect x="15.5" y="17.9" width="1.4" height="1.4" fill="#c8a96e" transform="rotate(45 16.2 18.6)" />
    </svg>
  );
}
