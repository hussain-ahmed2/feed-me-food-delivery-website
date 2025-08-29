import Add from "./Add";
import Remove from "./Remove";

export default function CartButtons({ item }) {
	return (
		<>
			<Remove item={item} />
			<div>x{count}</div>
			<Add item={item} />
		</>
	);
}
