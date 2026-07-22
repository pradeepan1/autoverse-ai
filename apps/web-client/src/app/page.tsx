"use client";

/**
 * AutoVerse AI — Landing Page (Rebranded to Capo Cars)
 *
 * Premium production-quality automotive landing page.
 * Luxury aesthetic inspired by Tesla, Porsche, BMW, Carvana.
 *
 * Sections:
 *  1. Hero
 *  2. Statistics
 *  3. Featured Cars
 *  4. Browse by Category
 *  5. AI Recommendation Feature
 *  6. Why Choose Capo Cars
 *  7. Customer Testimonials
 *  8. FAQ Accordion
 *  9. Newsletter
 *
 * Per docs/UI_UX_Guidelines.md §13 (Glassmorphism), §14 (Dark Mode), §15 (Light Mode).
 */

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/components/providers/ToastProvider";
import { Button, Badge, Input } from "@/components/ui";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";
import { getCars } from "@/features/listings/api/cars";
import { getCategories, Category } from "@/features/listings/api/categories";
import { Car } from "@/features/listings/types/car";


// ── Data ───────────────────────────────────────────────────────────────────

const FEATURED_CARS = [
  {
    id: "car-1",
    name: "Tesla Model S Plaid",
    category: "Electric · Sedan",
    year: 2024,
    transmission: "Auto",
    fuel: "Electric",
    mileage: "0 km",
    price: "₹1,22,00,000",
    badge: "Hot Deal" as const,
    badgeVariant: "success" as const,
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
    imageAlt: "2024 Tesla Model S Plaid in white, side profile",
  },
  {
    id: "car-2",
    name: "Porsche 911 GT3",
    category: "Sports · Coupe",
    year: 2023,
    transmission: "PDK",
    fuel: "Petrol",
    mileage: "4,500 km",
    price: "₹2,75,00,000",
    badge: "Trending" as const,
    badgeVariant: "info" as const,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    imageAlt: "2023 Porsche 911 GT3 in silver, front three-quarter view",
  },
  {
    id: "car-3",
    name: "BMW M4 Competition",
    category: "Performance · Coupe",
    year: 2024,
    transmission: "M DCT",
    fuel: "Petrol",
    mileage: "1,200 km",
    price: "₹1,45,00,000",
    badge: "New" as const,
    badgeVariant: "warning" as const,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    imageAlt: "2024 BMW M4 Competition in blue, dynamic shot",
  },
];

const CATEGORIES = [
  {
    name: "SUVs",
    count: "3,420+ Listings",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
    imageAlt: "Luxury SUV on mountain road",
  },
  {
    name: "Sedans",
    count: "2,840+ Listings",
    image:
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600&q=80",
    imageAlt: "Premium sedan on city street",
  },
  {
    name: "Sports Cars",
    count: "1,150+ Listings",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80",
    imageAlt: "Red sports car on racetrack",
  },
  {
    name: "Electric",
    count: "980+ Listings",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80",
    imageAlt: "Electric vehicle charging at station",
  },
];

