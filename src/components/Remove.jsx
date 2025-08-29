import { useCartStore } from "@/store/cart.store";
import { Minus } from "lucide-react";

export default function Remove({ item }) {
	const removeFromCart = useCartStore((state) => state.removeFromCart);

	return (
		<button
			className={`p-2 hover:bg-gray-200 active:bg-gray-100 transition duration-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-none`}
			disabled={item?.quantity === 0}
			onClick={() => removeFromCart(item._id)}>
			<Minus />
		</button>
	);
}
