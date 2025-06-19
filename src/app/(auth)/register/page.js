"use client";

import InputField from "@/components/input-field";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useActionState, useRef } from "react";

export default function LoginPage() {
	const { register } = useAuth();

	const action = async (prevState, formData) => {
		const form = Object.fromEntries(formData.entries());

		const data = await register(form);

		if (!data.success) {
			const fieldName = Object.keys(data.errors)[0];
			focusInputField(fieldName);
		}

		if (data.success) redirect("/profile");

		return { form, ...data };
	};

	const [state, formAction, isPending] = useActionState(action, {});
	const inputRefs = useRef({});

	const focusInputField = (fieldName) => {
		if (inputRefs.current[fieldName]) {
			inputRefs.current[fieldName].focus();
		}
	};

	return (
		<section className="page justify-center items-center">
			<div className="w-full max-w-2xl">
				<h1 className="font-black text-center text-3xl md:text-4xl mb-4">
					Register
				</h1>
				<p className="text-center font-medium text-lg text-gray-700 mb-6">
					Create a new account here
				</p>
				<form action={formAction} className="flex flex-col gap-3">
					<InputField
						name="name"
						label="Name:"
						placeholder="Enter your name"
						defaultValue={state.form?.name}
						error={state.errors?.name}
						ref={inputRefs}
					/>
					<InputField
						name="email"
						label="Email:"
						type="email"
						placeholder="Enter your email"
						defaultValue={state.form?.email}
						error={state.errors?.email}
						ref={inputRefs}
					/>
					<InputField
						name="password"
						label="Password:"
						type="password"
						placeholder="Enter your password"
						defaultValue={state.form?.password}
						error={state.errors?.password}
						ref={inputRefs}
					/>
					<InputField
						name="confirmPassword"
						label="Confirm Password:"
						type="password"
						placeholder="Confirm your password"
						defaultValue={state.form?.confirmPassword}
						error={state.errors?.confirmPassword}
						ref={inputRefs}
					/>
					<button
						disabled={isPending}
						type="submit"
						className={`btn-success ${
							isPending ? "cursor-progress opacity-70" : ""
						}`}
					>
						Register
					</button>
				</form>
				<p className="mt-3 text-center">
					already have an account?{" "}
					<Link
						className="font-medium underline hover:text-emerald-500"
						href="/login"
					>
						Login
					</Link>
				</p>
			</div>
		</section>
	);
}
