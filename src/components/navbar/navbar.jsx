import Link from "next/link";
import { NavbarLogo } from "../logo";
import NavLinks from "./navlinks";
import RightLinks from "./rightlinks";
import { MobileLinkToggleButton } from "./mobile-link-toggle-button";

export default function Navbar() {
	return (
		<nav className="max-w-7xl mx-auto min-h-20 flex items-center justify-between px-4">
			{/* logo */}
			<Link href="/">
				<NavbarLogo />
			</Link>

			{/* centered links */}
			<NavLinks />

			{/* right links */}
			<RightLinks />

			{/* mobile nav-links toggle btn */}
			<MobileLinkToggleButton />
		</nav>
	);
}
