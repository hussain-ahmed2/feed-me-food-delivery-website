import AppDownload from "@/components/home/app-download";
import Banner from "@/components/home/banner";
import Menu from "@/components/home/explore-menu";
import TopDishes from "@/components/home/top-dishes";

export default function Home() {
	return (
		<div className="page space-y-10">
			<Banner />
			<Menu />
			<TopDishes />
			<AppDownload />
		</div>
	);
}
