import { useShop } from "@/context/shop-context";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination() {
	const { page, setPage, total, limit, fetchDishes } = useShop();
	const totalPages = Math.ceil(total / limit);
	const router = useRouter();
	const params = useSearchParams();

	const handleNavigation = async (newPage) => {
		const newParams = new URLSearchParams(params.toString());
		newParams.set("page", newPage.toString());
		router.push(`?${newParams.toString()}`);
		setPage(newPage);
		await fetchDishes(newParams.toString());
	};

	return (
		<div className="flex justify-center items-center gap-4 mt-6">
			{page > 1 && (
				<button
					className="btn-secondary"
					onClick={() => handleNavigation(page - 1)}
				>
					Previous
				</button>
			)}

			<span>
				Page {page} of {totalPages}
			</span>

			{page < totalPages && (
				<button
					className="btn-secondary"
					onClick={() => handleNavigation(page + 1)}
				>
					Next
				</button>
			)}
		</div>
	);
}
