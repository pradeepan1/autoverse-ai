import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Search, Home, CarFront } from "lucide-react";
import { ROUTES } from "@/lib/constants";

export function CarNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="w-32 h-32 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mb-8 relative">
        <CarFront className="w-16 h-16 text-[var(--text-muted)] absolute" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-[var(--bg-elevated)]/50 rounded-full" />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">
        Vehicle Not Found
      </h1>
      
      <p className="text-[var(--text-secondary)] max-w-md mb-8 text-lg">
        This vehicle is no longer available or the link may be broken. 
        It might have been sold or removed by the dealer.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Link href={ROUTES.SEARCH} className="w-full sm:w-auto">
          <Button variant="primary" size="lg" className="w-full flex items-center justify-center gap-2 shadow-lg shadow-[var(--gold)]/20">
            <Search className="w-5 h-5" />
            Browse Cars
          </Button>
        </Link>
        
        <Link href={ROUTES.HOME} className="w-full sm:w-auto">
          <Button variant="secondary" size="lg" className="w-full flex items-center justify-center gap-2">
            <Home className="w-5 h-5" />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
