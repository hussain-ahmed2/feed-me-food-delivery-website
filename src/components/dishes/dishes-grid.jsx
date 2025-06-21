import { getDishes } from "@/actions/shop";
import Product from "../home/product";
import Pagination from "./pagination";

export default async function DishesGrid({
	search_query = "",
	limit = 12,
	page = 1,
}) {
	const { dishes, pagination } = await getDishes({
		limit,
		page,
		search_query,
	});

	return (
		<div>
			{dishes.length ? (
				<>
					<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{dishes.map((product) => (
							<Product key={product._id} product={product} />
						))}
					</div>

					{/* Pagination */}
					<Pagination {...pagination} />
				</>
			) : (
				<div>No dishes found!</div>
			)}
		</div>
	);
}
