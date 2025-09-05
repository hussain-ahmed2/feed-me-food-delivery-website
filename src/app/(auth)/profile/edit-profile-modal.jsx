"use client";

import { useProfileStore } from "@/store/profile.store";
import { profileSchema } from "@/lib/validation-schema";
import { updateUserProfile } from "@/actions/auth";
import { X, Save } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function EditProfileModal() {
	const { isEditModalOpen, formData, isLoading, closeEditModal, setLoading } = useProfileStore();

	const router = useRouter();

	// react-hook-form setup
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: formData?.name || "",
			email: formData?.email || "",
		},
		mode: "onChange",
	});

	// Sync reset with store formData when modal opens
	useEffect(() => {
		if (isEditModalOpen) {
			reset(formData);
		}
	}, [isEditModalOpen, formData, reset]);

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			const result = await updateUserProfile(data);

			if (result.success) {
				toast.success("Profile updated successfully!");
				closeEditModal();
				router.refresh();
			} else {
				toast.error(result.message || "Failed to update profile");
			}
		} catch (error) {
			console.error("Profile update error:", error);
			toast.error("An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	};

	const handleClose = () => {
		if (!isLoading) closeEditModal();
	};

	// Handle ESC key
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape" && !isLoading) {
				closeEditModal();
			}
		};

		if (isEditModalOpen) {
			document.addEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "unset";
		};
	}, [isEditModalOpen, isLoading, closeEditModal]);

	if (!isEditModalOpen) return null;

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			{/* Backdrop */}
			<div className="fixed inset-0 bg-black/50 bg-opacity-50 transition-opacity" onClick={handleClose}></div>

			{/* Modal */}
			<div className="flex items-center justify-center min-h-full p-4">
				<div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
					{/* Header */}
					<div className="flex items-center justify-between p-6 border-b border-gray-200">
						<h2 className="text-lg font-semibold text-gray-900">Edit Profile</h2>
						<button onClick={handleClose} disabled={isLoading} className="text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed">
							<X className="w-5 h-5" />
						</button>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
						{/* Name Field */}
						<div className="space-y-2">
							<label htmlFor="name" className="text-sm font-medium text-gray-700">
								Full Name
							</label>
							<input
								type="text"
								id="name"
								{...register("name")}
								disabled={isLoading}
								className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed ${
									errors.name ? "border-red-500 bg-red-50" : "border-gray-300"
								}`}
								placeholder="Enter your full name"
								autoComplete="name"
							/>
							{errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
						</div>

						{/* Email Field */}
						<div className="space-y-2">
							<label htmlFor="email" className="text-sm font-medium text-gray-700">
								Email Address
							</label>
							<input
								type="email"
								id="email"
								{...register("email")}
								disabled={isLoading}
								className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed ${
									errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
								}`}
								placeholder="Enter your email address"
								autoComplete="email"
							/>
							{errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
						</div>

						{/* Action Buttons */}
						<div className="flex gap-3 pt-4">
							<button
								type="submit"
								disabled={isLoading || !isValid}
								className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed rounded-lg transition-colors">
								<Save className="w-4 h-4" />
								{isLoading ? "Saving..." : "Save Changes"}
							</button>
							<button
								type="button"
								onClick={handleClose}
								disabled={isLoading}
								className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed rounded-lg transition-colors">
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
