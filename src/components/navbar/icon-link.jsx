"use client";
import Link from "next/link";
import { NavbarContext } from "@/context/NavbarContext";
import { use } from "react";

export default function IconLink({ href, children }) {
	const { closeMenu } = use(NavbarContext);
	return (
		<Link onClick={closeMenu} className="icon-link" href={href}>
			{children}
		</Link>
	);
}
