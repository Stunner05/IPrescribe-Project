import { useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./components/Login/LoginPage";
import { DashboardLayout } from "./components/DashboardLayout";
import { useAuthStore } from "./store/authStore";
import { useThemeStore } from "./store/themeStore";
import { getTheme } from "./theme/theme";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1,
		},
	},
});

export default function App() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const mode = useThemeStore((state) => state.mode) as "light" | "dark";
	const theme = useMemo(() => getTheme(mode), [mode]);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Routes>
					<Route
						path="/"
						element={
							isAuthenticated ? (
								<Navigate to="/dashboard" replace />
							) : (
								<LoginPage />
							)
						}
					/>
					<Route
						path="/dashboard/*"
						element={
							isAuthenticated ? (
								<DashboardLayout />
							) : (
								<Navigate to="/" replace />
							)
						}
					/>
				</Routes>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
