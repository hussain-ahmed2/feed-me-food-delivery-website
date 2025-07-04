"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const useCookie = (key, initialValue) => {
	const [value, setValue] = useState(null);

	const updateCookie = (newValue) => {
		Cookies.set(key, JSON.stringify(newValue));
		setValue(newValue);
	};

	useEffect(() => {
		const cookie = Cookies.get(key);
		if (cookie) {
			setValue(JSON.parse(cookie));
		} else {
			Cookies.set(key, JSON.stringify(initialValue));
		}
	}, []);

	return [value, updateCookie];
};
