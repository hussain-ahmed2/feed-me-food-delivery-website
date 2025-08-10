import Product from "../home/product";
import Pagination from "./pagination";
import { getDishes } from "@/actions/shop";

export default async function DishesGrid({ query: { page, limit, search_query, category } }) {
	const { dishes, pagination } = await getDishes({ limit, page, search_query, category });

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
					<Pagination query={{ limit, page, search_query, category }} totalPages={Number(pagination.totalPages)} currentPage={Number(page)} />
				</>
			) : (
				<div>No dishes found!</div>
			)}
		</div>
	);
}
