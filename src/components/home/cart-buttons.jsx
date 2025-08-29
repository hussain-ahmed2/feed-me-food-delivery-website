"use client";

import { useCartStore } from "@/store/cart.store";
import { Minus, Plus } from "lucide-react";

export default function CartButtons({ product }) {
	const addToCart = useCartStore((state) => state.addToCart);
	const removeFromCart = useCartStore((state) => state.removeFromCart);
	const cart = useCartStore((state) => state.cart);
	const count = cart.find((item) => item._id === product._id)?.quantity || 0;

	return (
		<div className="absolute bottom-0 right-0 p-2">
			<div className={`flex items-center gap-1 rounded-full transform transition-all duration-300 ${count ? "p-1 bg-white" : ""}`}>
				<div className={`flex gap-1 transform transition duration-300 overflow-hidden ${count === 0 ? "opacity-0 invisible" : ""}`}>
					<div>
						<button
							disabled={count === 0}
							onClick={() => removeFromCart(product._id)}
							type="submit"
							className="bg-rose-100 text-rose-500 p-2 rounded-full transition duration-300 hover:bg-rose-500 hover:text-white disabled:opacity-50">
							<Minus />
						</button>
					</div>
					<div className="rounded-full size-10 flex items-center justify-center">{Number(count)}</div>
				</div>
				<div>
					<button
						disabled={count === 10}
						onClick={() => addToCart(product)}
						type="submit"
						className="p-2 rounded-full bg-emerald-100 text-emerald-500 transition duration-300 hover:bg-emerald-500 hover:text-white">
						<Plus />
					</button>
				</div>
			</div>
		</div>
	);
}
