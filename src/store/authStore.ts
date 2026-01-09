import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
	email: string;
	name: string;
	role: string;
}

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	rememberMe: boolean;
	login: (user: User, rememberMe: boolean) => void;
	logout: () => void;
}
export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			isAuthenticated: false,
			rememberMe: false,
			login: (user, rememberMe) => {
				set({ user, isAuthenticated: true, rememberMe });
			},
			logout: () => {
				set({ user: null, isAuthenticated: false, rememberMe: false });
			},
		}),
		{
			name: "auth-storage",
			partialize: (state) =>
				state.rememberMe
					? {
							user: state.user,
							isAuthenticated: state.isAuthenticated,
							rememberMe: state.rememberMe,
					  }
					: { rememberMe: false },
		}
	)
);
