"use client";

import { menu_list } from "@/lib/menu-list";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function DropDownMenu({ value }) {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef(null);
	const router = useRouter();

	function handleToggle(name) {
		setIsOpen(!isOpen);

		if (!name) return;

		const searchParams = new URLSearchParams(window.location.search);
		if (name === "All") {
			searchParams.delete("category");
		} else {
			searchParams.set("category", name);
		}
		router.push(`?${searchParams.toString()}`);
	}

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div ref={ref} className="relative w-full max-w-60 min-w-32">
			<button className="block px-5 py-1.5 bg-white border border-gray-200 w-full text-left hover:bg-emerald-100 rounded transition duration-300 ease-in-out" onClick={() => handleToggle()}>
				{value || "All"}
			</button>

			<div
				className={`absolute top-full mt-1 z-30 bg-white border border-gray-200 shadow-sm rounded-md p-1 w-full transition transform duration-300 ease-in-out origin-top-left flex flex-col gap-0.5 ${
					isOpen ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-90"
				}`}>
				<button
					onClick={() => handleToggle("All")}
					className={`block px-5 py-1.5 w-full text-left rounded transition duration-300 ease-in-out ${value === "All" ? "bg-emerald-500 text-white" : "hover:bg-emerald-200"}`}>
					All
				</button>
				{menu_list.map((menu) => (
					<button
						className={`block px-5 py-1.5 w-full text-left rounded transition duration-300 ease-in-out ${value === menu.menu_name ? "bg-emerald-500 text-white" : "hover:bg-emerald-200"}`}
						onClick={() => handleToggle(menu.menu_name)}
						key={menu.menu_name}>
						{menu.menu_name}
					</button>
				))}
			</div>
		</div>
	);
}
