"use client";

import InputField from "@/components/input-field";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
	const router = useRouter();
	const { login } = useAuth();

	const action = async (prevState, formData) => {
		const form = Object.fromEntries(formData.entries());

		const data = await login(form);

		if (!data.success && data.errors) {
			const fieldName = Object.keys(data.errors)[0];
			focusInputField(fieldName);
		}

		if (data.success) {
			router.refresh();
		}

		return { form, ...data };
	};

	const [state, formAction, isPending] = useActionState(action, {
		success: false,
	});
	const inputRefs = useRef({});

	const focusInputField = (fieldName) => {
		if (inputRefs.current[fieldName]) {
			inputRefs.current[fieldName].focus();
		}
	};

	return (
		<section className="page justify-center items-center">
			<div className="w-full max-w-2xl">
				<h1 className="font-black text-center text-3xl md:text-4xl mb-4">Login</h1>
				<p className="text-center font-medium text-lg text-gray-700 mb-6">Login in to your account</p>
				<form action={formAction} className="flex flex-col gap-3">
					<InputField name="email" label="Email:" type="email" placeholder="Enter your email" defaultValue={state.form?.email} error={state.errors?.email} ref={inputRefs} />
					<InputField
						name="password"
						label="Password:"
						type="password"
						placeholder="Enter your password"
						defaultValue={state.form?.password}
						error={state.errors?.password}
						ref={inputRefs}
					/>
					<button disabled={isPending} type="submit" className={`btn-success ${isPending ? "cursor-progress opacity-70" : ""}`}>
						Login
					</button>
				</form>
				<p className="mt-3 text-center">
					don&#39;t have an account?{" "}
					<Link className="font-medium underline hover:text-emerald-500" href="/register">
						Register
					</Link>
				</p>
			</div>
		</section>
	);
}
