"use client";
import { useAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";

export default function LogoutButton() {
	const { logout, isLoading } = useAuth();

	async function handleClick() {
		await logout();
		redirect("/login");
	}
	return (
		<button
			onClick={handleClick}
			className="btn-danger"
			disabled={isLoading}
		>
			Logout
		</button>
	);
}
