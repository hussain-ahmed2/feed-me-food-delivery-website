import { getUser } from "@/actions/auth";
import LogoutButton from "@/components/logout-button";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
	const user = await getUser();
	if (!user) redirect("/login");
	return (
		<section className="page">
			<h1>ProfilePage</h1>
			<br />
			<LogoutButton />
		</section>
	);
}
