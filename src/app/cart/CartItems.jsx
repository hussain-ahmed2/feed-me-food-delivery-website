"use client";

import { useCallback, useMemo } from "react";
import { createOrder } from "@/actions/order";
import CartButtons from "@/components/CartButtons";
import { useCartStore } from "@/store/cart.store";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";

export default function CartItems({ userId }) {
	// Get cart and store functions (these are stable references from Zustand)
	const cart = useCartStore((state) => state.cart);
	const deleteFromCart = useCartStore((state) => state.deleteFromCart);
	const clearCart = useCartStore((state) => state.clearCart);

	// Memoize grand total calculation
	const grandTotal = useMemo(() => {
		return cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
	}, [cart]);

	// Handle delete item
	const handleDeleteItem = useCallback(
		(itemId) => {
			deleteFromCart(itemId);
		},
		[deleteFromCart]
	);

	// Handle checkout with proper error handling
	const handleCheckout = useCallback(async () => {
		// Validation
		if (!cart.length) {
			toast.error("Cart is empty!");
			return;
		}

		if (!userId) {
			toast.error("Please login to checkout!");
			return;
		}

		try {
			const response = await createOrder(userId, cart);

			if (response.success) {
				toast.success("Order created successfully!");
				clearCart();
			} else {
				toast.error(response.message || "Failed to create order!");
			}
		} catch (error) {
			console.error("Checkout error:", error);
			toast.error("Something went wrong!");
		}
	}, [userId, clearCart, cart.length]);

	// Early return for empty cart
	if (cart.length === 0) {
		return <div className="text-center py-8 text-gray-500">No product has been added to the cart yet!</div>;
	}

	return (
		<div>
			<div className="flex flex-col">
				{/* Header */}
				<div className="flex items-center justify-between text-center font-semibold md:text-lg border-b-2 border-gray-300 pb-4">
					<div className="w-1/6">Image</div>
					<div className="w-1/6">Name</div>
					<div className="w-1/6">Price</div>
					<div className="w-1/6">Quantity</div>
					<div className="w-1/6">Total</div>
					<div className="w-1/6">Action</div>
				</div>

				{/* Cart Items */}
				{cart.map((item) => (
					<div className="flex items-center justify-between text-center border-b border-gray-300 py-4" key={item._id}>
						<div className="w-1/6">
							<Image className="size-12 object-cover mx-auto block rounded" src={item.image} width={48} height={48} alt={item.name} priority={false} />
						</div>
						<div className="w-1/6 truncate px-2">{item.name}</div>
						<div className="w-1/6">${Number(item.price).toFixed(2)}</div>
						<div className="w-1/6 flex items-center gap-1 justify-center">
							<CartButtons item={item} />
						</div>
						<div className="w-1/6">${(item.quantity * item.price).toFixed(2)}</div>
						<div className="w-1/6">
							<button
								className="p-2 rounded-md hover:text-rose-500 hover:bg-rose-100 transition duration-300 disabled:opacity-50"
								onClick={() => handleDeleteItem(item._id)}
								aria-label={`Remove ${item.name} from cart`}
								type="button">
								<Trash2 size={18} />
							</button>
						</div>
					</div>
				))}

				{/* Footer */}
				<div className="flex items-center gap-8 justify-end py-4">
					<div className="font-medium text-lg">Grand Total: ${grandTotal.toFixed(2)}</div>
					<div>
						<button
							onClick={handleCheckout}
							className="btn px-10 py-3 text-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							disabled={!cart.length || !userId}
							type="button">
							{!userId ? "Login to Checkout" : "Checkout"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
