import Link from "next/link";
import { Fragment } from "react";

export interface BreadcrumbItem {
  label: string;
  /** Omit for crumbs whose page does not exist yet: they render as plain text. */
  href?: string;
}

interface BreadcrumbsProps {
  /** Label of the current page. */
  current: string;
  /** Crumbs between Home and the current page. */
  trail?: BreadcrumbItem[];
}

export function Breadcrumbs({ current, trail = [] }: BreadcrumbsProps) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <div className="wrap">
        <Link href="/">Home</Link>
        {trail.map((item) => (
          <Fragment key={item.label}>
            {" › "}
            {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
          </Fragment>
        ))}
        {" › "}
        <span aria-current="page">{current}</span>
      </div>
    </nav>
  );
}
