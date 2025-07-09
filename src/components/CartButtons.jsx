import { useDebounce } from "@/hooks/useDebounce";
import Add from "./Add";
import Remove from "./Remove";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CartButtons({ item }) {
	const { updateCart } = useCart();
	const [count, setCount] = useState(item.quantity);
	const debouncedCount = useDebounce(count, 1000);

	useEffect(() => {
		if (item.quantity !== debouncedCount) updateCart(item.product._id, debouncedCount);
	}, [debouncedCount]);

	return (
		<>
			<Remove id={item.product._id} quantity={item.quantity} count={count} setCount={setCount} />
			<div>x{count}</div>
			<Add id={item.product._id} quantity={item.quantity} count={count} setCount={setCount} />
		</>
	);
}
