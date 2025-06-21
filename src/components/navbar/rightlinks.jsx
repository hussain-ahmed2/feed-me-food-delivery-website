import { getUser } from "@/actions/auth";
import { ArrowRight, ShoppingCart, User2 } from "lucide-react";
import { Suspense } from "react";
import IconLink from "./icon-link";

export default function RightLinks() {
	return (
		<ul className="flex items-center gap-8">
			<li>
				<IconLink href="/cart">
					<div className="flex item-center gap-1.5">
						<span className="relative">
							<ShoppingCart />
							<div
								className={`h-1.25 w-1.25 rounded-full bg-emerald-500 absolute top-0 right-0 transition duration-300 ${
									0 ? "" : "opacity-0 invisible"
								}`}
							></div>
						</span>
						Cart
					</div>
				</IconLink>
			</li>

			<Suspense fallback={<div>Loading...</div>}>
				<ProtectedLinks />
			</Suspense>
		</ul>
	);
}

export async function ProtectedLinks() {
	const user = await getUser();
	return (
		<>
			{user ? (
				<>
					<li>
						<IconLink href="/profile">
							<div className="flex items-center gap-1.5">
								<User2 /> Profile
							</div>
						</IconLink>
					</li>
				</>
			) : (
				<>
					<li>
						<IconLink href="/login">
							<div className="flex items-center gap-1.5">
								<ArrowRight /> Login
							</div>
						</IconLink>
					</li>
				</>
			)}
		</>
	);
}
