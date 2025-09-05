"use client";

import { useState } from "react";
import { Eye, XCircle } from "lucide-react";
import { toast } from "react-toastify";
import { cancelOrder } from "@/actions/order";
import { useRouter } from "next/navigation";
import OrderDetailsModal from "./OrderDetailsModal";

export default function OrderActions({ order }) {
	const [showDetails, setShowDetails] = useState(false);
	const [cancelling, setCancelling] = useState(false);
	const router = useRouter();

	const handleCancelOrder = async () => {
		if (!confirm("Are you sure you want to cancel this order?")) {
			return;
		}

		setCancelling(true);
		try {
			const response = await cancelOrder(order._id);

			if (response.success) {
				toast.success("Order cancelled successfully");
				router.refresh(); // Refresh server component
			} else {
				toast.error(response.message || "Failed to cancel order");
			}
		} catch (error) {
			console.error("Cancel order error:", error);
			toast.error("Something went wrong");
		} finally {
			setCancelling(false);
		}
	};

	const canBeCancelled = order.status === "pending" || order.status === "processing";

	return (
		<>
			<div className="flex justify-between items-center">
				<button
					onClick={() => setShowDetails(true)}
					className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
					<Eye className="w-4 h-4 mr-2" />
					View Details
				</button>

				{canBeCancelled && (
					<button
						onClick={handleCancelOrder}
						disabled={cancelling}
						className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
						{cancelling ? (
							<>
								<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
								Cancelling...
							</>
						) : (
							<>
								<XCircle className="w-4 h-4 mr-2" />
								Cancel Order
							</>
						)}
					</button>
				)}
			</div>

			{/* Order Details Modal */}
			<OrderDetailsModal order={order} isOpen={showDetails} onClose={() => setShowDetails(false)} />
		</>
	);
}
