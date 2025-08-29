"use client";
import { useNavbarStore } from "@/store/navbar.store";
import { use } from "react";

export default function Logo() {
	return (
		<div className="font-black text-2xl">
			<span className="text-emerald-500">Feed</span>
			<span className="text-amber-500">Me</span>
		</div>
	);
}

export function NavbarLogo() {
	const setIsOpen = useNavbarStore((state) => state.setIsOpen);
	const closeMenu = () => setIsOpen(false);

	return (
		<div onClick={closeMenu} className="font-black text-2xl">
			<span className="text-emerald-500">Feed</span>
			<span className="text-amber-500">Me</span>
		</div>
	);
}
