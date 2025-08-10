import DishesGrid from "./top-dishes-gird";

export default function TopDishes({ dishes }) {
	return (
		<section className="flex flex-col">
			<h2 className="heading mb-8">Top dishes near you</h2>

			<DishesGrid dishes={dishes} />
		</section>
	);
}
