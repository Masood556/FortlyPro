import { BOOKING_API_CONNECTED } from "@/lib/config";

export type LeadKind = "contact_quote" | "host_inquiry" | "property_manager_quote" | "realtor_booking" | "realtor_referral";

export interface LeadPayload {
  kind: LeadKind;
  /** Visible form fields plus the hidden attribution fields (utm_*, ref, landing_page, booked_by...). */
  fields: Record<string, string | string[]>;
}

export type LeadResult =
  | { status: "sent" }
  | { status: "not_connected" }
  | { status: "error"; message: string };

/**
 * INTEGRATION POINT. Replace the body with a call to the real lead endpoint
 * (e.g. a server route that forwards to GoHighLevel). Until then nothing is
 * transmitted and the UI says so: it never reports a lead as sent.
 */
export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  void payload;
  if (!BOOKING_API_CONNECTED) return { status: "not_connected" };
  return { status: "error", message: "Lead endpoint is not implemented." };
}
