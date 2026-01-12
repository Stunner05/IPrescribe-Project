// src/types/auth.ts
export interface Role {
	id: number;
	name: string;
	slug: string;
	default: number;
}

export interface Patient {
	id: number;
	user_id: number;
	patient_id: string;
	email: string;
	status: string;
	// ... add other fields if needed
}

export interface User {
	id: number;
	first_name: string | null;
	last_name: string | null;
	email: string;
	roles: Role[];
	patients?: Patient[];
	// ... add other fields you care about
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
