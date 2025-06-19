"use client";

import { AuthProvider } from "@/context/auth-context";
import { ShopProvider } from "@/context/shop-context";
import { Suspense } from "react";

export default function Provider({ children }) {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<AuthProvider>
				<ShopProvider>{children}</ShopProvider>
			</AuthProvider>
		</Suspense>
	);
}
