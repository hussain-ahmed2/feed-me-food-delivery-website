"use client";
import { useNavbarStore } from "@/store/navbar.store";
import Link from "next/link";

export default function IconLink({ href, children }) {
	const setIsOpen = useNavbarStore((state) => state.setIsOpen);
	const closeMenu = () => setIsOpen(false);
	return (
		<Link onClick={closeMenu} className="icon-link" href={href}>
			{children}
		</Link>
	);
}
