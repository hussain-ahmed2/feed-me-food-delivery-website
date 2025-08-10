"use server";

import { connectDB } from "@/mongodb/connectDB";
import Product from "@/mongodb/models/product";
import { cookies } from "next/headers";

export async function getDishes({ limit = 12, page = 1, search_query = "", category = "All" }) {
	try {
		await connectDB();

		const parsedLimit = parseInt(limit);
		const parsedPage = parseInt(page);
		const skip = (parsedPage - 1) * parsedLimit;
		const searchRegex = new RegExp(search_query, "i");

		const query = { ...(search_query && { name: { $regex: searchRegex } }), ...(category && category.toLowerCase() !== "all" && { category }) };

		const dishes = await Product.find(query).skip(skip).limit(parsedLimit);

		const total = await Product.countDocuments(query);
		const totalPages = Math.ceil(total / parsedLimit);

		return {
			dishes,
			pagination: {
				total,
				limit: parsedLimit,
				page: parsedPage,
				totalPages,
				hasNextPage: parsedPage < totalPages,
				hasPrevPage: parsedPage > 1,
			},
			params: {
				limit,
				page,
				search_query,
				category,
			},
		};
	} catch (error) {
		console.error(error);
		return {
			dishes: [],
			pagination: {
				total: 0,
				limit: parseInt(limit),
				page: parseInt(page),
				totalPages: 0,
				hasNextPage: false,
				hasPrevPage: false,
			},
		};
	}
}

export async function addToCart(formData) {
	const id = formData.get("id");
	const cartCookie = (await cookies()).get("cart")?.value;
	let cart = cartCookie ? JSON.parse(cartCookie) : [];

	const exists = cart.find((item) => item.id == id);

	if (exists) {
		cart = cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
	} else {
		cart.push({ id, quantity: 1 });
	}
	console.log(id, cart);
	(await cookies()).set("cart", JSON.stringify(cart));
}

export async function removeFromCart(formData) {
	const id = formData.get("id");
	const cartCookie = (await cookies()).get("cart")?.value;
	let cart = cartCookie ? JSON.parse(cartCookie) : [];

	const exists = cart.find((item) => item.id === id);

	if (exists && exists.quantity > 1) {
		cart = cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item));
	} else {
		cart = cart.filter((item) => item.id !== id);
	}
	(await cookies()).set("cart", JSON.stringify(cart));
}

export async function deleteFromCart(formData) {
	const id = formData.get("id");
	const cartCookie = (await cookies()).get("cart")?.value;
	let cart = cartCookie ? JSON.parse(cartCookie) : [];

	cart = cart.filter((item) => item.id !== id);

	(await cookies()).set("cart", JSON.stringify(cart));
}

export async function getQuantity(id) {
	const cartCookie = (await cookies()).get("cart")?.value;
	const cart = cartCookie ? JSON.parse(cartCookie) : [];

	const item = cart.find((item) => item.id === id);
	return item ? item.quantity : 0;
}

export async function getCart() {
	const cartCookie = (await cookies()).get("cart")?.value;
	const cart = cartCookie ? JSON.parse(cartCookie) : [];

	if (!cart.length) return [];

	await connectDB();

	const ids = cart.map((item) => item.id);

	const dishes = await Product.find({ _id: { $in: ids } }).lean();

	const cartWithDetails = dishes.map((dish) => {
		const item = cart.find((c) => c.id == dish._id);
		return {
			...dish,
			quantity: item?.quantity || 0,
		};
	});

	return cartWithDetails;
}
