import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, query: { limit, page, search_query, category } }) {
	const getLink = (page) => {
		const searchParams = new URLSearchParams();
		if (search_query) searchParams.set("search_query", search_query);
		if (category) searchParams.set("category", category);
		searchParams.set("page", page);
		return `?${searchParams.toString()}`;
	};

	const onPageChange = (page) => {
		const searchParams = new URLSearchParams(window.location.search);
		searchParams.set("page", page);
		router.push(`?${searchParams.toString()}`);
	};

	const createPageArray = () => {
		const pages = [];

		if (totalPages <= 5) {
			for (let i = 1; i <= totalPages; i++) pages.push(i);
		} else {
			if (currentPage <= 3) {
				pages.push(1, 2, 3, "...", totalPages);
			} else if (currentPage >= totalPages - 2) {
				pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
			} else {
				pages.push(1, "...", currentPage, "...", totalPages);
			}
		}

		return pages;
	};

	const pages = createPageArray();

	return (
		<div className="flex gap-2 items-center justify-center mt-6">
			{/* Previous */}
			<Link
				prefetch={true}
				href={getLink(currentPage - 1)}
				className={`w-9 h-9 rounded-full flex items-center justify-center border transition cursor-pointer disabled:cursor-not-allowed ${
					currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none" : "bg-white border-emerald-500 text-emerald-500 hover:bg-emerald-100"
				}`}>
				<ChevronLeft size={16} />
			</Link>

			{/* Page Numbers */}
			{pages.map((page, index) =>
				page === "..." ? (
					<span key={index} className="px-2 text-gray-500">
						...
					</span>
				) : (
					<Link
						key={index}
						prefetch={true}
						href={getLink(page)}
						className={`w-9 h-9 rounded-full flex items-center justify-center border transition cursor-pointer disabled:cursor-not-allowed ${
							page === currentPage ? "bg-emerald-500 text-white" : "bg-white border-emerald-500 text-emerald-500 hover:bg-emerald-100"
						}`}>
						{page}
					</Link>
				)
			)}

			{/* Next */}
			<Link
				prefetch={true}
				href={getLink(currentPage + 1)}
				className={`w-9 h-9 rounded-full flex items-center justify-center border transition cursor-pointer disabled:cursor-not-allowed ${
					currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none" : "bg-white border-emerald-500 text-emerald-500 hover:bg-emerald-100"
				}`}>
				<ChevronRight size={16} />
			</Link>
		</div>
	);
}
