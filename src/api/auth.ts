// src/api/auth.ts
import { api } from "./index";

export interface User {
	id: number;
	first_name: string | null;
	last_name: string | null;
	email: string;
	roles: { id: number; name: string; slug: string; default: number }[];
}

export interface LoginData {
	user: User;
	token: string;
	token_type: string;
}

export interface LoginResponse {
	data: LoginData;
	message: string;
	status: number;
}

export const loginUser = async (
	email: string,
	password: string
): Promise<LoginResponse> => {
	const response = await api.post("/auth/login", { email, password });
	return response.data; // now matches the LoginResponse type
};
