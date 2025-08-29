"use client";

import Add from "@/components/Add";
import CartButtons from "@/components/CartButtons";
import Remove from "@/components/Remove";
import { useCartStore } from "@/store/cart.store";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
	const cart = useCartStore((state) => state.cart);
	const deleteFromCart = useCartStore((state) => state.deleteFromCart);

	return (
		<div className="page animate-fade-in">
			<h1 className="heading mb-10">Cart</h1>
			<div>
				{cart.length > 0 ? (
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
							<div className="flex items-center justify-between text-center border-b border-gray-300 py-4" key={item._id}>
								<div className="w-1/6">
									<Image className="w-full object-cover" src={item.image} width={100} height={100} alt={item.name} />
								</div>
								<div className="w-1/6">{item.name}</div>
								<div className="w-1/6">${item.price}</div>
								<div className="w-1/6 flex items-center gap-1 justify-center">
									<CartButtons item={item} />
								</div>
								<div className="w-1/6">${(item.quantity * item.price).toFixed(2)}</div>
								<div className="w-1/6">
									<button className="p-2 rounded-md hover:text-rose-500 hover:bg-rose-100 transition duration-300" onClick={() => deleteFromCart(item._id)}>
										<Trash2 />
									</button>
								</div>
							</div>
						))}
						<div className="flex items-center gap-8 justify-end py-4">
							<div className="font-medium">Grand Total: ${cart.reduce((acc, item) => item.quantity * item.price + acc, 0)}</div>
							<div className="">
								<Link href="/order" className="btn px-10 py-3 text-center">
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
