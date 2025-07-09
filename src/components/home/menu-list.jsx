"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function MenuList({ menu_image, menu_name }) {
	const router = useRouter();
	return (
		<li onClick={() => router.push(`/dishes?category=${menu_name}`)} className="space-y-3 text-center group">
			<div className={`w-20 md:w-30 h-20 md:h-30 ring-emerald-500 m-1 rounded-full transition duration-300 group-hover:ring-4`}>
				<Image className="w-full aspect-square" src={menu_image} width={100} height={100} alt={menu_name} />
			</div>
			<h4 className={`font-semibold md:text-lg transition-colors duration-300 group-hover:text-emerald-500`}>{menu_name}</h4>
		</li>
	);
}
