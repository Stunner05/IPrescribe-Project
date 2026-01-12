import { useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./components/Login/LoginPage";
import { DashboardLayout } from "./components/DashboardLayout";
import { LandingPage } from "./components/LandingPage"; // public Coming Soon page
import { useAuthStore } from "./store/authStore";
import { useThemeStore } from "./store/themeStore";
import { getTheme } from "./theme/theme";
import { Toaster } from "sonner";

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
				<Toaster position="top-right" richColors />
				<Routes>
					{/* Public Coming Soon Landing Page */}
					<Route
						path="/"
						element={
							<ThemeProvider theme={getTheme("light")}>
								<LandingPage />
							</ThemeProvider>
						}
					/>

					{/* Login Page */}
					<Route
						path="/login"
						element={
							isAuthenticated ? (
								<Navigate to="/dashboard" replace />
							) : (
								<LoginPage />
							)
						}
					/>

					{/* Dashboard (Protected) */}
					<Route
						path="/dashboard"
						element={
							isAuthenticated ? (
								<DashboardLayout />
							) : (
								<Navigate to="/login" replace />
							)
						}
					/>

					{/* Fallback */}
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
