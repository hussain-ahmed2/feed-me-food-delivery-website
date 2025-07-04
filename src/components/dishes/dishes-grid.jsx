"use client";

import Product from "../home/product";
import Pagination from "./pagination";
import ProductsSkeleton from "../skeletons/products-skeleton";

export default function DishesGrid({
	products,
	loading,
	page,
	totalPages,
	handlePageChange,
}) {
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
					<Pagination
						totalPages={totalPages}
						currentPage={page}
						onPageChange={handlePageChange}
					/>
				</>
			) : (
				<div>No dishes found!</div>
			)}
		</div>
	);
}
