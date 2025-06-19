import { createContext, use, useState } from "react";

export const ShopContext = createContext({});

export const ShopProvider = ({ children }) => {
	const [category, setCategory] = useState("All");
	const [cart, setCart] = useState([]);

	function pickCategory(newCategory) {
		if (category === newCategory) setCategory("All");
		else setCategory(newCategory);
	}

	function addToCart(product) {
		const itemExists = cart.find((item) => item._id === product._id);
		if (itemExists) {
			const updatedCart = cart.map((item) =>
				item._id === product._id
					? { ...item, quantity: item.quantity + 1 }
					: item
			);
			setCart(updatedCart);
		} else {
			const newItem = { ...product, quantity: 1 };
			setCart([...cart, newItem]);
		}
	}

	function removeFromCart(product) {
		const itemExists = cart.find((item) => item._id === product._id);
		if (itemExists.quantity > 1) {
			const updatedCart = cart.map((item) =>
				item._id === product._id
					? { ...item, quantity: item.quantity - 1 }
					: item
			);
			setCart(updatedCart);
		} else {
			const updatedCart = cart.filter((item) => item._id !== product._id);
			setCart(updatedCart);
		}
	}

	function deleteFromCart(product) {
		const updatedCart = cart.filter((item) => item._id !== product._id);
		setCart(updatedCart);
	}

	return (
		<ShopContext
			value={{
				category,
				pickCategory,
				addToCart,
				removeFromCart,
				deleteFromCart,
			}}
		>
			{children}
		</ShopContext>
	);
};

export const useShop = () => use(ShopContext);
