import { useCartStore } from "@/store/cart.store";
import { Plus } from "lucide-react";
import { useCallback } from "react";

export default function Add({ item }) {
	const addToCart = useCartStore((state) => state.addToCart);
	const handleClick = useCallback(() => addToCart(item), [addToCart, item]);
	return (
		<button
			className="p-2 hover:bg-gray-200 active:bg-gray-100 transition duration-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-none"
			disabled={item.quantity === 10}
			onClick={handleClick}>
			<Plus />
		</button>
	);
}
