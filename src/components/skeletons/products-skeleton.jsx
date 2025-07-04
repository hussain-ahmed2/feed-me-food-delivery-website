import Skeleton from "./skeleton";

export default function ProductsSkeleton() {
	return (
		<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{Array.from({ length: 12 }).map((_, index) => (
				<article
					key={index}
					className="rounded-xl overflow-hidden bg-white border border-gray-200 transition transform duration-300 animate-fade-in"
				>
					<div className="w-full relative">
						<Skeleton className="w-full min-w-52 object-cover aspect-[4/3]" />
						{/* <Suspense fallback={<div>Loading...</div>}>
                  <CartButtons id={product._id.toString()} />
                </Suspense> */}
					</div>
					<div className="p-4 space-y-2.5">
						<Skeleton className="h-6 w-30" />
						<Skeleton className="h-4 w-34" />
						<Skeleton className="h-4 w-50" />
						<Skeleton className="h-4 w-30" />
						<Skeleton className="h-4 w-5" />
					</div>
				</article>
			))}
		</div>
	);
}
