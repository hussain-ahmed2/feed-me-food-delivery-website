import { getProducts } from "@/actions/product";
import Product from "./product";

export default async function DishesGrid() {
	const products = await getProducts();
	return (
		<div>
			{products.length ? (
				<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{products.map((product) => (
						<Product key={product._id} product={product} />
					))}
				</div>
			) : (
				<div>No products found!</div>
			)}
		</div>
	);
}