const WHY_FEATURES = [
  {
    title: "AI Price Predictor",
    description:
      "Our ML engine analyses historical sales, depreciation curves, and real-time demand to generate a fair-deal score before you negotiate.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: "Verified Dealerships",
    description:
      "Every listing is backed by documented ownership history and dealer certification — reducing fraud risk to near zero.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Side-by-Side Compare",
    description:
      "Compare up to 4 vehicles simultaneously — performance, dimensions, safety ratings, ownership costs, and resale projections.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    title: "Instant Car Rentals",
    description:
      "Book from a curated fleet of self-drive and chauffeur vehicles — hourly, daily, or monthly, with zero hidden charges.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    title: "Personalised AI Picks",
    description:
      "Tell our AI your budget, lifestyle, and preferences — receive a curated shortlist ranked by fit score within seconds.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    title: "White-Glove Support",
    description:
      "Dedicated relationship managers assist with test drives, RC transfer paperwork, and post-purchase documentation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
];

const TESTIMONIALS = [
  {
    quote:
      "The AI price predictor saved me over ₹1.8 lakh on my pre-owned BMW. I walked into the dealer knowing the exact fair value — complete confidence.",
    author: "Rohan Sharma",
    role: "Verified Buyer",
    location: "Bengaluru",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
  },
  {
    quote:
      "Listing inventory is seamless. Lead analytics, comparison tags, and real-time pricing intelligence have doubled our monthly conversions.",
    author: "Vikram Mehta",
    role: "Dealer Principal",
    location: "Signature Motors, Mumbai",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80",
    rating: 5,
  },
  {
    quote:
      "Found my dream Tesla in under 20 minutes. The AI recommendation surfaced exactly what I needed based on my daily commute and budget.",
    author: "Priya Nair",
    role: "Verified Buyer",
    location: "Hyderabad",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
  },
];

const FAQS = [
  {
    question: "How does the AI Price Prediction system calculate vehicle values?",
    answer:
      "Our machine learning model is trained on millions of transaction records, depreciation curves, regional registration costs, brand demand indices, and mileage-wear data. It generates a fair-deal score and predicted resale value with 94% accuracy across 200+ car models.",
  },
  {
    question: "Is Capo Cars free for car buyers?",
    answer:
      "Yes. Search, wishlist, AI recommendations, side-by-side comparisons, and market intelligence are completely free for buyers. There are no hidden subscription charges.",
  },
  {
    question: "How do I list vehicles as an authorised dealer?",
    answer:
      "Create a Dealer account, upload your GSTIN and dealer registration documents for verification, and unlock inventory sync, lead management, and analytics dashboards — typically approved within 24 hours.",
  },
  {
    question: "What documents are required to complete a purchase?",
    answer:
      "Our support team guides you through every step — from RC transfer and NOC collection to hypothecation removal and insurance transfer. All paperwork is handled with dedicated coordinator support.",
  },
  {
    question: "Do you offer financing or EMI options?",
    answer:
      "We partner with leading banks and NBFCs to offer pre-approved financing. Get an EMI quote in under 60 seconds from your listing page with zero credit score impact.",
  },
];

const STATS = [
  { value: "12,450+", label: "Active Listings" },
  { value: "150K+", label: "AI Predictions Run" },
  { value: "480+", label: "Partner Dealerships" },
  { value: "₹240Cr+", label: "Transaction Value" },
];

// ── Section title component ────────────────────────────────────────────────
function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = false,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-3", center && "text-center items-center")}>
      {eyebrow && (
        <span
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.15em]",
            light ? "text-[var(--accent)] opacity-80" : "text-[var(--accent)]"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl font-bold tracking-tight",
          light ? "text-white" : "text-[var(--text-primary)]"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-base md:text-lg leading-relaxed max-w-2xl",
            light ? "text-white/70" : "text-[var(--text-secondary)]"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── Star rating ────────────────────────────────────────────────────────────
function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 16 16"
          fill={i < count ? "#f59e0b" : "none"}
          stroke={i < count ? "#f59e0b" : "#d1d5db"}
          className="w-4 h-4"
          aria-hidden="true"
        >
          <path d="M8 1l1.85 3.748L14 5.451l-3 2.925.708 4.124L8 10.25l-3.708 2.25L5 8.376 2 5.451l4.15-.703L8 1z" />
        </svg>
      ))}
    </div>
  );
}

