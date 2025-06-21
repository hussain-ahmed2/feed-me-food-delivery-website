import DishesGrid from "@/components/dishes/dishes-grid";
import { Suspense } from "react";

export default async function DishesPage({ searchParams }) {
	const params = await searchParams;
	return (
		<div className="page space-y-10">
			<h2 className="heading">All Dishes</h2>

			<Suspense fallback={<div>Loading...</div>}>
				<DishesGrid {...params} />
			</Suspense>
		</div>
	);
}
