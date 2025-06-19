import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
	try {
		(await cookies()).delete("token");
		return NextResponse.json({
			success: true,
			message: "Logout Successful",
		});
	} catch (error) {
		return NextResponse.json(
			{ success: false, message: "Internal server error" },
			{ status: 500 }
		);
	}
}
