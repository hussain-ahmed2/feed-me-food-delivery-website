import { useCartStore } from "@/store/cart.store";
import { Plus } from "lucide-react";

export default function Add({ item }) {
	const addToCart = useCartStore((state) => state.addToCart);
	return (
		<button
			className="p-2 hover:bg-gray-200 active:bg-gray-100 transition duration-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-none"
			disabled={count === 10}
			onClick={() => addToCart(item)}>
			<Plus />
		</button>
	);
}
