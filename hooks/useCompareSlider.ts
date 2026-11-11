"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { prefersReducedMotion } from "@/lib/scroll";

const KEY_STEPS: Record<string, number> = {
  ArrowLeft: -5,
  ArrowDown: -5,
  ArrowRight: 5,
  ArrowUp: 5,
};

/** One-time hint sweep: [elapsed ms, position %] keyframes. */
const HINT_KEYFRAMES: ReadonlyArray<readonly [number, number]> = [
  [0, 50],
  [600, 30],
  [1300, 68],
  [1900, 50],
];

const clamp = (value: number) => Math.max(0, Math.min(100, value));
const ease = (u: number) => (u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2);

/** Pointer, keyboard and intro-hint behaviour for the before/after slider. */
export function useCompareSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [dragged, setDragged] = useState(false);

  const moveTo = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect && rect.width > 0) setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    setDragging(true);
    setDragged(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) moveTo(event.clientX);
  };

  const endDrag = () => {
    draggingRef.current = false;
    setDragging(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const step = KEY_STEPS[event.key];
    if (step !== undefined) {
      setPosition((current) => clamp(current + step));
      event.preventDefault();
    } else if (event.key === "Home") {
      setPosition(0);
      event.preventDefault();
    } else if (event.key === "End") {
      setPosition(100);
      event.preventDefault();
    }
  };

  // Hint sweep the first time the slider is mostly in view.
  useEffect(() => {
    const node = containerRef.current;
    if (!node || prefersReducedMotion() || !("IntersectionObserver" in window)) return;

    let frame = 0;
    let timer = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          if (draggingRef.current) return;
          const elapsed = now - start;
          const next = HINT_KEYFRAMES.findIndex(([time]) => time > elapsed);
          if (next === -1) {
            setPosition(50);
            return;
          }
          const [t0, p0] = HINT_KEYFRAMES[next - 1];
          const [t1, p1] = HINT_KEYFRAMES[next];
          setPosition(p0 + (p1 - p0) * ease((elapsed - t0) / (t1 - t0)));
          frame = requestAnimationFrame(tick);
        };
        timer = window.setTimeout(() => {
          frame = requestAnimationFrame((now) => {
            tick(now);
          });
        }, 500);
      },
      { threshold: 0.6 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, []);

  return {
    containerRef,
    position,
    dragging,
    dragged,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onLostPointerCapture: endDrag,
    },
    onKeyDown,
  };
}
