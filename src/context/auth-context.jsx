import { createContext, use, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const register = async (credentials = {}) => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/auth/register", {
				body: JSON.stringify(credentials),
				method: "POST",
			});
			const data = await response.json();
			if (data.success) setUser(data.user);
			return data;
		} catch (error) {
			console.error(error);
			return { success: false, message: "Something went wrong!" };
		} finally {
			setIsLoading(false);
		}
	};

	const login = async (credentials = {}) => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/auth/login", {
				body: JSON.stringify(credentials),
				method: "POST",
			});
			const data = await response.json();
			if (data.success) setUser(data.user);
			return data;
		} catch (error) {
			console.error(error);
			return { success: false, message: "Something went wrong!" };
		} finally {
			setIsLoading(false);
		}
	};

	const logout = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/auth/logout", {
				method: "POST",
			});
			const data = await response.json();
			if (data.success) setUser(null);
			return data;
		} catch (error) {
			console.error(error);
			return { success: false, message: "Something went wrong!" };
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		async function getUser() {
			setIsLoading(true);
			try {
				const response = await fetch("/api/auth/user");
				const data = await response.json();
				if (data.success && data.user) {
					setUser(data.user);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		}
		getUser();
	}, []);

	return (
		<AuthContext value={{ user, register, login, logout, isLoading }}>
			{children}
		</AuthContext>
	);
};

export const useAuth = () => use(AuthContext);
