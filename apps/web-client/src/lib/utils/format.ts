/**
 * AutoVerse AI — Formatting Utilities
 *
 * Utilities for formatting currency, mileage, dates, and numbers.
 * All use `Intl` APIs — no hardcoded locale assumptions.
 * Per docs/UI_UX_Guidelines.md §2 (tabular numeric figures).
 * Per docs/PROJECT_RULES.md Rule 20 (no hardcoded values).
 */

// ── Currency ──────────────────────────────────────────────────────────────
/**
 * Formats a numeric value as currency.
 *
 * @param value   - Numeric value to format
 * @param currency - ISO 4217 currency code (default: "INR")
 * @param locale   - BCP 47 locale (default: "en-IN")
 * @returns Formatted currency string e.g. "₹12,50,000"
 *
 * @example
 * formatCurrency(1250000) // → "₹12,50,000"
 * formatCurrency(45000, "USD", "en-US") // → "$45,000"
 */
export function formatCurrency(
  value: number,
  currency: string = "INR",
  locale: string = "en-IN"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formats a currency value in compact notation (e.g. ₹12.5L, ₹1.2Cr).
 * Used for card-level price displays where space is limited.
 */
export function formatCurrencyCompact(
  value: number,
  currency: string = "INR"
): string {
  if (value >= 10_000_000) {
    return `₹${(value / 10_000_000).toFixed(2)} Cr`;
  }
  if (value >= 100_000) {
    return `₹${(value / 100_000).toFixed(2)} L`;
  }
  return formatCurrency(value, currency);
}

// ── Mileage / Odometer ────────────────────────────────────────────────────
/**
 * Formats an odometer reading in kilometres.
 *
 * @param km - Distance in kilometres
 * @returns Formatted string e.g. "45,230 km"
 */
export function formatMileage(km: number): string {
  return `${new Intl.NumberFormat("en-IN").format(km)} km`;
}

// ── Numbers ───────────────────────────────────────────────────────────────
/**
 * Formats a number with locale-appropriate grouping separators.
 *
 * @param value  - Numeric value
 * @param locale - BCP 47 locale (default: "en-IN")
 * @returns Formatted number string e.g. "1,23,456"
 */
export function formatNumber(value: number, locale: string = "en-IN"): string {
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Formats a number in compact notation.
 *
 * @example
 * formatNumberCompact(123456) // → "1.2L"
 * formatNumberCompact(4500)   // → "4.5K"
 */
export function formatNumberCompact(value: number): string {
  if (value >= 100_000) {
    return `${(value / 100_000).toFixed(1)}L`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return String(value);
}

// ── Dates ─────────────────────────────────────────────────────────────────
/**
 * Formats an ISO 8601 date string to a human-readable date.
 *
 * @param isoString - ISO 8601 date string
 * @param locale    - BCP 47 locale (default: "en-IN")
 * @returns Formatted date e.g. "17 Jul 2026"
 */
export function formatDate(
  isoString: string,
  locale: string = "en-IN"
): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(isoString));
}

/**
 * Formats an ISO 8601 date string to include time.
 *
 * @returns Formatted date+time e.g. "17 Jul 2026, 11:30 AM"
 */
export function formatDateTime(
  isoString: string,
  locale: string = "en-IN"
): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(isoString));
}

/**
 * Formats an ISO 8601 date string as a relative time expression.
 *
 * @param isoString - ISO 8601 date string
 * @param locale    - BCP 47 locale (default: "en")
 * @returns e.g. "2 hours ago", "in 3 days", "yesterday"
 */
export function formatRelativeTime(
  isoString: string,
  locale: string = "en"
): string {
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diffMs = then - now;
  const diffSeconds = Math.round(diffMs / 1_000);
  const diffMinutes = Math.round(diffSeconds / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);
  const diffWeeks = Math.round(diffDays / 7);
  const diffMonths = Math.round(diffDays / 30);
  const diffYears = Math.round(diffDays / 365);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  if (Math.abs(diffSeconds) < 60) return rtf.format(diffSeconds, "second");
  if (Math.abs(diffMinutes) < 60) return rtf.format(diffMinutes, "minute");
  if (Math.abs(diffHours) < 24) return rtf.format(diffHours, "hour");
  if (Math.abs(diffDays) < 7) return rtf.format(diffDays, "day");
  if (Math.abs(diffWeeks) < 4) return rtf.format(diffWeeks, "week");
  if (Math.abs(diffMonths) < 12) return rtf.format(diffMonths, "month");
  return rtf.format(diffYears, "year");
}

// ── Car-Specific ──────────────────────────────────────────────────────────
/**
 * Formats a vehicle year for display.
 * Returns the year as a string (no separator needed).
 */
export function formatYear(year: number): string {
  return String(year);
}

/**
 * Formats fuel economy.
 *
 * @param kmpl - Kilometres per litre
 * @returns e.g. "18.5 kmpl"
 */
export function formatFuelEconomy(kmpl: number): string {
  return `${kmpl.toFixed(1)} kmpl`;
}

/**
 * Formats engine displacement.
 *
 * @param cc - Engine displacement in cubic centimetres
 * @returns e.g. "1,997 cc"
 */
export function formatEngineCC(cc: number): string {
  return `${new Intl.NumberFormat("en-IN").format(cc)} cc`;
}
