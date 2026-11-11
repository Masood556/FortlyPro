"use client";

import { useCallback, useMemo, useReducer } from "react";
import type {
  ApplianceId,
  BookingDetails,
  BookingState,
  BookingStep,
  BundleKey,
  ZipNotice,
} from "@/types";
import { BUNDLE_PRESETS, BUNDLES, resolveBundle } from "@/lib/booking";

const INITIAL_STATE: BookingState = {
  step: 1,
  zip: null,
  area: null,
  appliances: [],
  club: false,
  date: null,
  slotIndex: null,
  details: null,
  notice: null,
};

type Action =
  | { type: "toggleAppliance"; id: ApplianceId }
  | { type: "setClub"; club: boolean }
  | { type: "zipCovered"; zip: string; area: string; advance: boolean }
  | { type: "zipRejected"; notice: ZipNotice }
  | { type: "presetBundle"; key: BundleKey }
  | { type: "selectDate"; iso: string }
  | { type: "selectSlot"; index: number }
  | { type: "goTo"; step: BookingStep }
  | { type: "submitDetails"; details: BookingDetails }
  | { type: "restart" };

function reducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case "toggleAppliance": {
      const appliances = state.appliances.includes(action.id)
        ? state.appliances.filter((id) => id !== action.id)
        : [...state.appliances, action.id];
      return { ...state, appliances, club: appliances.length === 4 ? state.club : false };
    }
    case "setClub":
      return { ...state, club: state.appliances.length === 4 && action.club };
    case "zipCovered":
      return {
        ...state,
        zip: action.zip,
        area: action.area,
        notice: { kind: "covered", area: action.area },
        step: action.advance && state.step < 2 ? 2 : state.step,
      };
    case "zipRejected":
      return { ...state, notice: action.notice };
    case "presetBundle": {
      const appliances = BUNDLE_PRESETS[action.key];
      const club = action.key === "club";
      if (state.zip) return { ...state, appliances, club, step: 2 };
      return {
        ...state,
        appliances,
        club,
        step: 1,
        notice: { kind: "bundle", name: BUNDLES[action.key].name },
      };
    }
    case "selectDate":
      return { ...state, date: action.iso, slotIndex: null };
    case "selectSlot":
      return { ...state, slotIndex: action.index };
    case "goTo":
      return { ...state, step: action.step };
    case "submitDetails":
      return { ...state, details: action.details, step: 5 };
    case "restart":
      return {
        ...state,
        appliances: [],
        club: false,
        date: null,
        slotIndex: null,
        details: null,
        step: state.zip ? 2 : 1,
      };
  }
}

/** Booking-widget state machine. Pure UI state: nothing is submitted anywhere. */
export function useBookingFlow() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const bundle = useMemo(
    () => resolveBundle(state.appliances, state.club),
    [state.appliances, state.club],
  );

  const canContinue =
    (state.step === 2 && bundle.ok) ||
    (state.step === 3 && state.date !== null && state.slotIndex !== null) ||
    state.step === 4;

  const actions = useMemo(
    () => ({
      toggleAppliance: (id: ApplianceId) => dispatch({ type: "toggleAppliance", id }),
      setClub: (club: boolean) => dispatch({ type: "setClub", club }),
      zipCovered: (zip: string, area: string, advance: boolean) =>
        dispatch({ type: "zipCovered", zip, area, advance }),
      zipRejected: (notice: ZipNotice) => dispatch({ type: "zipRejected", notice }),
      presetBundle: (key: BundleKey) => dispatch({ type: "presetBundle", key }),
      selectDate: (iso: string) => dispatch({ type: "selectDate", iso }),
      selectSlot: (index: number) => dispatch({ type: "selectSlot", index }),
      goTo: (step: BookingStep) => dispatch({ type: "goTo", step }),
      submitDetails: (details: BookingDetails) => dispatch({ type: "submitDetails", details }),
      restart: () => dispatch({ type: "restart" }),
    }),
    [],
  );

  const goBack = useCallback(
    () => dispatch({ type: "goTo", step: Math.max(1, state.step - 1) as BookingStep }),
    [state.step],
  );
  const goForward = useCallback(
    () => dispatch({ type: "goTo", step: Math.min(5, state.step + 1) as BookingStep }),
    [state.step],
  );

  return { state, bundle, canContinue, goBack, goForward, ...actions };
}

export type BookingFlow = ReturnType<typeof useBookingFlow>;
