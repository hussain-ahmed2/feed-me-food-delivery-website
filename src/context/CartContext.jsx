"use client";

import axios from "axios";
import { createContext, use, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [loading, setLoading] = useState(true);

	const updateCart = async (id, quantity) => {
		const res = await axios.post("/api/cart", { id, quantity });
		setCart(res.data.data.items);
	};

	const removeFromCart = async (id) => {
		const res = await axios.delete(`/api/cart`, { data: { id } });
		setCart(res.data.data.items);
	};

	useEffect(() => {
		const getCart = async () => {
			try {
				const res = await axios.get("/api/cart");
				setCart(res.data.data.items);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		getCart();
	}, []);

	return <CartContext value={{ cart, updateCart, removeFromCart, loading }}>{children}</CartContext>;
};

export const useCart = () => use(CartContext);
