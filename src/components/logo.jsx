"use client";
import { NavbarContext } from "@/context/NavbarContext";
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
	const { closeMenu } = use(NavbarContext);

	return (
		<div onClick={closeMenu} className="font-black text-2xl">
			<span className="text-emerald-500">Feed</span>
			<span className="text-amber-500">Me</span>
		</div>
	);
}
