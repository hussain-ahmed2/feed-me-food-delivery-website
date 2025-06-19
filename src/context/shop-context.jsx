import { createContext, use, useState } from "react";

export const ShopContext = createContext({});

export const ShopProvider = ({ children }) => {
	const [category, setCategory] = useState("All");

	function pickCategory(newCategory) {
		if (category === newCategory) setCategory("All");
		else setCategory(newCategory);
	}

	return (
		<ShopContext value={{ category, pickCategory }}>{children}</ShopContext>
	);
};

export const useShop = () => use(ShopContext);
