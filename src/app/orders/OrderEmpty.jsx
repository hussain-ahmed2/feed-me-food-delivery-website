import { Package, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function OrdersEmpty() {
	return (
		<div className="text-center py-12">
			<div className="flex justify-center mb-6">
				<div className="relative">
					<Package className="w-20 h-20 text-gray-300" />
					<div className="absolute -top-2 -right-2">
						<ShoppingBag className="w-8 h-8 text-gray-400" />
					</div>
				</div>
			</div>

			<h3 className="text-xl font-medium text-gray-900 mb-3">No orders yet</h3>

			<p className="text-gray-500 mb-8 max-w-md mx-auto">You haven't placed any orders yet. Start shopping to see your orders here!</p>

			<div className="space-y-4">
				<Link
					href="/products"
					className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
					<ShoppingBag className="w-5 h-5 mr-2" />
					Start Shopping
				</Link>

				<div className="text-sm text-gray-500">
					<p>Looking for something specific?</p>
					<Link href="/categories" className="text-blue-600 hover:text-blue-500 font-medium">
						Browse by category
					</Link>
				</div>
			</div>
		</div>
	);
}
