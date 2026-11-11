import type { ApplianceId } from "@/types";

/**
 * Inner markup of each appliance illustration (viewBox 0 0 440 440),
 * copied from the design reference. Static, trusted, build-time content.
 */
export const APPLIANCE_DIAGRAMS: Record<ApplianceId, string> = {
  washer: `<defs><pattern id="hw" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="1.5" fill="#C7C7CC" stroke="none"/></pattern></defs>
<rect x="70" y="34" width="300" height="372" rx="24" fill="#fff"/><path d="M70 108H370"/>
<rect x="92" y="54" width="112" height="34" rx="7" fill="#F5F5F7"/><path d="M106 71h44" opacity=".45"/>
<circle cx="240" cy="71" r="3.5" fill="#1D1D1F" stroke="none" opacity=".25"/><circle cx="256" cy="71" r="3.5" fill="#1D1D1F" stroke="none" opacity=".25"/>
<circle cx="318" cy="71" r="20" fill="#F5F5F7"/><path d="M318 57v9"/>
<circle cx="220" cy="256" r="118" fill="#FAFAFC"/><circle cx="220" cy="256" r="98" fill="#E9E9EE"/><circle cx="220" cy="256" r="84" fill="#fff"/><circle cx="220" cy="256" r="72" fill="url(#hw)" stroke="none"/>
<path d="M220 184v16M158 292l14-8M282 292l-14-8" stroke-width="5" stroke="#E0E0E5"/>
<rect x="92" y="372" width="48" height="20" rx="5" fill="#F5F5F7"/><path d="M104 382h24" opacity=".45"/>
<rect x="96" y="406" width="28" height="8" rx="3" fill="#1D1D1F" stroke="none" opacity=".75"/><rect x="316" y="406" width="28" height="8" rx="3" fill="#1D1D1F" stroke="none" opacity=".75"/>`,
  dishwasher: `<rect x="70" y="30" width="300" height="300" rx="18" fill="#fff"/>
<path d="M82 330V54a12 12 0 0112-12h252a12 12 0 0112 12v276" stroke="#D2D2D7" stroke-width="5"/>
<rect x="94" y="54" width="252" height="276" rx="8" fill="#FAFAFC"/>
<rect x="108" y="76" width="224" height="76" rx="6" fill="#fff"/>
<path d="M124 96v46M140 96v46M156 96v46M172 96v46M188 96v46M204 96v46M220 96v46M236 96v46M252 96v46M268 96v46M284 96v46M300 96v46M316 96v46" opacity=".35"/>
<path d="M146 180H294" stroke="#C7C7CC" stroke-width="6"/><circle cx="220" cy="180" r="8" fill="#fff"/>
<rect x="108" y="202" width="224" height="88" rx="6" fill="#fff"/>
<path d="M124 222v60M144 222v60M164 222v60M184 222v60M256 222v60M276 222v60M296 222v60M316 222v60" opacity=".35"/>
<rect x="204" y="298" width="32" height="26" rx="4" fill="#E9E9EE"/><ellipse cx="220" cy="298" rx="16" ry="4" fill="#fff"/>
<path d="M70 330H370L398 414H42Z" fill="#F5F5F7"/>
<rect x="186" y="352" width="68" height="36" rx="6" fill="#fff"/><path d="M196 370h48" opacity=".45"/>`,
  dryer: `<defs><pattern id="hd" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="1.4" fill="#D2D2D7" stroke="none"/></pattern></defs>
<rect x="70" y="34" width="300" height="372" rx="24" fill="#fff"/><path d="M70 108H370"/>
<rect x="96" y="54" width="124" height="34" rx="7" fill="#F5F5F7"/><path d="M110 71h30" opacity=".45"/>
<circle cx="268" cy="71" r="3.5" fill="#1D1D1F" stroke="none" opacity=".25"/>
<circle cx="318" cy="71" r="20" fill="#F5F5F7"/><path d="M318 57v9"/>
<circle cx="220" cy="248" r="112" fill="#FAFAFC"/><circle cx="220" cy="248" r="90" fill="#fff"/>
<circle cx="220" cy="248" r="64" fill="#F5F5F7"/><circle cx="220" cy="248" r="56" fill="url(#hd)" stroke="none"/>
<path d="M220 160v22M144 292l19-11M296 292l-19-11" stroke-width="5" stroke="#E0E0E5"/>
<rect x="186" y="316" width="68" height="16" rx="5" fill="#E9E9EE"/><path d="M196 324h48" opacity=".4"/>
<rect x="194" y="370" width="52" height="26" rx="5" stroke-dasharray="4 4" opacity=".55"/>
<rect x="96" y="406" width="28" height="8" rx="3" fill="#1D1D1F" stroke="none" opacity=".75"/><rect x="316" y="406" width="28" height="8" rx="3" fill="#1D1D1F" stroke="none" opacity=".75"/>`,
  disposal: `<rect x="40" y="86" width="360" height="18" rx="3" fill="#F5F5F7"/>
<path d="M96 104V170Q96 204 130 204H310Q344 204 344 170V104" fill="#FAFAFC"/>
<path d="M268 254H300V292Q300 316 322 316Q344 316 344 292V244H410" stroke="#1D1D1F" stroke-width="20"/>
<path d="M268 254H300V292Q300 316 322 316Q344 316 344 292V244H410" stroke="#F5F5F7" stroke-width="17"/>
<rect x="204" y="206" width="32" height="18" fill="#fff"/>
<rect x="172" y="222" width="96" height="104" rx="16" fill="#fff"/>
<rect x="188" y="236" width="64" height="40" rx="10" stroke-dasharray="4 4" opacity=".55"/>
<path d="M180 298h80" opacity=".3"/>
<rect x="180" y="326" width="80" height="44" rx="12" fill="#F5F5F7"/>
<path d="M220 370v16q0 10 10 10h44" opacity=".45"/>
<ellipse cx="220" cy="204" rx="30" ry="7" fill="#fff"/><ellipse cx="220" cy="204" rx="19" ry="4.2" fill="#E9E9EE"/>
<path d="M220 200v8M206 204h28M210 201l20 6M230 201l-20 6" opacity=".35"/>`,
};
