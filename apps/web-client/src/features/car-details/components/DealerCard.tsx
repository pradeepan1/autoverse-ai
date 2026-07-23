import { Building2, MapPin, BadgeCheck, Phone, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CarDetails } from "../types";

interface DealerCardProps {
  car: CarDetails;
}

export function DealerCard({ car }: DealerCardProps) {
  // Use placeholder info since backend dealer model currently only returns id
  const dealerName = "Premium Motors Select";
  const city = "Mumbai";
  const state = "Maharashtra";

  return (
    <div className="rounded-2xl p-6 bg-[var(--bg-elevated)] border border-[var(--border-color)] shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--gold)]/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      
      <div className="flex items-start gap-4 relative z-10">
        <div className="w-16 h-16 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center flex-shrink-0 border border-[var(--border-color)]">
          <Building2 className="w-8 h-8 text-[var(--text-muted)]" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            <h3 className="font-bold text-lg text-[var(--text-primary)]">{dealerName}</h3>
            <BadgeCheck className="w-5 h-5 text-[var(--accent)]" />
          </div>
          
          <div className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
            <MapPin className="w-4 h-4" />
            <span>{city}, {state}</span>
          </div>
          
          <div className="mt-2 text-xs font-medium text-[var(--success)] bg-[var(--success)]/10 px-2 py-1 rounded w-fit">
            Verified Premium Dealer
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6 relative z-10">
        <Button variant="secondary" className="w-full flex items-center gap-2">
          <Phone className="w-4 h-4" />
          Contact
        </Button>
        <Button variant="ghost" className="w-full flex items-center gap-2 border border-[var(--border-color)]">
          View Profile
          <ArrowUpRight className="w-4 h-4" />
        </Button>
      </div>
      
      <p className="text-xs text-[var(--text-muted)] mt-4 text-center">
        ID: {car.dealer_id}
      </p>
    </div>
  );
}
