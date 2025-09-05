import z from "zod/v3";

const userSchema = z.object({
	name: z.string().trim().min(3, { message: "Name must be at least 3 characters long" }).max(30, { message: "Name must be at most 30 characters long" }),
	email: z.string().email({ message: "Please enter a valid email" }).trim(),
	password: z.string().trim().min(6, { message: "Password must be at least 6 characters long" }).max(30, { message: "Password must be at most 30 characters long" }),
	avatar: z.string().trim().optional(),
});

export const registerSchema = userSchema
	.omit({ avatar: true })
	.extend({ confirmPassword: z.string().trim().min(6, { message: "Password must be at least 6 characters long" }).max(30, { message: "Password must be at most 30 characters long" }) })
	.refine(({ password, confirmPassword }) => password === confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });

export const loginSchema = userSchema.pick({ email: true, password: true });

export function getZodErrors(error) {
	const errors = error.formErrors.fieldErrors;
	const result = {};

	for (const key in errors) {
		if (Array.isArray(errors[key])) {
			result[key] = errors[key][0];
		}
	}

	return result;
}

export const profileSchema = z.object({
	name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
	email: z.string().email("Please enter a valid email address").min(1, "Email is required"),
});
