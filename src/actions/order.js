"use server";

import { connectDB } from "@/mongodb/connectDB";
import Order from "@/mongodb/models/order";
import { getUser } from "./auth";
import { revalidatePath } from "next/cache";

export async function getMyOrders() {
	try {
		await connectDB();

		const user = await getUser();
		if (!user) {
			return { success: false, message: "Please login to view orders" };
		}

		const orders = await Order.find({ user: user._id }).populate("items.product", "name image price category").sort({ createdAt: -1 }).lean();

		return { success: true, data: orders };
	} catch (error) {
		console.error("Get my orders error:", error);
		return { success: false, message: "Failed to fetch orders" };
	}
}

export async function cancelOrder(orderId) {
	try {
		await connectDB();

		const user = await getUser();
		if (!user) {
			return { success: false, message: "Please login to cancel orders" };
		}

		const order = await Order.findOne({
			_id: orderId,
			user: user._id,
		});

		if (!order) {
			return { success: false, message: "Order not found" };
		}

		// Check if order can be cancelled
		if (!["pending", "processing"].includes(order.status)) {
			return {
				success: false,
				message: "Order cannot be cancelled at this stage",
			};
		}

		order.status = "cancelled";
		await order.save();

		// Revalidate the orders page to show updated data
		revalidatePath("/orders");

		return {
			success: true,
			message: "Order cancelled successfully",
			data: {
				_id: order._id.toString(),
				status: order.status,
				orderNumber: order.orderNumber,
			},
		};
	} catch (error) {
		console.error("Cancel order error:", error);
		return { success: false, message: "Failed to cancel order" };
	}
}

export async function createOrder(userId, cartItems) {
	try {
		await connectDB();

		// Validate input
		if (!userId || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
			return { success: false, message: "Invalid order data" };
		}

		const orderItems = cartItems.map((item) => ({
			product: item._id,
			quantity: item.quantity,
		}));

		const order = await Order.create({
			user: userId,
			items: orderItems,
			status: "pending",
			totalAmount: cartItems.reduce((total, item) => total + item.quantity * item.price, 0),
		});

		// Revalidate orders page
		revalidatePath("/orders");

		return {
			success: true,
			data: {
				_id: order._id.toString(),
				orderNumber: order.orderNumber,
				status: order.status,
				totalAmount: order.totalAmount,
				createdAt: order.createdAt.toISOString(),
			},
		};
	} catch (error) {
		console.error("Create order error:", error);
		return {
			success: false,
			message: "Failed to create order",
		};
	}
}

// Admin function to get orders by user ID
export async function getOrdersByUser(userId, options = {}) {
	try {
		await connectDB();

		if (!userId) {
			return { success: false, message: "User ID is required" };
		}

		const query = { user: userId };

		if (options.status) {
			query.status = options.status;
		}

		const orders = await Order.find(query).populate("items.product", "name image price category").populate("user", "name email").sort({ createdAt: -1 }).lean();

		const plainOrders = orders.map((order) => ({
			...order,
			_id: order._id.toString(),
			user: {
				_id: order.user._id.toString(),
				name: order.user.name,
				email: order.user.email,
			},
			items: order.items.map((item) => ({
				...item,
				product: item.product
					? {
							...item.product,
							_id: item.product._id.toString(),
					  }
					: null,
			})),
			createdAt: order.createdAt.toISOString(),
			updatedAt: order.updatedAt.toISOString(),
			itemCount: order.items.reduce((total, item) => total + item.quantity, 0),
		}));

		return { success: true, data: plainOrders };
	} catch (error) {
		console.error("Get orders by user error:", error);
		return { success: false, message: "Failed to fetch orders" };
	}
}
