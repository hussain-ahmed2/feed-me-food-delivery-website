"use client";

import { useCartStore } from "@/store/cart.store";
import { ShoppingCart } from "lucide-react";

export default function CartIconWithCount() {
	const count = useCartStore((state) => state.cart.length);
	return (
		<span className="relative">
			<ShoppingCart />
			<div
				className={`text-white text-xs w-5 h-5 flex items-center justify-center rounded-full bg-emerald-500 absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 transition duration-300 ${
					count ? "" : "opacity-0 invisible"
				}`}>
				{count}
			</div>
		</span>
	);
}
