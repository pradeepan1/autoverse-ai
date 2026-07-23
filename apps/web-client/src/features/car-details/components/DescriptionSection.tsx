import { CarDetails } from "../types";
import { CheckCircle2, History, Wrench } from "lucide-react";

interface DescriptionSectionProps {
  car: CarDetails;
}

export function DescriptionSection({ car }: DescriptionSectionProps) {
  const f = car.features || {};

  return (
    <div className="space-y-10">
      <section id="description" className="scroll-mt-24">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Vehicle Overview</h2>
        <div className="text-[var(--text-secondary)] leading-relaxed space-y-4">
          {f.description ? (
            <p>{f.description}</p>
          ) : (
            <p>
              Experience the unmatched luxury and performance of the {car.year} {car.brand?.name} {car.car_model?.name}. 
              This meticulously maintained vehicle offers a perfect blend of style, comfort, and advanced engineering. 
              Finished in {car.exterior_color || "a premium exterior"} with a complementary {car.interior_color || "luxurious"} interior, 
              it stands out in any setting. With only {car.mileage} km on the odometer, it represents an exceptional opportunity to own a premium vehicle.
            </p>
          )}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Key Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(f.highlights || ["Premium Audio System", "Advanced Driver Assistance", "Panoramic Sunroof", "Leather Upholstery"]).map((highlight: string, idx: number) => (
            <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--gold)]/30 transition-colors">
              <CheckCircle2 className="w-5 h-5 text-[var(--success)] flex-shrink-0 mt-0.5" />
              <span className="font-medium text-[var(--text-primary)]">{highlight}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-elevated)] flex flex-col items-center text-center gap-2 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--accent)] mb-2">
            <span className="text-xl font-bold">{f.owner_count || 1}</span>
          </div>
          <h4 className="font-bold text-[var(--text-primary)]">Previous Owners</h4>
          <p className="text-sm text-[var(--text-muted)]">Verified ownership history</p>
        </div>

        <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-elevated)] flex flex-col items-center text-center gap-2 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--accent)] mb-2">
            <History className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-[var(--text-primary)]">Service History</h4>
          <p className="text-sm text-[var(--text-muted)]">{f.service_history || "Full Authorized Dealer Service"}</p>
        </div>

        <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-elevated)] flex flex-col items-center text-center gap-2 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--accent)] mb-2">
            <Wrench className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-[var(--text-primary)]">Inspection</h4>
          <p className="text-sm text-[var(--text-muted)]">{f.inspection_status || "150-Point Certified Passed"}</p>
        </div>
      </section>
    </div>
  );
}
