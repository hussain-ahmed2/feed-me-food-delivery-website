import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { toast } from "react-toastify";

export async function hashPassword(password) {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
}

export async function checkPasswordMatch(password, hashedPassword) {
	const isMatched = await bcrypt.compare(password, hashedPassword);
	return isMatched;
}

export function generateToken(payload) {
	const token = jwt.sign(payload, process.env.JWT_SECRET);
	return token;
}

export function decodeToken(token) {
	const payload = jwt.verify(token, process.env.JWT_SECRET);
	return payload;
}

export function capitalize(string = "") {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export const register = async (credentials = {}) => {
	try {
		const response = await fetch("/api/auth/register", {
			body: JSON.stringify(credentials),
			method: "POST",
		});
		const data = await response.json();
		toast.success(data.message);
		return data;
	} catch (error) {
		console.error(error);
		toast.error(error.message);
		return { success: false, message: "Something went wrong!" };
	}
};

export const login = async (credentials = {}) => {
	try {
		const response = await fetch("/api/auth/login", {
			body: JSON.stringify(credentials),
			method: "POST",
		});
		const data = await response.json();
		toast.success(data.message);
		return data;
	} catch (error) {
		console.error(error);
		toast.error(error.message);
		return { success: false, message: "Something went wrong!" };
	}
};

export const logout = async () => {
	try {
		const response = await fetch("/api/auth/logout", {
			method: "POST",
		});
		const data = await response.json();
		toast.success(data.message);
		return data;
	} catch (error) {
		console.error(error);
		toast.error(error.message);
		return { success: false, message: "Something went wrong!" };
	}
};
