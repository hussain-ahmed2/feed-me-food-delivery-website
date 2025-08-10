import { getDishes } from "@/actions/shop";
import AppDownload from "@/components/home/app-download";
import Banner from "@/components/home/banner";
import Menu from "@/components/home/explore-menu";
import TopDishes from "@/components/home/top-dishes";

export default async function Home() {
	const { dishes } = await getDishes({ limit: 4 });

	return (
		<div className="page space-y-10">
			<Banner />
			<Menu />
			<TopDishes dishes={dishes} />
			<AppDownload />
		</div>
	);
}
