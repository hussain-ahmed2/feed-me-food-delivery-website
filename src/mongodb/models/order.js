import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
		items: [
			{
				product: {
					type: mongoose.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: {
					type: Number,
					default: 1,
					required: true,
					min: 1,
					max: 10,
				},
				price: {
					type: Number,
					required: true,
					min: 0,
				}, // Store price at time of order
				name: {
					type: String,
					required: true,
				}, // Store product name at time of order
			},
		],
		status: {
			type: String,
			enum: ["pending", "processing", "on_the_way", "completed", "cancelled"],
			default: "pending",
			required: true,
		},
		totalAmount: {
			type: Number,
			default: 0,
			min: 0,
			required: true,
		},
		shippingAddress: {
			street: String,
			city: String,
			state: String,
			zipCode: String,
			country: String,
		},
		paymentStatus: {
			type: String,
			enum: ["pending", "paid", "failed", "refunded"],
			default: "pending",
		},
		orderNumber: {
			type: String,
			unique: true,
		},
	},
	{
		timestamps: true,
		// Add indexes for better performance
		indexes: [{ user: 1, status: 1 }, { status: 1, createdAt: -1 }, { orderNumber: 1 }],
	}
);

// Generate order number before saving
orderSchema.pre("save", function (next) {
	if (this.isNew && !this.orderNumber) {
		// Generate unique order number: ORD-TIMESTAMP-RANDOM
		const timestamp = Date.now().toString();
		const random = Math.random().toString(36).substring(2, 8).toUpperCase();
		this.orderNumber = `ORD-${timestamp}-${random}`;
	}
	next();
});

// Calculate total amount before saving
orderSchema.pre("save", function (next) {
	if (this.items && this.items.length > 0) {
		this.totalAmount = this.items.reduce((total, item) => {
			return total + item.price * item.quantity;
		}, 0);
	}
	next();
});

// Virtual for formatted total
orderSchema.virtual("formattedTotal").get(function () {
	return `$${this.totalAmount.toFixed(2)}`;
});

// Virtual for order summary
orderSchema.virtual("itemCount").get(function () {
	return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Instance method to check if order can be cancelled
orderSchema.methods.canBeCancelled = function () {
	return ["pending", "processing"].includes(this.status);
};

// Instance method to update status with validation
orderSchema.methods.updateStatus = function (newStatus) {
	const validTransitions = {
		pending: ["processing", "cancelled"],
		processing: ["on_the_way", "cancelled"],
		on_the_way: ["completed"],
		completed: [],
		cancelled: [],
	};

	if (validTransitions[this.status].includes(newStatus)) {
		this.status = newStatus;
		return true;
	}
	return false;
};

// Ensure virtual fields are serialized
orderSchema.set("toJSON", { virtuals: true });
orderSchema.set("toObject", { virtuals: true });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
