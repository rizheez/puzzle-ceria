interface SpeakerIconProps {
  isEnabled: boolean;
  className?: string;
}

export function SpeakerIcon({ isEnabled, className = 'h-6 w-6' }: SpeakerIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 9.5h3.2l4.3-3.8c0.8-0.7 2-0.1 2 1v10.6c0 1.1-1.2 1.7-2 1l-4.3-3.8H4c-0.8 0-1.4-0.6-1.4-1.4v-2.2C2.6 10.1 3.2 9.5 4 9.5Z" fill="currentColor" />
      {isEnabled ? (
        <>
          <path d="M16.2 8.2c1 1 1.5 2.3 1.5 3.8s-0.5 2.8-1.5 3.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M18.8 5.9c1.6 1.6 2.6 3.8 2.6 6.1s-1 4.5-2.6 6.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M17 9l4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M21 9l-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
