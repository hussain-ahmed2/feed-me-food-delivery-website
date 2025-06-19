"use client";

import Link from "next/link";
import Logo from "../logo";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import NavLinks from "./navlinks";
import RightLinks from "./rightlinks";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const openMenu = () => {
		if (!isMenuOpen) {
			setIsMenuOpen(true);
		}
	};

	const closeMenu = () => {
		if (isMenuOpen) {
			setIsMenuOpen(false);
		}
	};

	return (
		<nav className="max-w-7xl mx-auto min-h-20 flex items-center justify-between px-4">
			{/* logo */}
			<Link href="/">
				<Logo />
			</Link>

			{/* centered links */}
			<NavLinks isMenuOpen={isMenuOpen} closeMenu={closeMenu} />

			{/* right links */}
			<RightLinks closeMenu={closeMenu} />

			{/* mobile nav-links toggle btn */}
			<div className="md:hidden">
				{isMenuOpen ? (
					<button
						className="p-2 hover:bg-gray-200 active:bg-gray-100 transition duration-300 rounded-md"
						onClick={closeMenu}
					>
						<X />
					</button>
				) : (
					<button
						className="p-2 hover:bg-gray-200 active:bg-gray-100 transition duration-300 rounded-md"
						onClick={openMenu}
					>
						<Menu />
					</button>
				)}
			</div>
		</nav>
	);
}
