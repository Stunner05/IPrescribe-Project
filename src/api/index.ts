// src/api/index.ts
import axios from "axios";
import { useAuthStore } from "../store/authStore";

export const api = axios.create({
	baseURL: "https://stagingapi.iprescribe.online/api/v1",
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true, // keep for cookies if needed
});

// Automatically attach token
api.interceptors.request.use((config) => {
	const token = useAuthStore.getState().token;
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

// Handle 401 globally
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			useAuthStore.getState().clearAuth();
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);
