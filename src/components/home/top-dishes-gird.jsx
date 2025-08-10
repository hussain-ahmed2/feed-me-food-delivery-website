import Product from "./product";
import Link from "next/link";

export default function DishesGrid({ dishes }) {
	return (
		<div>
			{dishes.length ? (
				<>
					<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">
						{dishes.map((product) => (
							<Product key={product._id} product={product} />
						))}
					</div>
					<Link href="/dishes" className="btn-success mt-5 block w-fit mx-auto">
						View more
					</Link>
				</>
			) : (
				<div>No dishes found!</div>
			)}
		</div>
	);
}
