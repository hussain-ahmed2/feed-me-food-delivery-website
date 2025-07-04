"use client";

import { createContext, use } from "react";
import { useCookie } from "@/hooks/useCookie";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useCookie("cart", []);

	const addToCart = (product) => {
		const exists = cart.find((item) => item.id === product.id);
		if (exists) {
			setCart(
				cart.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				)
			);
		} else {
			setCart([...cart, { ...product, quantity: 1 }]);
		}
	};

	const removeFromCart = (product) => {
		const exists = cart.find((item) => item.id === product.id);
		if (exists && exists.quantity > 1) {
			setCart(
				cart.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity - 1 }
						: item
				)
			);
		} else {
			setCart(cart.filter((item) => item.id !== product.id));
		}
	};

	const deleteFromCart = (product) => {
		setCart(cart.filter((item) => item.id !== product.id));
	};

	return (
		<CartContext
			value={{ cart, addToCart, removeFromCart, deleteFromCart }}
		>
			{children}
		</CartContext>
	);
};

export const useCart = () => use(CartContext);
