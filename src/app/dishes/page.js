import DishesGrid from "@/components/dishes/dishes-grid";

export default function DishesPage() {
	return (
		<div className="page space-y-10">
			<h2 className="heading">All Dishes</h2>

			<DishesGrid />
		</div>
	);
}
