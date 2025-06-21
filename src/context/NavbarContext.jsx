"use client";
import { createContext, useState } from "react";

export const NavbarContext = createContext({});

export const Provider = ({ children }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	function closeMenu() {
		if (isMenuOpen) setIsMenuOpen(false);
	}

	function openMenu() {
		if (!isMenuOpen) setIsMenuOpen(true);
	}

	return (
		<NavbarContext value={{ isMenuOpen, closeMenu, openMenu }}>
			{children}
		</NavbarContext>
	);
};
