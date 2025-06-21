"use client";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { logout } from "@/lib/utils";

export default function LogoutButton() {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState(action, null);

	async function action() {
		const res = await logout();
		if (res.success) {
			router.refresh();
		}
	}
	return (
		<form action={formAction}>
			<button type="submit" className="btn-danger" disabled={isPending}>
				Logout
			</button>
		</form>
	);
}
