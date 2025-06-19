import { Suspense } from "react";
import DishesGrid from "./dishes-gird";

export default function TopDishes() {
	return (
		<section className="flex flex-col">
			<h2 className="heading mb-8">Top dishes near you</h2>

			<Suspense fallback={<div>Loading dishes...</div>}>
				<DishesGrid />
			</Suspense>
		</section>
	);
}
