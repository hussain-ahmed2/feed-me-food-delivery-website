"use server";

import { decodeToken } from "@/lib/utils";
import { connectDB } from "@/mongodb/connectDB";
import User from "@/mongodb/models/user";
import { cookies } from "next/headers";

export async function getUser() {
	try {
		const cookieStore = await cookies();

		const token = cookieStore.get("token")?.value;
		if (!token) {
			return null;
		}

		const { id } = decodeToken(token);
		if (!id) {
			return null;
		}

		await connectDB();
		const user = await User.findById(id).select("-password");

		return user;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function registerUser(formData) {
	console.log(Object.entries(formData.entries()));
}
