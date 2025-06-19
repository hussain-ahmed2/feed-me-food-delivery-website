import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

export async function getUser() {
	const response = await fetch("/api/auth/user");
	const data = await response.json();
	return data;
}

export function capitalize(string = "") {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