// ── Counter animation hook ─────────────────────────────────────────────────
function useIntersection(ref: React.RefObject<Element>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return visible;
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function LandingPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const statsRef = useRef<HTMLDivElement>(null);
  const statsVisible = useIntersection(statsRef);
  const [cars, setCars] = useState<Car[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [carsRes, catsRes] = await Promise.all([
          getCars({ limit: 3 }),
          getCategories()
        ]);
        setCars(carsRes.items.slice(0, 3));
        setCategories(catsRes);
      } catch (err) {
        console.error(err);
        setError("Failed to load featured vehicles.");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      variant: "info",
      title: "Search",
      description: `Searching for "${searchQuery || "all vehicles"}"`,
    });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ variant: "error", title: "Invalid Email", description: "Please enter a valid email address." });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setNewsletterSuccess(true);
      toast({ variant: "success", title: "Subscribed!", description: "Weekly market insights are on their way." });
    }, 1200);
  };

  return (
    <div className="flex flex-col">
      {/* ── 1. Hero Section ───────────────────────────────────────────────── */}
      <section
        id="main-content"
        className="relative w-full min-h-screen flex items-center overflow-hidden -mt-16"
        aria-label="Hero"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=90"
            alt="Luxury sports car on an open road at dusk"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 hero-overlay" />
          {/* Subtle dot grid */}
          <div className="absolute inset-0 bg-grid-dots opacity-30" />
        </div>

        {/* Content */}
        <div className="relative z-10 av-container pt-32 pb-24 flex flex-col items-start gap-8 max-w-4xl">
          {/* Eyebrow */}
          <div className="animate-fade-up inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse flex-shrink-0" />
            <span className="text-white/90 text-xs font-semibold uppercase tracking-widest">
              Next-Generation Automotive Intelligence
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up delay-100 text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight">
            Find Your Perfect Car
            <br />
            with <span className="text-gradient-accent">Capo Cars.</span>
          </h1>

          {/* Sub-headline */}
          <p className="animate-fade-up delay-200 text-lg md:text-xl text-white/75 max-w-xl leading-relaxed">
            An AI-powered premium marketplace for buying, selling, comparing, renting, and predicting car prices.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="animate-fade-up delay-300 w-full max-w-2xl"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-5 h-5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by make, model, or budget..."
                  className="w-full h-14 pl-12 pr-4 rounded-xl bg-white/95 backdrop-blur-sm text-gray-900 text-base placeholder:text-gray-400 border-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="h-14 px-8 rounded-xl text-base font-semibold whitespace-nowrap shadow-lg shadow-[var(--accent)]/30"
              >
                Search
              </Button>
            </div>
          </form>

          {/* CTA Buttons */}
          <div className="animate-fade-up delay-400 flex flex-col sm:flex-row gap-4">
            <Link href={ROUTES.SEARCH}>
              <Button
                variant="primary"
                size="lg"
                className="h-12 px-8 rounded-xl font-semibold shadow-lg shadow-[var(--accent)]/25 text-white dark:text-black"
              >
                Explore Cars
              </Button>
            </Link>
            <Link href={ROUTES.REGISTER}>
              <button className="h-12 px-8 rounded-xl text-base font-semibold text-white border border-white/30 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
                AI Price Prediction
              </button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="animate-fade-up delay-500 flex flex-wrap items-center gap-6 pt-2">
            {[
              { label: "12,450+ Cars" },
              { label: "480+ Verified Dealers" },
              { label: "No Hidden Fees" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-white/70 text-sm">
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-[var(--accent)] flex-shrink-0" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm3.844-8.791a.75.75 0 00-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 10-1.114 1.004l2.25 2.5a.75.75 0 001.15-.083l4.25-5.5z" clipRule="evenodd" />
                </svg>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-6 h-6 opacity-50" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      {/* ── 2. Statistics Section ─────────────────────────────────────────── */}
      <section
        ref={statsRef}
        className="bg-[var(--bg-secondary)] border-y border-[var(--border-color)] py-16"
        aria-label="Statistics"
      >
        <div className="av-container">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className={cn(
                  "text-center transition-all duration-700",
                  statsVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)] mb-2">
                  {stat.label}
                </dt>
                <dd className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] tabular-nums">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 3. Featured Cars Section ──────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg-primary)]" aria-labelledby="featured-heading">
        <div className="av-container flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionTitle
              eyebrow="Curated Collection"
              title="Featured Vehicles"
              subtitle="Hand-picked premium listings from India's most trusted dealerships."
            />
            <Link href={ROUTES.SEARCH}>
              <Button variant="secondary" size="md">
                View All Listings
              </Button>
            </Link>
          </div>

          {error ? (
            <div className="flex flex-col items-center justify-center p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500">
              <p>{error}</p>
            </div>
          ) : !isLoading && cars.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-2xl">
              <p className="text-[var(--text-secondary)]">No featured vehicles available at the moment.</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(isLoading ? Array(3).fill(null) : cars).map((car, idx) => {
              if (!car) return <div key={idx} className="h-96 rounded-2xl bg-[var(--bg-elevated)] animate-pulse" />;
              
              const p_car = FEATURED_CARS[idx % FEATURED_CARS.length];
              
              return (
              <article
                key={car.id}
                className="group rounded-2xl border border-[var(--border-color)] bg-[var(--bg-elevated)] overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-[var(--bg-secondary)]">
                  <Image
                    src={p_car.image}
                    alt={p_car.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <Badge variant={p_car.badgeVariant}>{p_car.badge}</Badge>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-mono bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-md">
                      {car.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-4 flex-1">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] leading-tight">
                      {car.features?.title || `${car.year} ${car.car_model?.name}`}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1 uppercase tracking-wide font-medium truncate">
                      {car.fuel_type} · {car.transmission}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Gearbox", value: car.transmission },
                      { label: "Fuel", value: car.fuel_type },
                      { label: "Driven", value: `${car.mileage.toLocaleString('en-IN')} km` },
                    ].map((spec) => (
                      <div
                        key={spec.label}
                        className="bg-[var(--bg-secondary)] rounded-lg p-2.5 text-center"
                      >
                        <div className="text-[10px] uppercase tracking-wide font-semibold text-[var(--text-muted)]">
                          {spec.label}
                        </div>
                        <div className="text-xs font-semibold text-[var(--text-primary)] mt-1 truncate">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)] mt-auto">
                    <div>
                      <div className="text-[10px] uppercase tracking-wide text-[var(--text-muted)] font-semibold">
                        Expected Price
                      </div>
                      <div className="text-xl font-bold text-[var(--text-primary)] tabular-nums mt-0.5">
                        ₹{car.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <Link href={`/cars/${car.id}`}>
                      <Button variant="primary" size="sm" className="rounded-lg">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
              );
            })}
          </div>
          )}
        </div>
      </section>

      {/* ── 4. Browse by Category ─────────────────────────────────────────── */}
      <section
        className="py-24 bg-[var(--bg-secondary)]"
        aria-labelledby="categories-heading"
      >
        <div className="av-container flex flex-col gap-12">
          <SectionTitle
            eyebrow="Explore"
            title="Browse by Category"
            subtitle="Select your preferred body type to discover a curated collection of verified vehicles."
            center
          />

          {error ? (
            <div className="flex flex-col items-center justify-center p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500">
              <p>Failed to load categories.</p>
            </div>
          ) : !isLoading && categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-2xl">
              <p className="text-[var(--text-secondary)]">No categories available at the moment.</p>
            </div>
          ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {(isLoading ? Array(4).fill(null) : categories).map((cat, idx) => {
              if (!cat) return <div key={idx} className="aspect-[4/3] rounded-2xl bg-[var(--bg-elevated)] animate-pulse" />;
              
              const p_cat = CATEGORIES[idx % CATEGORIES.length];

              return (
              <Link
                key={cat.id}
                href={`/search?category=${cat.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] block shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Image
                  src={p_cat.image}
                  alt={p_cat.imageAlt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-white/65 text-xs mt-0.5 font-medium truncate">
                    {cat.description || "Explore Vehicles"}
                  </p>
                </div>
                {/* Hover arrow */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.75" className="w-4 h-4" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h8M9 5l3 3-3 3" />
                  </svg>
                </div>
              </Link>
            )})}
          </div>
          )}
        </div>
      </section>

      {/* ── 5. AI Recommendation Feature Section ─────────────────────────── */}
      <section
        id="ai-recommendation"
        className="py-24 bg-[var(--bg-primary)] overflow-hidden"
        aria-labelledby="ai-heading"
      >
        <div className="av-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — text */}
            <div className="flex flex-col gap-8">
              <SectionTitle
                eyebrow="Powered by Machine Learning"
                title="Your AI Car Advisor"
                subtitle="Tell us your lifestyle, daily distance, and budget. Our AI cross-references 200+ car parameters to surface the perfect match — in seconds."
              />

              <ul className="flex flex-col gap-4">
                {[
                  "Analyses 12 million+ data points monthly",
                  "Personalised shortlist ranked by lifestyle fit",
                  "Real-time price fairness scoring",
                  "Resale value projection for 5 years",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 12 12" fill="currentColor" className="w-3 h-3 text-[var(--accent)]" aria-hidden="true">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                    </span>
                    <span className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-4">
                <Link href={ROUTES.REGISTER}>
                  <Button variant="primary" size="lg" className="rounded-xl">
                    Try AI Recommendations
                  </Button>
                </Link>
                <Link href={ROUTES.SEARCH}>
                  <Button variant="secondary" size="lg" className="rounded-xl">
                    Browse Manually
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right — car showroom image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=900&q=85"
                  alt="Car dealership showroom with luxury vehicles under bright lights"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent" />
              </div>

              {/* Floating AI chip */}
              <div className="absolute -bottom-5 -left-5 glass rounded-2xl p-4 flex items-center gap-3 shadow-xl border border-[var(--border-color)] max-w-[220px]">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white" aria-hidden="true">
                    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-[var(--text-primary)]">AI Match Found</div>
                  <div className="text-[10px] text-[var(--text-muted)] mt-0.5">98% fit score</div>
                </div>
              </div>

              {/* Floating stats chip */}
              <div className="absolute -top-5 -right-5 glass rounded-2xl p-4 shadow-xl border border-[var(--border-color)]">
                <div className="text-2xl font-bold text-[var(--text-primary)] tabular-nums">150K+</div>
                <div className="text-[10px] text-[var(--text-muted)] mt-0.5 uppercase tracking-wide font-semibold">Predictions Run</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Why Choose Capo Cars ───────────────────────────────────────── */}
      <section
        className="py-24 bg-[var(--bg-secondary)]"
        aria-labelledby="why-heading"
      >
        <div className="av-container flex flex-col gap-14">
          <SectionTitle
            eyebrow="Why Capo Cars"
            title="Built for Smarter Decisions"
            subtitle="We bring intelligence, transparency, and trust to every step of the automotive journey."
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_FEATURES.map((feat, idx) => (
              <div
                key={feat.title}
                className={cn(
                  "group relative rounded-2xl p-7 border border-[var(--border-color)] bg-[var(--bg-elevated)]",
                  "hover:border-[var(--accent)]/40 hover:shadow-lg transition-all duration-300",
                  idx === 4 && "md:col-span-2 lg:col-span-1"
                )}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-5 group-hover:bg-[var(--accent)]/15 transition-colors duration-200">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Interior / Experience Image Break ─────────────────────────── */}
      <section
        className="relative h-[50vh] min-h-[380px] flex items-center overflow-hidden"
        aria-hidden="true"
      >
        <Image
          src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1600&q=85"
          alt="Premium car interior with ambient lighting and leather seats"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative av-container z-10">
          <p className="text-white/50 text-xs uppercase tracking-[0.2em] mb-3">
            Premium Experience
          </p>
          <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight max-w-md">
            Every detail matters.
          </h2>
          <p className="text-white/65 mt-4 text-lg max-w-sm leading-relaxed">
            From first search to final handshake — we own every step of your journey.
          </p>
        </div>
      </section>

      {/* ── 8. Customer Testimonials ──────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg-primary)]" aria-labelledby="testimonials-heading">
        <div className="av-container flex flex-col gap-14">
          <SectionTitle
            eyebrow="Testimonials"
            title="Trusted by 50,000+ Drivers"
            subtitle="Hear from buyers and dealers who make smarter decisions with Capo Cars."
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {TESTIMONIALS.map((t, idx) => (
              <blockquote
                key={idx}
                className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-elevated)] p-7 flex flex-col gap-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <Stars count={t.rating} />
                <p className="text-[var(--text-primary)] text-sm leading-relaxed flex-1 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="flex items-center gap-3 border-t border-[var(--border-color)] pt-5">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-[var(--bg-secondary)]">
                    <Image
                      src={t.avatar}
                      alt={`Portrait of ${t.author}`}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <cite className="not-italic text-sm font-semibold text-[var(--text-primary)] block">
                      {t.author}
                    </cite>
                    <span className="text-xs text-[var(--text-muted)]">
                      {t.role} &middot; {t.location}
                    </span>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FAQ Section ────────────────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg-secondary)]" aria-labelledby="faq-heading">
        <div className="av-container max-w-3xl mx-auto flex flex-col gap-12">
          <SectionTitle
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            subtitle="Clear answers to the questions we hear most often."
            center
          />

          <div className="flex flex-col gap-3" role="list">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  role="listitem"
                  className={cn(
                    "rounded-2xl border overflow-hidden transition-all duration-200",
                    isOpen
                      ? "border-[var(--accent)]/30 bg-[var(--bg-elevated)] shadow-sm"
                      : "border-[var(--border-color)] bg-[var(--bg-elevated)]"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-5 text-left gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-inset rounded-2xl"
                  >
                    <span className="font-semibold text-sm md:text-base text-[var(--text-primary)] leading-snug">
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200",
                        isOpen
                          ? "bg-[var(--accent)] text-white rotate-45"
                          : "bg-[var(--bg-secondary)] text-[var(--text-muted)]"
                      )}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                        <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "max-h-64" : "max-h-0"
                    )}
                  >
                    <p className="px-5 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 10. Newsletter Section ────────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg-primary)]" aria-labelledby="newsletter-heading">
        <div className="av-container max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white p-10 md:p-16 flex flex-col gap-8 items-center text-center shadow-2xl">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=1200&q=70"
                alt="Customer shaking hands at car dealership"
                fill
                className="object-cover opacity-20"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/95 to-red-950/60" />
              <div className="absolute inset-0 bg-grid-dots opacity-20" />
            </div>

            <div className="relative z-10 flex flex-col gap-3 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">
                Market Intelligence
              </span>
              <h2 id="newsletter-heading" className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Stay Ahead of the Market
              </h2>
              <p className="text-white/65 text-base leading-relaxed">
                Weekly price insights, direct dealer promotions, and AI model
                accuracy updates — delivered every Monday.
              </p>
            </div>

            {newsletterSuccess ? (
              <div className="relative z-10 flex items-center gap-3 bg-green-500/15 border border-green-500/30 text-green-300 px-6 py-4 rounded-2xl">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">
                  You&apos;re subscribed. Weekly insights are on their way.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="relative z-10 flex flex-col sm:flex-row gap-3 w-full max-w-md"
              >
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:ring-white/40 flex-1"
                />
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={submitting}
                  className="whitespace-nowrap rounded-xl"
                >
                  Subscribe
                </Button>
              </form>
            )}

            <p className="relative z-10 text-white/35 text-xs">
              No spam. Unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
