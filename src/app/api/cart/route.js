import { NextResponse } from "next/server";
import { connectDB } from "@/mongodb/connectDB";
import Cart from "@/mongodb/models/cart";
import { getUser } from "@/actions/auth";

export async function POST(request) {
	try {
		const { id, quantity } = await request.json();

		const user = await getUser();
		if (!user) {
			return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
		}

		await connectDB();

		let cart = await Cart.findOne({ user: user._id }).lean();
		if (!cart) {
			cart = { user: user._id, items: [] };
		}
		console.log(cart);
		const itemIndex = cart.items.findIndex((item) => item?.product?.toString() === id);

		if (itemIndex === -1) {
			cart.items.push({
				product: id,
				quantity: Number(quantity),
			});
		} else {
			const newQuantity = Number(quantity);
			if (newQuantity <= 0) {
				cart.items.splice(itemIndex, 1);
			} else {
				cart.items[itemIndex].quantity = newQuantity;
			}
		}

		await Cart.findOneAndUpdate({ user: user._id }, cart, { upsert: true });
		const data = await Cart.findOne({ user: user._id }).populate("items.product");

		return NextResponse.json({ success: true, data });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
	}
}

export async function GET() {
	try {
		const user = await getUser();
		if (!user) {
			return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
		}

		await connectDB();
		const data = await Cart.findOne({ user: user._id }).populate("items.product");
		return NextResponse.json({ success: true, data: data || { items: [] } });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
	}
}

export async function DELETE(request) {
	try {
		const { id } = await request.json();
		const user = await getUser();
		if (!user) {
			return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
		}

		await connectDB();

		const cart = await Cart.findOne({ user: user._id });

		const itemIndex = cart.items.findIndex((item) => item.product.toString() === id);

		if (itemIndex > -1) {
			cart.items.splice(itemIndex, 1);
			await cart.save();
		}

		const data = await Cart.findOne({ user: user._id }).populate("items.product");

		return NextResponse.json({ success: true, data });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
	}
}
