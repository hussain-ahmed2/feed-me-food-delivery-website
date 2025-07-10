import { connectDB } from "@/mongodb/connectDB";
import Product from "@/mongodb/models/product";
import { NextResponse } from "next/server";

export async function GET(req) {
	try {
		await connectDB();

		const { searchParams } = req.nextUrl;
		const page = parseInt(searchParams.get("page") || 1);
		const limit = parseInt(searchParams.get("limit") || 12);
		const search_query = searchParams.get("search_query") || "";
		const category = searchParams.get("category") || "";

		const skip = (page - 1) * limit;
		const searchRegex = new RegExp(search_query, "i");

		const query = search_query ? { name: { $regex: searchRegex } } : {};

		if (category) {
			query.category = category;
		}
		console.log(query);
		const total = await Product.countDocuments(query);
		const totalPages = Math.ceil(total / limit);

		const dishes = await Product.find(query).skip(skip).limit(limit);

		return NextResponse.json({
			success: true,
			dishes,
			total,
			page,
			limit,
			totalPages,
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
	}
}
