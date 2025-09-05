"use client";

import { useProfileStore } from "@/store/profile.store";
import { User, Mail, Edit3 } from "lucide-react";

export default function ProfileView({ user }) {
	const { openEditModal } = useProfileStore();
	return (
		<div className="space-y-6">
			{/* Profile Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
						<User className="w-8 h-8 text-green-600" />
					</div>
					<div>
						<h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
						<p className="text-gray-600">Member since {new Date(user?.createdAt || Date.now()).getFullYear()}</p>
					</div>
				</div>
				<button
					onClick={() => openEditModal(user)}
					className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
					<Edit3 className="w-4 h-4" />
					Edit Profile
				</button>
			</div>

			{/* Profile Details */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-2">
					<label className="text-sm font-medium text-gray-700 flex items-center gap-2">
						<User className="w-4 h-4" />
						Full Name
					</label>
					<p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{user.name}</p>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium text-gray-700 flex items-center gap-2">
						<Mail className="w-4 h-4" />
						Email Address
					</label>
					<p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{user.email}</p>
				</div>
			</div>

			{/* Additional Info */}
			<div className="bg-green-50 border border-green-200 rounded-lg p-4">
				<h3 className="text-sm font-medium text-green-900 mb-1">Account Status</h3>
				<p className="text-sm text-green-700">Your account is active and verified.</p>
			</div>
		</div>
	);
}
