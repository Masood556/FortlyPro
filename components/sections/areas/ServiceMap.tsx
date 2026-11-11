"use client";

import { prefersReducedMotion } from "@/lib/scroll";
import { SERVICE_MAP_MARKUP, SERVICE_MAP_VIEW_BOX } from "@/lib/data/service-map-markup";

interface ServiceMapProps {
  /** id of the zip input to focus when the map is clicked. */
  zipInputId: string;
}

/** Static service-area map. Clicking it jumps to the zip checker beside it. */
export function ServiceMap({ zipInputId }: ServiceMapProps) {
  const focusZipField = () => {
    const input = document.getElementById(zipInputId);
    if (!input) return;
    input.focus({ preventScroll: true });
    input.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
  };

  return (
    <div className="mapwrap">
      <svg
        id="svcmap"
        viewBox={SERVICE_MAP_VIEW_BOX}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Map of the FortlyPro service area across Greater Austin"
        onClick={focusZipField}
        dangerouslySetInnerHTML={{ __html: SERVICE_MAP_MARKUP }}
      />
    </div>
  );
}
