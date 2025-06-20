import { menu_list } from "@/lib/menu-list";
import { MenuList } from "./menu-list";

export default function ExploreMenu() {
	return (
		<section id="menu" className="space-y-8 animate-fade-in">
			<h2 className="heading">Explore our menu</h2>
			<p className="text-gray-700">
				Chose from a diverse menu featuring a delectable array of
				dishes. Our mission is to satisfy your carvings and elevate your
				dining experience, one delicious meal at a time.
			</p>

			<ul className="flex items-center justify-between gap-4 md:gap-8 overflow-x-auto scrollbar-hide">
				{menu_list.map((menu) => (
					<MenuList key={menu.menu_name} {...menu} />
				))}
			</ul>
		</section>
	);
}
