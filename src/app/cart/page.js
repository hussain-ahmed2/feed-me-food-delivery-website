import {
	addToCart,
	deleteFromCart,
	getCart,
	removeFromCart,
} from "@/actions/shop";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function CartPage() {
	const cart = await getCart();

	return (
		<div className="page animate-fade-in">
			<h1 className="heading mb-10">Cart</h1>
			<div>
				{cart.length ? (
					<div className="flex flex-col">
						<div className="flex items-center justify-between text-center font-semibold md:text-lg border-b-2 border-gray-300 pb-4">
							<div className="w-1/6">Image</div>
							<div className="w-1/6">Name</div>
							<div className="w-1/6">Price</div>
							<div className="w-1/6">Quantity</div>
							<div className="w-1/6">Total</div>
							<div className="w-1/6">Action</div>
						</div>
						{cart.map((item) => (
							<div
								className="flex items-center justify-between text-center border-b border-gray-300 py-4"
								key={item._id}
							>
								<div className="w-1/6">
									<Image
										className="w-full object-cover"
										src={item.image}
										width={100}
										height={100}
										alt={item.name}
									/>
								</div>
								<div className="w-1/6">{item.name}</div>
								<div className="w-1/6">${item.price}</div>
								<div className="w-1/6 flex items-center gap-1 justify-center">
									<Add id={item._id.toString()} />
									<div>x{item.quantity}</div>
									<Remove id={item._id.toString()} />
								</div>
								<div className="w-1/6">
									${(item.quantity * item.price).toFixed(2)}
								</div>
								<div className="w-1/6">
									<Delete id={item._id.toString()} />
								</div>
							</div>
						))}
						<div className="flex items-center gap-8 justify-end py-4">
							<div className="font-medium">
								Grand Total: $
								{cart.reduce(
									(acc, item) =>
										item.quantity * item.price + acc,
									0
								)}
							</div>
							<div className="">
								<Link
									href="/order"
									className="btn px-10 py-3 text-center"
								>
									Checkout
								</Link>
							</div>
						</div>
					</div>
				) : (
					<div>No product has been added to the cart yet!</div>
				)}
			</div>
		</div>
	);
}

const Add = async ({ id }) => {
	return (
		<form action={addToCart}>
			<input type="hidden" value={id} name="id" />
			<button className="bg-emerald-100 p-2 rounded-full hover:text-emerald-500 transition transform duration-300 active:scale-95 active:bg-white">
				<Plus className="size-5" />
			</button>
		</form>
	);
};

const Remove = async ({ id }) => {
	return (
		<form action={removeFromCart}>
			<input type="hidden" value={id} name="id" />
			<button className="bg-rose-100 p-2 rounded-full hover:text-rose-500 transition transform duration-300 active:scale-95 active:bg-white">
				<Minus className="size-5" />
			</button>
		</form>
	);
};

const Delete = async ({ id }) => {
	return (
		<form action={deleteFromCart}>
			<input type="hidden" name="id" value={id} />
			<button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-100 transition duration-300 hover:text-rose-500">
				<Trash2 />
			</button>
		</form>
	);
};
