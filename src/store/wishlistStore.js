import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (product) => {
        const exists = get().items.some((item) => item.id === product.id);
        if (exists) {
          set({
            items: get().items.filter((item) => item.id !== product.id),
          });
          return false; // removed
        } else {
          set({
            items: [
              ...get().items,
              {
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.images?.[0] || product.image,
                category: product.category,
                material: product.material,
                rating: product.rating,
              },
            ],
          });
          return true; // added
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },

      removeFromWishlist: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "aurelle-wishlist-storage",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      })),
    }
  )
);
