"use client";

import { useContext } from "react";
import { CompareContext } from "../context/CompareProvider";

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
