"use client";

import { XCircle, Clock, Package, Truck, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

const statusIcons = {
	pending: <Clock className="w-5 h-5 text-yellow-500" />,
	processing: <Package className="w-5 h-5 text-blue-500" />,
	on_the_way: <Truck className="w-5 h-5 text-purple-500" />,
	completed: <CheckCircle className="w-5 h-5 text-green-500" />,
	cancelled: <XCircle className="w-5 h-5 text-red-500" />,
};

const statusColors = {
	pending: "bg-yellow-100 text-yellow-800",
	processing: "bg-blue-100 text-blue-800",
	on_the_way: "bg-purple-100 text-purple-800",
	completed: "bg-green-100 text-green-800",
	cancelled: "bg-red-100 text-red-800",
};

function formatDate(dateString) {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}

export default function OrderDetailsModal({ order, isOpen, onClose }) {
	// Handle ESC key
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="fixed inset-0 bg-black/50 bg-opacity-50 transition-opacity" onClick={onClose}></div>
			<div className="bg-white relative rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
				{/* Header */}
				<div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
					<div className="flex justify-between items-center">
						<div>
							<h2 className="text-lg font-semibold text-gray-900">Order #{order._id}</h2>
							<p className="text-sm text-gray-500 mt-1">Placed on {formatDate(order.createdAt)}</p>
						</div>
						<button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
							<XCircle className="w-6 h-6" />
						</button>
					</div>
				</div>

				{/* Content */}
				<div className="flex-1 overflow-y-auto px-6 py-4">
					{/* Order Status */}
					<div className="mb-6">
						<div className="flex items-center justify-between">
							<div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
								{statusIcons[order.status]}
								<span className="ml-2 capitalize">{order.status.replace("_", " ")}</span>
							</div>
							<div className="text-right">
								<p className="text-lg font-semibold text-gray-900">${order?.totalAmount?.toFixed(2)}</p>
								<p className="text-sm text-gray-500">
									{order.itemCount} {order.itemCount === 1 ? "item" : "items"}
								</p>
							</div>
						</div>
					</div>

					{/* Order Items */}
					<div className="space-y-4">
						<h3 className="font-medium text-gray-900">Order Items</h3>
						{order.items.map((item, index) => (
							<div key={index} className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
								<div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
									<Image src={item.product?.image || "/placeholder.jpg"} alt={item.product?.name || item.name} width={80} height={80} className="w-full h-full object-cover" />
								</div>
								<div className="flex-1">
									<h4 className="font-medium text-gray-900">{item.product?.name || item.name}</h4>
									<div className="mt-1 space-y-1">
										<p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
										<p className="text-sm text-gray-500">Unit Price: ${item.product.price.toFixed(2)}</p>
									</div>
								</div>
								<div className="text-right">
									<p className="font-semibold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
								</div>
							</div>
						))}
					</div>

					{/* Order Summary */}
					<div className="mt-6 pt-4 border-t border-gray-200">
						<div className="space-y-2">
							<div className="flex justify-between text-sm text-gray-600">
								<span>Subtotal</span>
								<span>${order.totalAmount.toFixed(2)}</span>
							</div>
							<div className="flex justify-between text-sm text-gray-600">
								<span>Shipping</span>
								<span>Free</span>
							</div>
							<div className="flex justify-between text-sm text-gray-600">
								<span>Tax</span>
								<span>Included</span>
							</div>
							<div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t border-gray-200">
								<span>Total</span>
								<span>${order.totalAmount.toFixed(2)}</span>
							</div>
						</div>
					</div>

					{/* Order Timeline */}
					<div className="mt-6 pt-4 border-t border-gray-200">
						<h4 className="font-medium text-gray-900 mb-3">Order Timeline</h4>
						<div className="space-y-2">
							<div className="flex items-center text-sm">
								<div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
								<span className="text-gray-600">Order placed</span>
								<span className="ml-auto text-gray-500">{formatDate(order.createdAt)}</span>
							</div>

							{order.status !== "pending" && (
								<div className="flex items-center text-sm">
									<div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
									<span className="text-gray-600">Order confirmed</span>
									<span className="ml-auto text-gray-500">{formatDate(order.updatedAt)}</span>
								</div>
							)}

							{(order.status === "processing" || order.status === "on_the_way" || order.status === "completed") && (
								<div className="flex items-center text-sm">
									<div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
									<span className="text-gray-600">Processing</span>
								</div>
							)}

							{(order.status === "on_the_way" || order.status === "completed") && (
								<div className="flex items-center text-sm">
									<div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
									<span className="text-gray-600">On the way</span>
								</div>
							)}

							{order.status === "completed" && (
								<div className="flex items-center text-sm">
									<div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
									<span className="text-gray-600">Delivered</span>
								</div>
							)}

							{order.status === "cancelled" && (
								<div className="flex items-center text-sm">
									<div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
									<span className="text-gray-600">Order cancelled</span>
									<span className="ml-auto text-gray-500">{formatDate(order.updatedAt)}</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
