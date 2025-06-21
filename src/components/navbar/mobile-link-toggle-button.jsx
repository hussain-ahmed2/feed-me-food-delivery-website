"use client";
import { Menu, X } from "lucide-react";
import { use } from "react";
import { NavbarContext } from "@/context/NavbarContext";

export function MobileLinkToggleButton() {
	const { isMenuOpen, closeMenu, openMenu } = use(NavbarContext);
	return (
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
	);
}
