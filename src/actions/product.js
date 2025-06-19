"use server";

import { connectDB } from "@/mongodb/connectDB";
import Product from "@/mongodb/models/product";

export async function getProducts() {
	try {
		await connectDB();
		const products = await Product.find({}).limit(4);
		return products;
	} catch (error) {
		console.error(error);
		return [];
	}
}
