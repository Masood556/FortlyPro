"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useCompareSlider } from "@/hooks/useCompareSlider";

interface ImageSource {
  src: string;
  alt: string;
}

interface BeforeAfterSliderProps {
  before: ImageSource;
  after: ImageSource;
  caption?: string;
}

/** Draggable, keyboard-accessible before/after image comparison. */
export function BeforeAfterSlider({ before, after, caption }: BeforeAfterSliderProps) {
  const { containerRef, position, dragging, dragged, handlers, onKeyDown } = useCompareSlider();
  const className = ["compare", dragging && "dragging", dragged && "dragged"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="compare-wrap rv results-compare">
      <div
        ref={containerRef}
        className={className}
        style={{ "--pos": `${position}%` } as CSSProperties}
        {...handlers}
      >
        <Image
          src={after.src}
          alt={after.alt}
          fill
          sizes="(max-width: 1180px) 100vw, 1120px"
          draggable={false}
        />
        <Image
          className="before"
          src={before.src}
          alt={before.alt}
          fill
          sizes="(max-width: 1180px) 100vw, 1120px"
          draggable={false}
        />
        <span className="tag b">Before</span>
        <span className="tag a">After</span>
        <span className="divider" aria-hidden="true" />
        <span
          className="knob"
          role="slider"
          tabIndex={0}
          aria-label="Compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          onKeyDown={onKeyDown}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </span>
        <span className="draghint" aria-hidden="true">
          Drag to compare
        </span>
      </div>
      {caption && (
        <p className="caption">
          <b>{caption}</b>
        </p>
      )}
    </div>
  );
}
