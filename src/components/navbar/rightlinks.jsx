import { useAuth } from "@/context/auth-context";
import { ArrowRight, Loader, ShoppingCart, User2 } from "lucide-react";
import Link from "next/link";

export default function RightLinks({ closeMenu }) {
	return (
		<ul className="flex items-center gap-8">
			<li onClick={closeMenu}>
				<Link className="icon-link" href="/cart">
					<div className="flex item-center gap-1.5">
						<ShoppingCart /> Cart
					</div>
				</Link>
			</li>

			<ProtectedLinks closeMenu={closeMenu} />
		</ul>
	);
}

export function ProtectedLinks({ closeMenu }) {
	const { user, isLoading } = useAuth();

	return (
		<>
			{isLoading ? (
				<li className="animate-spin">
					<Loader />
				</li>
			) : user ? (
				<>
					<li onClick={closeMenu}>
						<Link className="icon-link" href="/profile">
							<div className="flex items-center gap-1.5">
								<User2 /> Profile
							</div>
						</Link>
					</li>
				</>
			) : (
				<>
					<li onClick={closeMenu}>
						<Link className="icon-link" href="/login">
							<div className="flex items-center gap-1.5">
								<ArrowRight /> Login
							</div>
						</Link>
					</li>
				</>
			)}
		</>
	);
}
