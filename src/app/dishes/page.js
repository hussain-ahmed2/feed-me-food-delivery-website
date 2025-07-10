"use client";

import DishesGrid from "@/components/dishes/dishes-grid";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function DishesPage() {
	const router = useRouter();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(1);
	const [searchQ, setSearchQ] = useState("");

	const searchParams = useSearchParams();
	const searchQuery = searchParams.get("search_query") || "";
	const page = parseInt(searchParams.get("page") || 1);
	const category = searchParams.get("category") || "";
	const debouncedSearchQuery = useDebounce(searchQ, 1000);

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
				if (debouncedSearchQuery) params.append("search_query", debouncedSearchQuery);
				if (category) params.append("category", category);

				if (window) window.scrollTo(0, 0);

				const response = await fetch(`/api/products?${params.toString()}`);
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
	}, [page, debouncedSearchQuery, category]);

	return (
		<Suspense>
			<div className="page space-y-10">
				<h2 className="heading">All Dishes</h2>

				<div className="flex gap-2 items-center justify-between">
					<div></div>
					<div>
						<input
							type="text"
							value={searchQ}
							onChange={(e) => setSearchQ(e.target.value)}
							className="border !border-gray-200 p-2 rounded-md outline-none focus:ring-2 focus:border-emerald-500 ring-emerald-500"
							placeholder="Search dishes..."
						/>
					</div>
				</div>

				<DishesGrid products={products} loading={loading} page={Number(page)} totalPages={totalPages} handlePageChange={handlePageChange} />
			</div>
		</Suspense>
	);
}
