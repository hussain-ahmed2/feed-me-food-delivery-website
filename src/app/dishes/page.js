"use client";

import DishesGrid from "@/components/dishes/dishes-grid";
import DropDownMenu from "@/components/DropDownMenu";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function DishesPage() {
	const router = useRouter();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(1);

	const searchParams = useSearchParams();
	const searchQuery = searchParams.get("search_query") || "";
	const [searchQ, setSearchQ] = useState(searchQuery);
	const page = parseInt(searchParams.get("page") || 1);
	const category = searchParams.get("category") || "";
	const [categoryFilter, setCategoryFilter] = useState(category);
	const debouncedSearchQuery = useDebounce(searchQ, 500);

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
				if (debouncedSearchQuery) {
					params.append("search_query", debouncedSearchQuery);
					params.set("page", 1);
				}
				if (categoryFilter) {
					params.append("category", categoryFilter);
					params.set("page", 1);
				}

				if (window) window.scrollTo(0, 0);
				router.push(`?${params.toString()}`);

				const response = await fetch(`/api/products?${params.toString()}`);
				const data = await response.json();
				setProducts(data.dishes);
				setTotalPages(Number(data.totalPages));
			} catch (error) {
				console.error("Error fetching products:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [page, debouncedSearchQuery, categoryFilter, router]);

	return (
		<Suspense>
			<div className="page space-y-10">
				<h2 className="heading">All Dishes</h2>

				<div className="flex gap-2 items-center justify-between">
					<div className="flex items-center min-w-1/2 max-sm:flex-col max-sm:items-start max-sm:gap-1">
						<p className="mr-2">Filter by:</p>
						<DropDownMenu value={categoryFilter} setValue={setCategoryFilter} />
					</div>
					<div className="flex items-center min-w-1/2 max-sm:flex-col max-sm:items-start max-sm:gap-1">
						<p className="mr-2">Search:</p>
						<input
							type="text"
							value={searchQ}
							onChange={(e) => setSearchQ(e.target.value)}
							className="w-full border border-gray-200 p-2 rounded-md outline-none focus:ring-2 focus:border-emerald-500 ring-emerald-500"
							placeholder="Search dishes..."
						/>
					</div>
				</div>

				<DishesGrid products={products} loading={loading} page={Number(page)} totalPages={totalPages} handlePageChange={handlePageChange} />
			</div>
		</Suspense>
	);
}
