import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		items: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
				},
				quantity: { type: Number, default: 1 },
			},
		],
	},
	{ timestamps: true }
);

cartSchema.virtual("totalPrice").get(function () {
	return this.items.reduce((total, item) => {
		return total + item.product.price * item.quantity;
	}, 0);
});

cartSchema.virtual("totalQuantity").get(function () {
	return this.items.reduce((total, item) => {
		return total + item.quantity;
	}, 0);
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
