import { createContext, use, useEffect, useState } from "react";

export const ShopContext = createContext({});

export const ShopProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [category, setCategory] = useState("All");
	const [cart, setCart] = useState([]);
	const [topDishes, setTopDishes] = useState([]);
	const [dishes, setDishes] = useState([]);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [limit, setLimit] = useState(12);

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

	function getQuantity(product) {
		const item = cart.find((item) => item._id === product._id);
		return item ? item.quantity : 0;
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

	async function fetchDishes(params) {
		setIsLoading(true);
		try {
			const response = await fetch(`/api/products?${params}`);
			const data = await response.json();
			if (data.success && data.dishes) {
				setDishes(data.dishes);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		async function getDishes() {
			setIsLoading(true);
			try {
				const response = await fetch(`/api/products?limit=${limit}`);
				const data = await response.json();
				if (data.success && data.dishes) {
					setTopDishes(data.dishes.slice(0, 4));
					setDishes(data.dishes);
					setTotal(data.total);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		}
		getDishes();
	}, []);

	return (
		<ShopContext
			value={{
				category,
				pickCategory,
				addToCart,
				removeFromCart,
				deleteFromCart,
				topDishes,
				isLoading,
				dishes,
				page,
				setPage,
				total,
				limit,
				setLimit,
				fetchDishes,
				cart,
				getQuantity,
			}}
		>
			{children}
		</ShopContext>
	);
};

export const useShop = () => use(ShopContext);
