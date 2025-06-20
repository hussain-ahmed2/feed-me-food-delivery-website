import Image from "next/image";

export default function Banner() {
	return (
		<section className="relative rounded-lg overflow-hidden animate-fade-in">
			<Image
				className="w-full min-h-60 object-cover"
				src="/images/banner.png"
				height={400}
				width={1000}
				alt="banner-image"
			/>
			<div className="absolute z-10 bottom-0 left-0 m-8 lg:m-16 text-white space-y-5 max-w-xl">
				<h2 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-6xl">
					Order your favorite food here
				</h2>
				<p className="hidden md:block">
					Chose from a diverse menu featuring a delectable array of
					dishes crafted with the finest ingredients and culinary
					expertise. Our mission is to satisfy your carvings and
					elevate your dining experience, one delicious meal at a
					time.
				</p>
				<button className="btn-secondary rounded-full md:py-3 md:px-7">
					View Menu
				</button>
			</div>
		</section>
	);
}
