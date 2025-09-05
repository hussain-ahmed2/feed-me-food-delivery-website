import { getMyOrders } from "@/actions/order";
import { getUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import OrdersList from "./OrderList";
import OrdersEmpty from "./OrderEmpty";

export default async function OrdersPage({ searchParams }) {
	// Get current user
	const user = await getUser();
	if (!user) {
		redirect("/login");
	}

	// Get orders from server
	const response = await getMyOrders();

	if (!response.success) {
		return (
			<div className="max-w-4xl mx-auto p-6">
				<div className="text-center py-12">
					<h1 className="text-2xl font-bold text-gray-900 mb-4">My Orders</h1>
					<div className="bg-red-50 border border-red-200 rounded-md p-4">
						<p className="text-red-800">{response.message}</p>
					</div>
				</div>
			</div>
		);
	}

	const orders = response.data.map((order) => JSON.parse(JSON.stringify(order)));

	return (
		<div className="page animate-fade-in">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
				<div className="text-sm text-gray-500">
					{orders.length} {orders.length === 1 ? "order" : "orders"}
				</div>
			</div>

			{orders.length === 0 ? <OrdersEmpty /> : <OrdersList orders={orders} />}
		</div>
	);
}

// Optional: Add metadata
export const metadata = {
	title: "My Orders",
	description: "View and manage your orders",
};
