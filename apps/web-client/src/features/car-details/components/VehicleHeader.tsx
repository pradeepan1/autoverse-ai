import { CarDetails } from "../types";
import { formatCurrency, formatNumber } from "@/lib/utils/format";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, Tag } from "lucide-react";

interface VehicleHeaderProps {
  car: CarDetails;
}

export function VehicleHeader({ car }: VehicleHeaderProps) {
  const maskedVin = car.vin ? `•••• •••• •••• ${car.vin.slice(-4)}` : "N/A";
  
  const title = `${car.year} ${car.brand?.name || "Unknown Brand"} ${car.car_model?.name || ""}`.trim();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-bold tracking-widest uppercase text-[var(--accent)]">
              {car.brand?.name}
            </span>
            {car.condition && (
              <Badge variant={car.condition.toLowerCase() === "new" ? "success" : "info"} className="uppercase tracking-wider text-[10px]">
                {car.condition}
              </Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] mt-2 font-medium">
            {car.car_model?.body_style || "Premium Vehicle"} • {car.mileage === 0 ? "New" : `${formatNumber(car.mileage)} km`}
          </p>
        </div>
        
        <div className="flex flex-col md:items-end">
          <div className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
            {formatCurrency(car.price, "INR")}
          </div>
          <p className="text-sm text-[var(--text-muted)] mt-1 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            Ex-Showroom Price
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-[var(--border-color)]">
        <div className="flex flex-col">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Fuel Type</span>
          <span className="font-semibold text-[var(--text-primary)]">{car.fuel_type}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Transmission</span>
          <span className="font-semibold text-[var(--text-primary)]">{car.transmission}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Exterior</span>
          <span className="font-semibold text-[var(--text-primary)]">{car.exterior_color || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Interior</span>
          <span className="font-semibold text-[var(--text-primary)]">{car.interior_color || "N/A"}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] bg-[var(--bg-secondary)] w-fit px-3 py-1.5 rounded-md border border-[var(--border-color)]">
        <ShieldCheck className="w-4 h-4 text-[var(--success)]" />
        <span className="font-medium text-[var(--text-primary)]">VIN:</span> 
        <span className="font-mono tracking-widest">{maskedVin}</span>
      </div>
    </div>
  );
}
