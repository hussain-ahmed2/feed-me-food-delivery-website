import { connectDB } from "@/mongodb/connectDB";
import Product from "@/mongodb/models/product";
import { NextResponse } from "next/server";

export async function GET(req) {
	try {
		await connectDB();

		const { searchParams } = new URL(req.url);
		const category = searchParams.get("category");
		const page = parseInt(searchParams.get("page")) || 1;
		const limit = parseInt(searchParams.get("limit")) || 12;
		const skip = (page - 1) * limit;

		const query = category ? { category } : {};

		const total = await Product.countDocuments(query);
		const dishes = await Product.find(query).skip(skip).limit(limit);
		const totalPages = Math.ceil(total / limit);

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
		return NextResponse.json(
			{ success: false, message: "Internal server error" },
			{ status: 500 }
		);
	}
}
