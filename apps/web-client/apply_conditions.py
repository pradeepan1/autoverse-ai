import re

def update_cars_page():
    with open('src/app/cars/page.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # Update CarList to remove client-side sorting and just pass sort to getCars
    old_params_logic = """    const params: Record<string, string> = {};
    Object.keys(searchParams).forEach(key => {
      if (typeof searchParams[key] === 'string' && searchParams[key]) {
        params[key] = searchParams[key];
      }
    });

    const data = await getCars(params);
    let cars = data.items;

    // Client-side fallback sorting if backend doesn't support 'sort' explicitly
    const sort = params.sort;
    if (sort) {
      cars = [...cars].sort((a, b) => {
        if (sort === 'price_asc') return a.price - b.price;
        if (sort === 'price_desc') return b.price - a.price;
        if (sort === 'mileage_asc') return a.mileage - b.mileage;
        if (sort === 'mileage_desc') return b.mileage - a.mileage;
        if (sort === 'newest') return b.year - a.year;
        if (sort === 'oldest') return a.year - b.year;
        return 0;
      });
    }"""
    
    new_params_logic = """    const params: Record<string, string> = {};
    Object.keys(searchParams).forEach(key => {
      if (typeof searchParams[key] === 'string' && searchParams[key]) {
        params[key] = searchParams[key];
      }
    });

    // Pass the sort parameter directly to the backend
    const data = await getCars(params);
    const cars = data.items;
    const sort = params.sort;"""
    
    content = content.replace(old_params_logic, new_params_logic)
    
    with open('src/app/cars/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)

def update_quick_view_modal():
    with open('src/features/listings/components/QuickViewModal.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove duplicated gallery images
    old_gallery_logic = """  // Simulate a gallery if the backend only has 1 image
  const gallery = car.images?.length > 1 
    ? car.images 
    : [
        { id: '1', image_url: fallbackUrl },
        { id: '2', image_url: fallbackUrl },
        { id: '3', image_url: fallbackUrl },
        { id: '4', image_url: fallbackUrl },
      ];"""
      
    new_gallery_logic = """  // Ensure we have an array of images to display
  const gallery = car.images && car.images.length > 0 
    ? car.images 
    : [{ id: 'fallback', image_url: fallbackUrl, is_primary: true, display_order: 0, car_id: car.id }];"""
    
    content = content.replace(old_gallery_logic, new_gallery_logic)
    
    with open('src/features/listings/components/QuickViewModal.tsx', 'w', encoding='utf-8') as f:
        f.write(content)

def update_car_card():
    with open('src/features/listings/components/CarCard.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # Add useLocalStorage import
    content = content.replace(
        "import { useState } from 'react';", 
        "import { useState } from 'react';\nimport { useLocalStorage } from '@/lib/hooks/useLocalStorage';"
    )
    
    # Replace isWishlisted state with useLocalStorage
    old_state = "const [isWishlisted, setIsWishlisted] = useState(false);"
    new_state = "const [wishlist, setWishlist] = useLocalStorage<string[]>('capo-wishlist', []);\n  const isWishlisted = wishlist.includes(car.id);\n\n  const toggleWishlist = () => {\n    if (isWishlisted) {\n      setWishlist(wishlist.filter(id => id !== car.id));\n    } else {\n      setWishlist([...wishlist, car.id]);\n    }\n  };"
    
    content = content.replace(old_state, new_state)
    
    # Update button onClick
    old_onclick = "onClick={(e) => { e.preventDefault(); setIsWishlisted(!isWishlisted); }}"
    new_onclick = "onClick={(e) => { e.preventDefault(); toggleWishlist(); }}"
    content = content.replace(old_onclick, new_onclick)
    
    with open('src/features/listings/components/CarCard.tsx', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    update_cars_page()
    update_quick_view_modal()
    update_car_card()
    print("Done")
