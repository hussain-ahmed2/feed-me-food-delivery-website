import Image from "next/image";
import { Package, Clock, Truck, CheckCircle, XCircle } from "lucide-react";
import OrderActions from "./OrderActions"; // Client Component for interactions

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

function OrderCard({ order }) {
	return (
		<div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
			{/* Order Header */}
			<div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
				<div className="flex justify-between items-start">
					<div>
						<div className="flex items-center space-x-4">
							<h3 className="font-semibold text-gray-900">Order #{order.orderNumber}</h3>
							<div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
								{statusIcons[order.status]}
								<span className="ml-1 capitalize">{order.status.replace("_", " ")}</span>
							</div>
						</div>
						<p className="text-sm text-gray-500 mt-1">Placed on {formatDate(order.createdAt)}</p>
					</div>
					<div className="text-right">
						<p className="text-lg font-semibold text-gray-900">${order.totalAmount.toFixed(2)}</p>
						<p className="text-sm text-gray-500">{order.itemCount} items</p>
					</div>
				</div>
			</div>

			{/* Order Items Preview */}
			<div className="px-6 py-4">
				<div className="grid gap-4">
					{order.items.slice(0, 3).map((item, index) => (
						<div key={index} className="flex items-center space-x-4">
							<div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
								<Image src={item.product?.image || "/placeholder.jpg"} alt={item.product?.name} width={64} height={64} className="w-full h-full object-cover" />
							</div>
							<div className="flex-1">
								<h4 className="font-medium text-gray-900">{item.product?.name}</h4>
								<p className="text-sm text-gray-500">Qty: {item.quantity}</p>
							</div>
							<div className="text-right">
								<p className="font-medium text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
								<p className="text-sm text-gray-500">${item.product.price.toFixed(2)} each</p>
							</div>
						</div>
					))}

					{order.items.length > 3 && <p className="text-sm text-gray-500 text-center py-2">+{order.items.length - 3} more items</p>}
				</div>
			</div>

			{/* Order Actions - Client Component */}
			<div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
				<OrderActions order={order} />
			</div>
		</div>
	);
}

export default function OrdersList({ orders }) {
	return (
		<div className="space-y-6">
			{orders.map((order) => (
				<OrderCard key={order._id} order={order} />
			))}
		</div>
	);
}
