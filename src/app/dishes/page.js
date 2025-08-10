import DishesGrid from "@/components/dishes/dishes-grid";
import SearchDishes from "@/components/dishes/search-dishes";
import DropDownMenu from "@/components/DropDownMenu";
import ProductsSkeleton from "@/components/skeletons/products-skeleton";
import { Suspense } from "react";

export default async function page({ searchParams }) {
	const searchP = await searchParams;
	const page = searchP?.page || 1;
	const category = searchP?.category || "All";
	const search_query = searchP?.search_query || "";
	const limit = searchP?.limit || 12;

	return (
		<div className="page space-y-10">
			<h2 className="heading">All Dishes</h2>

			<div className="flex gap-2 items-center justify-between">
				<div className="flex items-center min-w-1/2 max-sm:flex-col max-sm:items-start max-sm:gap-1">
					<p className="mr-2">Filter by:</p>
					<DropDownMenu value={category} />
				</div>
				<SearchDishes />
			</div>

			<Suspense fallback={<ProductsSkeleton />}>
				<DishesGrid query={{ limit, page, search_query, category }} />
			</Suspense>
		</div>
	);
}
