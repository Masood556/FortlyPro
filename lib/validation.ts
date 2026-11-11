import type { BookingDetails } from "@/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^1?\d{10}$/;

export const isValidName = (value: string) => value.trim().length > 1;
export const isValidPhone = (value: string) => PHONE_PATTERN.test(value.replace(/\D/g, ""));
export const isValidEmail = (value: string) => EMAIL_PATTERN.test(value.trim());
export const isValidAddress = (value: string) => value.trim().length > 4;

export type FieldErrors<K extends string> = Partial<Record<K, boolean>>;

export function validateBookingDetails(
  values: BookingDetails,
): FieldErrors<keyof BookingDetails> {
  return {
    name: !isValidName(values.name),
    phone: !isValidPhone(values.phone),
    email: !isValidEmail(values.email),
    address: !isValidAddress(values.address),
  };
}

export interface QuoteRequest {
  name: string;
  phone: string;
  units: string;
  email: string;
}

export function validateQuoteRequest(values: QuoteRequest): FieldErrors<"name" | "phone" | "email"> {
  return {
    name: !isValidName(values.name),
    phone: !isValidPhone(values.phone),
    email: !isValidEmail(values.email),
  };
}

export const hasErrors = (errors: Record<string, boolean | undefined>) =>
  Object.values(errors).some(Boolean);
