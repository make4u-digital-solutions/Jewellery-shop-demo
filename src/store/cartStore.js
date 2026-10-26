import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      coupon: null,

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      addItem: (product, size = null, quantity = 1) => {
        const itemId = size ? `${product.id}-${size}` : `${product.id}`;
        const existing = get().items.find((item) => item.itemId === itemId);

        if (existing) {
          set({
            items: get().items.map((item) =>
              item.itemId === itemId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              {
                itemId,
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.images?.[0] || product.image,
                material: product.material,
                size: size || product.defaultSize || null,
                quantity: quantity,
              },
            ],
          });
        }
      },

      removeItem: (itemId) => {
        set({
          items: get().items.filter((item) => item.itemId !== itemId),
        });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.itemId === itemId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [], coupon: null }),

      applyCoupon: (code) => {
        const cleanCode = code.trim().toUpperCase();
        if (cleanCode === "AURELLE10") {
          set({ coupon: { code: "AURELLE10", discountPercent: 10, label: "10% Welcome Luxury Privileges" } });
          return { success: true, message: "10% Welcome Discount Applied" };
        } else if (cleanCode === "ROYAL5000") {
          set({ coupon: { code: "ROYAL5000", discountAmount: 5000, label: "₹5,000 High-Jewellery Courtesy" } });
          return { success: true, message: "₹5,000 High-Jewellery Courtesy Applied" };
        } else {
          return { success: false, message: "Invalid promo code. Try 'AURELLE10'" };
        }
      },

      removeCoupon: () => set({ coupon: null }),

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        const { coupon } = get();
        if (!coupon) return 0;
        if (coupon.discountPercent) {
          return Math.round((subtotal * coupon.discountPercent) / 100);
        }
        if (coupon.discountAmount) {
          return Math.min(coupon.discountAmount, subtotal);
        }
        return 0;
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        // Complimentary shipping over ₹5,000
        return subtotal >= 5000 ? 0 : 350;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        const shipping = get().getShippingFee();
        return Math.max(0, subtotal - discount + shipping);
      },

      getTotalCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "aurelle-cart-storage",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      })),
      partialize: (state) => ({ items: state.items, coupon: state.coupon }),
    }
  )
);
