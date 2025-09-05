import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
	persist(
		(set, get) => ({
			cart: [],
			clearCart: () => set({ cart: [] }),
			addToCart: (product) => {
				const cart = get().cart;
				const exists = cart.find((item) => item._id === product._id);
				if (exists) {
					set({ cart: cart.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)) });
				} else {
					set({ cart: [...cart, { ...product, _id: product._id.toString(), quantity: 1 }] });
				}
			},
			removeFromCart: (_id) => {
				const cart = get().cart;
				const exists = cart.find((item) => item._id === _id);
				if (exists && exists.quantity > 1) {
					set({ cart: cart.map((item) => (item._id === _id ? { ...item, quantity: item.quantity - 1 } : item)) });
				} else {
					set({ cart: cart.filter((item) => item._id !== _id) });
				}
			},
			deleteFromCart: (_id) => set({ cart: get().cart.filter((item) => item._id !== _id) }),
			isPresent: (_id) => get().cart.find((item) => item._id === _id) !== undefined,
		}),
		{ name: "cart" }
	)
);
