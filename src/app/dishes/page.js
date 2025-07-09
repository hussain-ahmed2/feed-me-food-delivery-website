"use client";

import DishesGrid from "@/components/dishes/dishes-grid";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function DishesPage() {
	const router = useRouter();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const [totalPages, setTotalPages] = useState(1);

	const searchParams = useSearchParams();
	const searchQuery = searchParams.get("search_query") || "";
	const page = searchParams.get("page") || 1;

	const handlePageChange = (newPage) => {
		const searchParams = new URLSearchParams(window.location.search);
		searchParams.set("page", newPage);
		router.push(`?${searchParams.toString()}`);
	};

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const params = new URLSearchParams();
				if (page) params.append("page", page);
				if (searchQuery) params.append("search_query", searchQuery);

				if (window) window.scrollTo(0, 0);

				const response = await fetch(
					`/api/products?${params.toString()}`
				);
				const data = await response.json();
				setProducts(data.dishes);
				setTotalPages(Number(data.totalPages));
				console.log(data);
			} catch (error) {
				console.error("Error fetching products:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [page, searchQuery]);

	return (
		<Suspense>
			<div className="page space-y-10">
				<h2 className="heading">All Dishes</h2>

				<DishesGrid
					products={products}
					loading={loading}
					page={Number(page)}
					totalPages={totalPages}
					handlePageChange={handlePageChange}
				/>
			</div>
		</Suspense>
	);
}
