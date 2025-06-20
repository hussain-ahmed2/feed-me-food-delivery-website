import Image from "next/image";

export default function AppDownload() {
	return (
		<section className="mx-auto text-center">
			<h2 className="heading">
				For Better Experience Download <br /> FeedMe App
			</h2>
			<div className="flex items-center justify-center mt-8 gap-8 md:gap-12">
				<Image
					height={50}
					width={200}
					className="w-40 md:w-60 hover:scale-105 transition transform"
					src="/images/play_store.png"
					alt="play_store_logo"
				/>
				<Image
					height={50}
					width={200}
					className="w-40 md:w-60 hover:scale-105 transform transition"
					src="/images/app_store.png"
					alt="app_store_logo"
				/>
			</div>
		</section>
	);
}
