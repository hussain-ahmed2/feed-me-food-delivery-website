import { create } from "zustand";

export const useProfileStore = create((set, get) => ({
	// Modal state
	isEditModalOpen: false,

	// Form data
	formData: {
		name: "",
		email: "",
	},

	// Form state
	errors: {},
	message: "",
	isLoading: false,

	// Actions
	openEditModal: (user) =>
		set({
			isEditModalOpen: true,
			formData: {
				name: user.name || "",
				email: user.email || "",
			},
			errors: {},
			message: "",
		}),

	closeEditModal: () =>
		set({
			isEditModalOpen: false,
			formData: { name: "", email: "" },
			errors: {},
			message: "",
		}),

	updateField: (field, value) =>
		set((state) => ({
			formData: {
				...state.formData,
				[field]: value,
			},
			errors: {
				...state.errors,
				[field]: null, // Clear error for this field
			},
			message: "",
		})),

	setErrors: (errors) => set({ errors }),
	setMessage: (message) => set({ message }),
	setLoading: (loading) => set({ isLoading: loading }),

	resetForm: () =>
		set({
			formData: { name: "", email: "" },
			errors: {},
			message: "",
		}),
}));
