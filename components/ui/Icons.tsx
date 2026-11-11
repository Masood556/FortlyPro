import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const STROKE_PROPS = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function GoogleG(props: IconProps) {
  return (
    <svg className="gg" viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.8-6.8C35.7 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.7 6c4.5-4.2 6.9-10.3 6.9-17.7z" />
      <path fill="#FBBC05" d="M10.5 28.6A14.5 14.5 0 0 1 9.7 24c0-1.6.3-3.2.8-4.6l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.7l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.7-6c-2.1 1.4-4.9 2.3-8.2 2.3-6.3 0-11.6-4.1-13.5-9.9l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M8 1.2l2 4.3 4.7.5-3.5 3.2 1 4.6L8 11.4 3.8 13.8l1-4.6L1.3 6l4.7-.5z" />
    </svg>
  );
}

export function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="stars" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, index) => (
        <StarIcon key={index} />
      ))}
    </div>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" strokeWidth={1.8} {...STROKE_PROPS} {...props}>
      <path d="M6 3.5L10.5 8 6 12.5" />
    </svg>
  );
}

export function ArrowDown(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" strokeWidth={1.8} {...STROKE_PROPS} {...props}>
      <path d="M8 3v10M4 9l4 4 4-4" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.8} {...STROKE_PROPS} {...props}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.8} {...STROKE_PROPS} {...props}>
      <path d="M4 5h16v11H9l-5 4z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.8} {...STROKE_PROPS} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function ChecklistIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.8} {...STROKE_PROPS} {...props}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}

export function NoticeOkIcon() {
  return (
    <svg viewBox="0 0 20 20" strokeWidth={1.8} {...STROKE_PROPS}>
      <circle cx="10" cy="10" r="8" />
      <path d="M6.5 10.2l2.4 2.4 4.6-5" />
    </svg>
  );
}

export function NoticeWarnIcon() {
  return (
    <svg viewBox="0 0 20 20" strokeWidth={1.8} {...STROKE_PROPS}>
      <circle cx="10" cy="10" r="8" />
      <path d="M10 6v5M10 13.8v.1" />
    </svg>
  );
}
