import { getUser } from "@/actions/auth";
import LogoutButton from "@/components/logout-button";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
	const user = await getUser();
	if (!user) redirect("/login");
	return (
		<section className="page">
			<div>
				<h1 className="text-3xl font-black mb-4">Profile</h1>
				<div className="flex flex-col items-center gap-4">
					<h2 className="text-xl font-medium">{user.name}</h2>
					<p className="text-gray-500">{user.email}</p>
					<LogoutButton />
				</div>
			</div>
		</section>
	);
}
