"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { apiClient } from "@/lib/api/client";
import { useAuth } from "@/features/auth/context/AuthProvider";
import { useToast } from "@/components/providers/ToastProvider";
import type { ApiResponse } from "@/types";

export interface WishlistItem {
  id: string;
  car_id: string;
  user_id: string;
  created_at: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  isLoading: boolean;
  addItem: (_carId: string) => Promise<void>;
  removeItem: (_wishlistId: string) => Promise<void>;
  removeItemByCarId: (_carId: string) => Promise<void>;
  isInWishlist: (_carId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      setItems([]);
      return;
    }
    
    setIsLoading(true);
    try {
      // Assuming response is an array based on the FastAPI route
      const response = await apiClient.get<WishlistItem[]>("/wishlists/");
      // Some APIs might wrap lists in ApiResponse, check if data is an array
      if (Array.isArray(response.data)) {
        setItems(response.data);
      } else if ((response.data as any).data && Array.isArray((response.data as any).data)) {
        setItems((response.data as any).data);
      }
    } catch (err) {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addItem = async (carId: string) => {
    if (!isAuthenticated) {
      toast({
        variant: "warning",
        title: "Sign In Required",
        description: "Please sign in to save cars to your wishlist.",
      });
      return;
    }

    try {
      const response = await apiClient.post<WishlistItem | ApiResponse<WishlistItem>>("/wishlists/", {
        car_id: carId,
      });
      
      const newItem = 'data' in response.data && 'id' in (response.data as any).data 
        ? (response.data as any).data 
        : response.data;
        
      setItems((prev) => [...prev, newItem]);
      toast({
        variant: "success",
        title: "Added to Wishlist",
        description: "Car has been saved to your wishlist.",
      });
    } catch (err: any) {
      toast({
        variant: "error",
        title: "Action Failed",
        description: err?.error?.message || "Failed to add to wishlist.",
      });
    }
  };

  const removeItem = async (wishlistId: string) => {
    try {
      await apiClient.delete(`/wishlists/${wishlistId}`);
      setItems((prev) => prev.filter((item) => item.id !== wishlistId));
      toast({
        variant: "info",
        title: "Removed from Wishlist",
        description: "Car has been removed from your wishlist.",
      });
    } catch (err: any) {
      toast({
        variant: "error",
        title: "Action Failed",
        description: err?.error?.message || "Failed to remove from wishlist.",
      });
    }
  };

  const removeItemByCarId = async (carId: string) => {
    const item = items.find((i) => i.car_id === carId);
    if (item) {
      await removeItem(item.id);
    }
  };

  const isInWishlist = useCallback(
    (carId: string) => {
      return items.some((item) => item.car_id === carId);
    },
    [items]
  );

  return (
    <WishlistContext.Provider
      value={{
        items,
        isLoading,
        addItem,
        removeItem,
        removeItemByCarId,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
