"use client";
import LogoutButton from "@/components/logout-button";
import { useAuth } from "@/context/auth-context";

export default function ProfilePage() {
	const { isLoading, user } = useAuth();

	if (isLoading || !user) return null;

	return (
		<section className="page">
			<h1>ProfilePage</h1>
			<br />
			<LogoutButton />
		</section>
	);
}
