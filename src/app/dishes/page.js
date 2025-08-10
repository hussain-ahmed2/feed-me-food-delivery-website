import { getDishes } from "@/actions/shop";
import DishesGrid from "@/components/dishes/dishes-grid";
import SearchDishes from "@/components/dishes/search-dishes";
import DropDownMenu from "@/components/DropDownMenu";
import { Suspense } from "react";

export default async function page({ searchParams }) {
	const searchP = await searchParams;
	const page = searchP?.page || 1;
	const category = searchP?.category || "All";
	const search_query = searchP?.search_query || "";
	const limit = searchP?.limit || 12;

	const { dishes, pagination, params } = await getDishes({ limit, page, search_query, category });

	return (
		<Suspense>
			<div className="page space-y-10">
				<h2 className="heading">All Dishes</h2>

				<div className="flex gap-2 items-center justify-between">
					<div className="flex items-center min-w-1/2 max-sm:flex-col max-sm:items-start max-sm:gap-1">
						<p className="mr-2">Filter by:</p>
						<DropDownMenu value={params.category} />
					</div>
					<SearchDishes />
				</div>

				<DishesGrid products={dishes} page={Number(params.page)} totalPages={Number(pagination.totalPages)} />
			</div>
		</Suspense>
	);
}
