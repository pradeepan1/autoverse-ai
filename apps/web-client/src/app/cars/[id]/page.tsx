"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ImageGallery } from "@/features/car-details/components/ImageGallery";
import { VehicleHeader } from "@/features/car-details/components/VehicleHeader";
import { Specifications } from "@/features/car-details/components/Specifications";
import { DescriptionSection } from "@/features/car-details/components/DescriptionSection";
import { DealerCard } from "@/features/car-details/components/DealerCard";
import { RelatedCars } from "@/features/car-details/components/RelatedCars";
import { StickyActions } from "@/features/car-details/components/StickyActions";
import { CarDetailsSkeleton } from "@/features/car-details/components/CarDetailsSkeleton";
import { CarNotFound } from "@/features/car-details/components/CarNotFound";
import { useCarDetails } from "@/features/car-details/hooks/useCarDetails";
import { useToast } from "@/components/providers/ToastProvider";
import { ROUTES } from "@/lib/constants";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: car, isLoading, error, refetch } = useCarDetails(id);
  const { toast } = useToast();

  const handleShare = async () => {
    if (!car) return;
    
    const url = window.location.href;
    const title = `${car.year} ${car.brand?.name} ${car.car_model?.name}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out this ${title}`,
          url,
        });
        toast({ variant: "success", title: "Shared successfully" });
      } catch (err) {
        // user cancelled or share failed
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast({ variant: "success", title: "Link copied to clipboard" });
      } catch (err) {
        toast({ variant: "error", title: "Failed to copy link" });
      }
    }
  };

  if (isLoading) {
    return <CarDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
        <Alert variant="error" title="Error Loading Vehicle">
          {error}
        </Alert>
        <Button onClick={refetch} variant="primary" className="mt-6">
          Try Again
        </Button>
      </div>
    );
  }

  if (!car) {
    return <CarNotFound />;
  }

  const breadcrumbs = [
    { label: "Home", href: ROUTES.HOME },
    { label: "Buy", href: ROUTES.SEARCH },
    { label: car.brand?.name || "Brand", href: `${ROUTES.SEARCH}?brand=${car.brand?.slug}` },
    { label: car.car_model?.name || "Model" }
  ];

  const title = `${car.year} ${car.brand?.name} ${car.car_model?.name}`.trim();

  return (
    <div className="min-h-screen pt-24 pb-12 animate-in fade-in duration-500">
      <div className="av-container">
        
        <Breadcrumbs items={breadcrumbs} className="mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative items-start">
          
          {/* Main Left Column */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* Gallery */}
            <section>
              <ImageGallery images={car.images || []} title={title} />
            </section>

            {/* Header / Core Info */}
            <section>
              <VehicleHeader car={car} />
            </section>

            {/* Description */}
            <DescriptionSection car={car} />

            {/* Specifications */}
            <Specifications car={car} />
            
          </div>

          {/* Sidebar Right Column */}
          <div className="lg:col-span-4 sticky top-24 flex flex-col gap-8">
            <StickyActions car={car} onShareClick={handleShare} />
            
            <section>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 px-2">Dealer Information</h3>
              <DealerCard car={car} />
            </section>
          </div>
          
        </div>

        {/* Related Vehicles */}
        <RelatedCars currentCar={car} />

      </div>
    </div>
  );
}
