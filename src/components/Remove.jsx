import { Minus } from "lucide-react";

export default function Remove({ count, setCount }) {
	return (
		<button
			className={`p-2 hover:bg-gray-200 active:bg-gray-100 transition duration-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-none`}
			disabled={count === 0}
			onClick={() => setCount((prev) => prev - 1)}>
			<Minus />
		</button>
	);
}
