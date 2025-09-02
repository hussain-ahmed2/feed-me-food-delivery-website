"use client";

import { useRouter } from "next/navigation";

export default function SearchDishes() {
	const router = useRouter();

	function handleSearch(searchQ) {
		const searchParams = new URLSearchParams(window.location.search);
		searchParams.set("search_query", searchQ);
		searchParams.set("page", 1);
		router.push(`?${searchParams.toString()}`);
	}

	return (
		<div className="flex items-center min-w-1/2 max-sm:flex-col max-sm:items-start max-sm:gap-1">
			<p className="mr-2">Search:</p>
			<input
				type="text"
				onChange={(e) => handleSearch(e.target.value)}
				className="w-full border border-gray-200 p-2 rounded-md outline-none focus:ring-2 focus:border-emerald-500 ring-emerald-500"
				placeholder="Search dishes..."
			/>
		</div>
	);
}
