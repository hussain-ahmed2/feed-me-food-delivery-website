"use client";

import { useShop } from "@/context/shop-context";
import Image from "next/image";

export function MenuList({ menu_image, menu_name }) {
	const { category, pickCategory } = useShop();

	return (
		<li
			onClick={() => pickCategory(menu_name)}
			className="space-y-3 text-center"
		>
			<div
				className={`w-20 md:w-30 h-20 md:h-30 ring-emerald-500 m-1 rounded-full transition duration-300 ${
					category === menu_name ? "ring-4 shadow-xl" : ""
				}`}
			>
				<Image
					className="w-full aspect-square"
					src={menu_image}
					width={100}
					height={100}
					alt={menu_name}
				/>
			</div>
			<h4
				className={`font-semibold md:text-lg transition-colors duration-300 ${
					category === menu_name ? "text-emerald-500" : ""
				}`}
			>
				{menu_name}
			</h4>
		</li>
	);
}
