import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Provider from "./context-provider";
import { ToastContainer } from "react-toastify";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
	title: "FeedMe",
	description:
		"FeedMe the food delivery website. Order your favorite food today.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${outfit.className} text-gray-900 bg-gray-50 antialiased`}
			>
				<Provider>
					<ToastContainer />
					<header className="border-b border-gray-200 bg-white/80 backdrop-blur-xs fixed top-0 left-0 right-0 z-50">
						<Navbar />
					</header>
					<main>{children}</main>
				</Provider>
			</body>
		</html>
	);
}
