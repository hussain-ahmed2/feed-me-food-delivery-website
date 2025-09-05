import { ArrowRight, ScrollTextIcon, User2 } from "lucide-react";
import { Suspense } from "react";
import IconLink from "./icon-link";
import { getUser } from "@/actions/auth";
import CartIconWithCount from "./cart-icon-with-count";

export default function RightLinks() {
	return (
		<ul className="flex items-center gap-8">
			<li>
				<IconLink href="/cart">
					<div className="flex item-center gap-1.5">
						<CartIconWithCount />
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
					<li className="hidden md:block">
						<IconLink href="/orders">
							<div className="flex items-center gap-1.5">
								<ScrollTextIcon /> Orders
							</div>
						</IconLink>
					</li>
					<li>
						<IconLink href="/profile">
							<div className="flex items-center gap-1.5">
								<User2 /> Profile
							</div>
						</IconLink>
					</li>
				</>
			) : (
				<li>
					<IconLink href="/login">
						<div className="flex items-center gap-1.5">
							<ArrowRight /> Login
						</div>
					</IconLink>
				</li>
			)}
		</>
	);
}
