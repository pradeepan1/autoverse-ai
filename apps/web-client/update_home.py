import re

def update_file():
    with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
        
    # 1. Imports
    imports_to_add = """
import { getCars } from "@/features/listings/api/cars";
import { getCategories, Category } from "@/features/listings/api/categories";
import { Car } from "@/features/listings/types/car";
"""
    content = content.replace('import { cn } from "@/lib/utils/cn";', 'import { cn } from "@/lib/utils/cn";' + imports_to_add)
    
    # 2. State
    state_to_add = """
  const [cars, setCars] = useState<Car[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);
"""
    content = content.replace('const statsVisible = useIntersection(statsRef);', 'const statsVisible = useIntersection(statsRef);' + state_to_add)
    
    # 3. Cars Map
    old_cars_map = """            {FEATURED_CARS.map((car) => (
              <article
                key={car.id}
                className="group rounded-2xl border border-[var(--border-color)] bg-[var(--bg-elevated)] overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-[var(--bg-secondary)]">
                  <Image
                    src={car.image}
                    alt={car.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <Badge variant={car.badgeVariant}>{car.badge}</Badge>
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
                      {car.name}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1 uppercase tracking-wide font-medium">
                      {car.category}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Gearbox", value: car.transmission },
                      { label: "Fuel", value: car.fuel },
                      { label: "Driven", value: car.mileage },
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
                        {car.price}
                      </div>
                    </div>
                    <Link href={ROUTES.REGISTER}>
                      <Button variant="primary" size="sm" className="rounded-lg">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}"""

    new_cars_map = """            {(isLoading ? Array(3).fill(null) : cars).map((car, idx) => {
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
            })}"""
            
    content = content.replace(old_cars_map, new_cars_map)
    
    # 4. Categories Map
    old_cats_map = """            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={ROUTES.SEARCH}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] block shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Image
                  src={cat.image}
                  alt={cat.imageAlt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-white/65 text-xs mt-0.5 font-medium">
                    {cat.count}
                  </p>
                </div>
                {/* Hover arrow */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.75" className="w-4 h-4" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h8M9 5l3 3-3 3" />
                  </svg>
                </div>
              </Link>
            ))}"""

    new_cats_map = """            {(isLoading ? Array(4).fill(null) : categories).map((cat, idx) => {
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
            )})}"""
            
    content = content.replace(old_cats_map, new_cats_map)
    
    with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    update_file()
    print("Done")
