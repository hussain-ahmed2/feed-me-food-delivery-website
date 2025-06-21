"use client";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Pagination({
	page,
	totalPages,
	hasNextPage,
	hasPrevPage,
}) {
	const searchParams = useSearchParams();

	const getQueryString = (newPage) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", newPage);
		return `?${params.toString()}`;
	};

	return (
		<div className="flex justify-center items-center gap-4 mt-6">
			{hasPrevPage && (
				<Link
					href={getQueryString(page - 1)}
					className="flex items-center hover:underline"
				>
					Previous <ChevronsLeft className="h-5" />
				</Link>
			)}

			<span>
				Page {page} of {totalPages}
			</span>

			{hasNextPage && (
				<Link
					href={getQueryString(page + 1)}
					className="flex items-center hover:underline"
				>
					Next <ChevronsRight className="h-5" />
				</Link>
			)}
		</div>
	);
}
