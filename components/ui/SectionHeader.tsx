import type { ReactNode } from "react";

interface SectionHeaderProps {
  headingId: string;
  title: ReactNode;
  eyebrow?: string;
  /** Extra eyebrow text hidden on small screens (the reference's `.long`). */
  eyebrowLong?: string;
  lede?: ReactNode;
  /** Use the eyebrow's light variant on dark sections. */
  light?: boolean;
  /** Extra classes for the wrapper (e.g. `book-head`). */
  className?: string;
  small?: boolean;
  children?: ReactNode;
}

/** Eyebrow + H2 + optional lede, as repeated across the reference sections. */
export function SectionHeader({
  headingId,
  title,
  eyebrow,
  eyebrowLong,
  lede,
  light,
  className,
  small,
  children,
}: SectionHeaderProps) {
  return (
    <div className={`head rv ${className ?? ""}`.trim()}>
      {eyebrow && (
        <p className={light ? "eyebrow light" : "eyebrow"}>
          {eyebrow}
          {eyebrowLong && <span className="long">{eyebrowLong}</span>}
        </p>
      )}
      <h2 className={small ? "h2 sm" : "h2"} id={headingId}>
        {title}
      </h2>
      {lede && <p className="lede">{lede}</p>}
      {children}
    </div>
  );
}
