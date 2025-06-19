"use client";

import { useShop } from "@/context/shop-context";
import Product from "../home/product";
import Pagination from "./pagination";

export default function DishesGrid() {
	const { dishes, page, isLoading, total, limit } = useShop();

	return (
		<div>
			{isLoading ? (
				<div>Loading dishes...</div>
			) : dishes.length ? (
				<>
					<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{dishes.map((product) => (
							<Product key={product._id} product={product} />
						))}
					</div>

					{/* Pagination */}
					<Pagination />
				</>
			) : (
				<div>No dishes found!</div>
			)}
		</div>
	);
}
