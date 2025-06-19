import { generateToken, hashPassword } from "@/lib/utils";
import { connectDB } from "@/mongodb/connectDB";
import User from "@/mongodb/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
	try {
		const { name, email, password, confirmPassword } = await request.json();
		const validationErrors = {};

		// validate name
		if (!name.trim()) {
			validationErrors.name = "Name is required";
		}

		// validate email pattern
		if (
			!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
				email.trim()
			)
		) {
			validationErrors.email = "Please enter a valid email";
		}

		// validate password
		if (!password.trim()) {
			validationErrors.password = "Password is required";
		}

		// validate confirmPassword
		if (!password.trim()) {
			validationErrors.confirmPassword = "Confirm password is required";
		}

		if (password.trim() !== confirmPassword.trim()) {
			validationErrors.confirmPassword = "Password did not match";
		}

		// if there is a key on validation errors object
		if (Object.keys(validationErrors).length) {
			return NextResponse.json({
				success: false,
				errors: validationErrors,
			});
		}

		// connect the database
		await connectDB();

		// find a user that matches with the email
		const existingUser = await User.findOne({ email: email.trim() });

		// if there is a user with email
		if (existingUser) {
			return NextResponse.json(
				{
					success: false,
					errors: { email: "Email is already registered" },
				},
				{ status: 400 }
			);
		}

		// if there is user create one
		const hashedPassword = await hashPassword(password.trim());
		const user = await User.create({
			name: name.trim(),
			email: email.trim(),
			password: hashedPassword,
		});

		// generate token
		const token = generateToken({ id: user._id });

		const response = NextResponse.json({
			success: true,
			message: "Registration successful",
			user: { name: user.name, email: user.email, avatar: user.avatar },
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
