"use client";
import { useNavbarStore } from "@/store/navbar.store";
import { Menu, X } from "lucide-react";

export function MobileLinkToggleButton() {
	const setIsOpen = useNavbarStore((state) => state.setIsOpen);
	const isMenuOpen = useNavbarStore((state) => state.isOpen);

	const openMenu = () => setIsOpen(true);
	const closeMenu = () => setIsOpen(false);
	return (
		<div className="md:hidden">
			{isMenuOpen ? (
				<button className="p-2 hover:bg-gray-200 active:bg-gray-100 transition duration-300 rounded-md" onClick={closeMenu}>
					<X />
				</button>
			) : (
				<button className="p-2 hover:bg-gray-200 active:bg-gray-100 transition duration-300 rounded-md" onClick={openMenu}>
					<Menu />
				</button>
			)}
		</div>
	);
}
