import { checkPasswordMatch, generateToken } from "@/lib/utils";
import { connectDB } from "@/mongodb/connectDB";
import User from "@/mongodb/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
	try {
		const { email, password } = await request.json();

		// validate email pattern
		if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
			return NextResponse.json(
				{
					success: false,
					errors: { email: "Please enter a valid email" },
				},
				{ status: 400 }
			);
		}

		// validate password
		if (!password.trim()) {
			return NextResponse.json(
				{
					success: false,
					errors: { password: "Password is required" },
				},
				{ status: 400 }
			);
		}

		// connect the database
		await connectDB();

		// find a user that matches with the email
		const existingUser = await User.findOne({ email });

		// if there is no user with email
		if (!existingUser) {
			return NextResponse.json(
				{
					success: false,
					errors: { email: "Email is not registered" },
				},
				{ status: 400 }
			);
		}

		// if there is user check the password
		const isPasswordMatched = await checkPasswordMatch(
			password,
			existingUser.password
		);

		// if password did not match
		if (!isPasswordMatched) {
			return NextResponse.json(
				{
					success: false,
					errors: { password: "Password did not matched" },
				},
				{ status: 400 }
			);
		}

		// generate token
		const token = generateToken({ id: existingUser._id });

		const response = NextResponse.json({
			success: true,
			message: "Login Successful",
			user: {
				name: existingUser.name,
				email: existingUser.email,
				avatar: existingUser.avatar,
			},
		});
		response.cookies.set("token", token, { httpOnly: true, maxAge: 3600 }); // token last 1 hour
		return response;
	} catch (error) {
		return NextResponse.json(
			{ success: false, message: "Internal server error" },
			{ status: 500 }
		);
	}
}
