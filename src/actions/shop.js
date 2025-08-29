"use server";

import { connectDB } from "@/mongodb/connectDB";
import Product from "@/mongodb/models/product";

export async function getDishes({ limit = 12, page = 1, search_query = "", category = "All" }) {
	try {
		await connectDB();

		const parsedLimit = parseInt(limit);
		const parsedPage = parseInt(page);
		const skip = (parsedPage - 1) * parsedLimit;
		const searchRegex = new RegExp(search_query, "i");

		const query = { ...(search_query && { name: { $regex: searchRegex } }), ...(category && category.toLowerCase() !== "all" && { category }) };

		const dishes = await Product.find(query).skip(skip).limit(parsedLimit).lean();

		const total = await Product.countDocuments(query);
		const totalPages = Math.ceil(total / parsedLimit);

		return {
			dishes: dishes.map((dish) => ({ ...dish, quantity: 0, _id: dish._id.toString() })),
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
