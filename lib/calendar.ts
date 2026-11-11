import { SITE } from "@/lib/config";
import { TIME_SLOTS, fromIsoDate } from "@/lib/booking";

const pad = (value: number) => String(value).padStart(2, "0");

/** Builds an .ics body for a two-hour visit starting at the chosen slot. */
export function buildIcs(iso: string, slotIndex: number, address: string, uid: string) {
  const date = fromIsoDate(iso);
  const [hour, minute] = TIME_SLOTS[slotIndex];
  const start = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(hour)}${pad(minute)}00`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//FortlyPro//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${uid}@fortlypro.com`,
    `DTSTART:${start}`,
    "DURATION:PT2H",
    "SUMMARY:FortlyPro appliance deep clean",
    `LOCATION:${address.replace(/,/g, "\\,")}`,
    `DESCRIPTION:Your tech arrives within a 20-minute window and confirms by text. Questions: ${SITE.phoneDisplay.replace(/‑/g, "-")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(content: string, filename = "fortlypro-cleaning.ics") {
  const url = URL.createObjectURL(new Blob([content], { type: "text/calendar" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    link.remove();
  }, 500);
}
