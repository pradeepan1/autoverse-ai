/**
 * AutoVerse AI — Component Showcase Page
 *
 * This is a temporary design-system showcase demonstrating that all Module 01
 * components, providers, and design tokens are correctly wired.
 *
 * This is NOT the landing page. The landing page will be built in Module 03.
 * This page will be replaced/redirected at the start of Module 03.
 *
 * Per docs/Development_Roadmap.md Module 01 scope.
 */

import type { Metadata } from "next";

import { ShowcaseClient } from "./showcase-client";

export const metadata: Metadata = {
  title: "Component Showcase — Module 01",
  description: "AutoVerse AI design system and component library showcase.",
};

export default function ShowcasePage() {
  return <ShowcaseClient />;
}
