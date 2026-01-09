import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
	interface TypeText {
		mutedBlue: string;
	}
	interface Palette {
		text: TypeText;
	}
	interface PaletteOptions {
		text?: Partial<TypeText>;
	}
}

export const getTheme = (mode: "light" | "dark") => {
	return createTheme({
		palette: {
			mode,
			primary: {
				main: "#2563eb",
				light: "#3b82f6",
				dark: "#1d4ed8",
			},
			secondary: {
				main: "#10b981",
				light: "#34d399",
				dark: "#059669",
			},
			error: {
				main: "#ef4444",
			},
			warning: {
				main: "#f59e0b",
			},
			info: {
				main: "#3b82f6",
			},
			success: {
				main: "#10b981",
			},
			background: {
				default: mode === "light" ? "#f9fafb" : "#111827",
				paper: mode === "light" ? "#ffffff" : "#1f2937",
			},
			text: {
				primary: mode === "light" ? "#111827" : "#f9fafb",
				secondary: mode === "light" ? "#6b7280" : "#9ca3af",
				mutedBlue: mode === "light" ? "#60a5fa" : "#93c5fd", // 👈 light blue
			},
		},
		typography: {
			fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
			h1: {
				fontWeight: 700,
			},
			h2: {
				fontWeight: 700,
			},
			h3: {
				fontWeight: 600,
			},
			h4: {
				fontWeight: 600,
			},
			h5: {
				fontWeight: 600,
			},
			h6: {
				fontWeight: 600,
			},
		},
		shape: {
			borderRadius: 12,
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						textTransform: "none",
						fontWeight: 500,
						borderRadius: 8,
						padding: "10px 20px",
					},
				},
			},
			MuiCard: {
				styleOverrides: {
					root: {
						borderRadius: 12,
						boxShadow:
							mode === "light"
								? "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
								: "0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)",
					},
				},
			},
			MuiTextField: {
				styleOverrides: {
					root: {
						"& .MuiOutlinedInput-root": {
							borderRadius: 8,
						},
					},
				},
			},
		},
	});
};
