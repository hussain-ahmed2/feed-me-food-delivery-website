import { getUser } from "@/actions/auth";
import ProfileView from "./profile-view";
import EditProfileModal from "./edit-profile-modal";
import LogoutButton from "@/components/logout-button";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
	const data = await getUser();
	if (!data) redirect("/login");

	const user = JSON.parse(JSON.stringify(data));

	return (
		<div className="page">
			<div className="max-w-2xl w-full mx-auto">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
					<p className="text-gray-600">Manage your account information</p>
				</div>

				{/* Profile Card */}
				<div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
					<ProfileView user={user} />
				</div>

				{/* Actions */}
				<div className="flex justify-center">
					<LogoutButton />
				</div>

				{/* Edit Modal */}
				<EditProfileModal />
			</div>
		</div>
	);
}
