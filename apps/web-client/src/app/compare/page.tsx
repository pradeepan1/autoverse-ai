import { Metadata } from "next";
import { ComparePageClient } from "./ComparePageClient";

export const metadata: Metadata = {
  title: "Compare Vehicles",
  description: "Compare up to 4 premium vehicles side by side.",
};

export default function ComparePage() {
  return <ComparePageClient />;
}
