import { addToCart, getQuantity, removeFromCart } from "@/actions/shop";
import { Minus, Plus } from "lucide-react";

export default async function CartButtons({ id }) {
	const quantity = await getQuantity(id);

	return (
		<div className="absolute bottom-0 right-0 p-2">
			<div
				className={`flex items-center gap-1 rounded-full transform transition-all duration-300 ${
					quantity ? "p-1 bg-white" : ""
				}`}
			>
				<div
					className={`flex gap-1 transform transition duration-300 overflow-hidden ${
						quantity === 0 ? "opacity-0 invisible" : ""
					}`}
				>
					<form action={removeFromCart}>
						<input type="hidden" value={id} name="id" />
						<button
							type="submit"
							className="bg-rose-100 text-rose-500 p-2 rounded-full transition duration-300 hover:bg-rose-500 hover:text-white disabled:opacity-50"
						>
							<Minus />
						</button>
					</form>
					<div className="rounded-full size-10 flex items-center justify-center">
						{quantity}
					</div>
				</div>
				<form action={addToCart}>
					<input type="hidden" value={id} name="id" />
					<button
						type="submit"
						className="p-2 rounded-full bg-emerald-100 text-emerald-500 transition duration-300 hover:bg-emerald-500 hover:text-white"
					>
						<Plus />
					</button>
				</form>
			</div>
		</div>
	);
}
