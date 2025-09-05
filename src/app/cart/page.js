import { getUser } from "@/actions/auth";
import CartItems from "./CartItems";
import { redirect } from "next/navigation";

export default async function page() {
	const user = await getUser();

	if (!user) {
		redirect("/login");
	}

	const userId = user._id.toString();

	return (
		<div className="page animate-fade-in">
			<h1 className="heading mb-10">Cart</h1>
			<div>
				<CartItems userId={userId} />
			</div>
		</div>
	);
}
