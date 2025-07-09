"use client";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useDebounce } from "@/hooks/useDebounce";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CartButtons({ id }) {
	const { cart, updateCart } = useCart();
	const { user } = useAuth();
	const quantity = cart?.find((item) => (item?.product?._id?.toString() || item?.product?.toString()) === id.toString())?.quantity || 0;
	const [count, setCount] = useState(quantity);
	const debouncedCount = useDebounce(count, 1000);
	const router = useRouter();

	useEffect(() => {
		if (quantity !== debouncedCount) updateCart(id, debouncedCount);
	}, [debouncedCount]);

	function handleIncrement() {
		if (!user) {
			router.push("/login");
			return;
		}
		setCount((prev) => prev + 1);
	}

	function handleDecrement() {
		if (!user) {
			router.push("/login");
			return;
		}
		setCount((prev) => prev - 1);
	}

	return (
		<div className="absolute bottom-0 right-0 p-2">
			<div className={`flex items-center gap-1 rounded-full transform transition-all duration-300 ${count ? "p-1 bg-white" : ""}`}>
				<div className={`flex gap-1 transform transition duration-300 overflow-hidden ${count === 0 ? "opacity-0 invisible" : ""}`}>
					<div>
						<button
							disabled={count === 0}
							onClick={handleDecrement}
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
						onClick={handleIncrement}
						type="submit"
						className="p-2 rounded-full bg-emerald-100 text-emerald-500 transition duration-300 hover:bg-emerald-500 hover:text-white">
						<Plus />
					</button>
				</div>
			</div>
		</div>
	);
}
