"use server";

import { decodeToken, generateToken } from "@/lib/utils";
import { getZodErrors, loginSchema, registerSchema } from "@/lib/validation-schema";
import { connectDB } from "@/mongodb/connectDB";
import User from "@/mongodb/models/user";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

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

export async function registerUser(credentials = {}) {
	try {
		const { success, data, error } = registerSchema.safeParse(credentials);

		if (!success) {
			return { success: false, errors: getZodErrors(error), message: error.message };
		}

		await connectDB();

		const userExists = await User.findOne({ email: data.email });

		if (userExists) {
			return { success: false, errors: { email: "User already exists with this email" }, message: "User already exists" };
		}

		const user = await User.create(data);

		const token = generateToken({ id: user._id });
		const cookieStore = await cookies();
		cookieStore.set("token", token);

		return { success: true, data: { token }, token, message: "User registered successfully" };
	} catch (error) {
		console.error(error);
		return { success: false, errors: { server: true }, message: "Something went wrong!" };
	}
}

export async function loginUser(credentials = {}) {
	try {
		const { success, data, error } = loginSchema.safeParse(credentials);

		if (!success) {
			return { success: false, errors: getZodErrors(error), message: error.message };
		}

		await connectDB();

		const user = await User.findOne({ email: data.email });

		if (!user) {
			return { success: false, errors: { email: "User does not exist with this email" }, message: "User does not exist" };
		}

		const passwordMatch = await bcrypt.compare(data.password, user.password);

		if (!passwordMatch) {
			return { success: false, errors: { password: "Password does not match" }, message: "Password does not match" };
		}

		const token = generateToken({ id: user._id });
		const cookieStore = await cookies();
		cookieStore.set("token", token);

		return { success: true, data: { token }, message: "User logged in successfully" };
	} catch (error) {
		console.error(error);
		return { success: false, errors: { server: true }, message: "Something went wrong!" };
	}
}
