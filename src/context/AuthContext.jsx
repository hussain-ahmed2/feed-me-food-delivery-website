"use client";

import axios from "axios";
import { createContext, use, useEffect, useState } from "react";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	async function register({ name, email, password }) {
		try {
			const res = await axios.post("/api/auth/register", { name, email, password });
			setUser(res.data.user);
			return res.data;
		} catch (error) {
			console.log(error);
			return error.response.data;
		}
	}

	async function login({ email, password }) {
		try {
			const res = await axios.post("/api/auth/login", { email, password });
			setUser(res.data.user);
			return res.data;
		} catch (error) {
			console.log(error);
			return error.response.data;
		}
	}

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await axios.get("/api/auth/user");
				setUser(res.data.user);
				console.log(res.data.user);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, []);

	if (loading) return <div>Loading...</div>;

	return <AuthContext value={{ user, loading, register, login }}>{children}</AuthContext>;
}

export const useAuth = () => use(AuthContext);
