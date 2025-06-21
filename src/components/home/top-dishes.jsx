import { Suspense } from "react";
import DishesGrid from "./top-dishes-gird";

export default function TopDishes() {
	return (
		<section className="flex flex-col">
			<h2 className="heading mb-8">Top dishes near you</h2>

			<Suspense fallback={<div>Loading...</div>}>
				<DishesGrid />
			</Suspense>
		</section>
	);
}
