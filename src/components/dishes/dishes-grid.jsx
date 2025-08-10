import Product from "../home/product";
import Pagination from "./pagination";
import ProductsSkeleton from "../skeletons/products-skeleton";

export default function DishesGrid({ products, loading, page, totalPages }) {
	return (
		<div>
			{loading ? (
				<ProductsSkeleton />
			) : products.length ? (
				<>
					<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{products.map((product) => (
							<Product key={product._id} product={product} />
						))}
					</div>

					{/* Pagination */}
					<Pagination totalPages={totalPages} currentPage={page} />
				</>
			) : (
				<div>No dishes found!</div>
			)}
		</div>
	);
}
