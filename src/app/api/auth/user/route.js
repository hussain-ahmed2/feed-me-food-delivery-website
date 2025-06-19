import { decodeToken } from "@/lib/utils";
import { connectDB } from "@/mongodb/connectDB";
import User from "@/mongodb/models/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const token = (await cookies()).get("token")?.value || null;
		if (!token) throw new Error("Please provider a valid token");
		const { id } = decodeToken(token);
		if (!id) throw new Error("Please provide a valid token");
		await connectDB();
		const user = await User.findById(id).select("-password");
		if (!user) throw new Error("Please provide a valid token");
		return NextResponse.json({ success: true, user });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: 400 }
		);
	}
}
