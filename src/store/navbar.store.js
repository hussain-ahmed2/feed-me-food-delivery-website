import { create } from "zustand";

export const useNavbarStore = create((set) => ({
	isOpen: false,
	setIsOpen: (value) => set({ isOpen: value }),
}));
