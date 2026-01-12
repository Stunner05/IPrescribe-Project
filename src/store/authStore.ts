// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
	email: string;
	name: string;
	role: string;
}

interface AuthState {
	user: User | null;
	token: string | null; // <-- added token
	isAuthenticated: boolean;
	rememberMe: boolean;
	login: (user: User, token: string, rememberMe: boolean) => void; // <-- updated
	logout: () => void;
	clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			isAuthenticated: false,
			rememberMe: false,
			login: (user, token, rememberMe) => {
				set({ user, token, isAuthenticated: true, rememberMe });
			},
			logout: () =>
				set({
					user: null,
					token: null,
					isAuthenticated: false,
					rememberMe: false,
				}),
			clearAuth: () =>
				set({
					user: null,
					token: null,
					isAuthenticated: false,
					rememberMe: false,
				}),
		}),
		{
			name: "auth-storage",
			partialize: (state) =>
				state.rememberMe
					? {
							user: state.user,
							token: state.token,
							isAuthenticated: state.isAuthenticated,
							rememberMe: state.rememberMe,
					  }
					: { rememberMe: false },
		}
	)
);
