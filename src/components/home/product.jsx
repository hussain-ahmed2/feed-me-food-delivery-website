import Image from "next/image";
import CartButtons from "./cart-buttons";

export default function Product({ product }) {
	return (
		<article className="rounded-xl overflow-hidden bg-white border-2 border-gray-200 shadow hover:scale-102 hover:shadow-lg hover:border-emerald-500/80 transition transform duration-300 animate-fade-in">
			<div className="w-full relative">
				<Image src={product.image} width={200} height={200} alt={product.name} className="w-full object-cover aspect-[4/3]" />
				<CartButtons product={product} />
			</div>
			<div className="p-4 space-y-2.5">
				<h4 className="font-medium md:text-lg">{product.name}</h4>
				<Image src="/images/rating_stars.png" height={40} width={100} alt="rating-stars" />
				<p className="text-sm md:text-base text-gray-700">{product.description}</p>
				<p className="font-medium md:text-lg">${product.price}</p>
			</div>
		</article>
	);
}
