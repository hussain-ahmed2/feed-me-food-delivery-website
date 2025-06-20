import { Facebook, Linkedin, Twitter } from "lucide-react";
import Logo from "./logo";

export default function Footer() {
	return (
		<footer
			id="footer"
			className="bg-gray-900 text-gray-300 flex flex-col items-center gap-4"
		>
			<div className="grid md:grid-cols-4 p-4 gap-10 max-w-7xl mx-auto mt-10">
				<div className="md:col-span-2 flex flex-col items-start gap-5">
					<Logo />
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Tempore molestiae atque, quasi perspiciatis ut,
						similique laboriosam quisquam nesciunt possimus qui,
						harum laborum? Sit quod obcaecati dolorem porro
						perferendis, sint odit! Aliquam eligendi commodi dolorem
						autem ipsum, assumenda saepe quo voluptatibus beatae!
						Cupiditate totam quo mollitia beatae. Repellendus, nemo
						omnis, ad architecto suscipit ut culpa harum non
						reiciendis sit eum quia.
					</p>
					<div className="flex items-center gap-5">
						<Facebook className="size-10 p-2 overflow-visible hover:bg-white hover:text-neutral-900 transition-colors border rounded-full" />
						<Twitter className="size-10 p-2 overflow-visible hover:bg-white hover:text-neutral-900 transition-colors border rounded-full" />
						<Linkedin className="size-10 p-2 overflow-visible hover:bg-white hover:text-neutral-900 transition-colors border rounded-full" />
					</div>
				</div>

				<div className="flex flex-col items-start gap-5">
					<h2 className="text-white font-medium text-3xl">Company</h2>
					<ul className="space-y-2">
						<li>Home</li>
						<li>About us</li>
						<li>Delivery</li>
						<li>Privacy policy</li>
					</ul>
				</div>

				<div className="flex flex-col items-start gap-5">
					<h2 className="text-white font-medium text-3xl">
						Get in touch
					</h2>
					<ul className="space-y-2">
						<li>+123-3456789</li>
						<li>contact@feedme.feed</li>
					</ul>
				</div>
			</div>

			<div className="max-w-7xl mx-auto w-full px-4">
				<hr className=" text-gray-700" />
			</div>

			<p className="mb-5">
				Copyright 2025 &copy; FeedMe.com - All right reserved.
			</p>
		</footer>
	);
}
