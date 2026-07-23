import { CarDetails } from "../types";
import { cn } from "@/lib/utils/cn";

interface SpecificationsProps {
  car: CarDetails;
}

export function Specifications({ car }: SpecificationsProps) {
  const f = car.features || {};

  const specs = [
    { label: "Engine", value: f.engine },
    { label: "Horsepower", value: f.horsepower },
    { label: "Torque", value: f.torque },
    { label: "Body Style", value: car.car_model?.body_style },
    { label: "Drive Type", value: f.drive_type },
    { label: "Doors", value: f.doors ? `${f.doors} Doors` : undefined },
    { label: "Seats", value: f.seats ? `${f.seats} Seats` : undefined },
    { label: "Fuel Tank Capacity", value: f.fuel_tank_capacity },
  ];

  return (
    <section id="specifications" className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Technical Specifications</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-4">
        {specs.map((spec, idx) => (
          <div 
            key={idx} 
            className={cn(
              "flex justify-between items-center py-3 border-b border-[var(--border-color)]",
              "group hover:bg-[var(--bg-secondary)] -mx-2 px-2 rounded-md transition-colors"
            )}
          >
            <span className="text-[var(--text-secondary)] font-medium">{spec.label}</span>
            <span className="text-[var(--text-primary)] font-semibold text-right">
              {spec.value || "Not Available"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
