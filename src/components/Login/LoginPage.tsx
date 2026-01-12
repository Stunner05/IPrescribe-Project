import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import {
	Box,
	Button,
	TextField,
	Typography,
	Checkbox,
	FormControlLabel,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
	CircularProgress,
	Alert,
	Paper,
	InputAdornment,
	IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginUser } from "../../api/mockApi";
import { useAuthStore } from "../../store/authStore";
import Logo from "../../assets/images/IpLogo.png";
import { useNavigate } from "react-router-dom";

// Zod validation
const loginSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});
export function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [showForgotPassword, setShowForgotPassword] = useState(false);
	const [resetEmail, setResetEmail] = useState("");
	const [resetSuccess, setResetSuccess] = useState(false);
	const [fieldErrors, setFieldErrors] = useState<{
		email?: string;
		password?: string;
	}>({});
	const [resetError, setResetError] = useState("");
	const navigate = useNavigate();
	const login = useAuthStore((state) => state.login);
	const loginMutation = useMutation({
		mutationFn: () => loginUser(email, password),
		onSuccess: (data) => {
			if (data.success && data.user) {
				login(data.user, rememberMe);
				navigate("/dashboard");
			} else {
				setFieldErrors({
					email: "Invalid credentials",
					password: "Invalid credentials",
				});
			}
		},
	});

	const textFieldSX = {
		"& .MuiOutlinedInput-root": {
			backgroundColor: "#f9fafb",
			"& fieldset": { borderColor: "#e5e7eb" },
			"&:hover fieldset": { borderColor: "#d1d5db" },
			"&.Mui-focused fieldset": { borderColor: "#3b5ba5" },
		},
	};
	const validateLogin = (email: string, password: string) => {
		const parsed = loginSchema.safeParse({ email, password });
		if (!parsed.success) {
			const errors: { email?: string; password?: string } = {};
			parsed.error.issues.forEach((issue) => {
				if (issue.path[0] === "email") errors.email = issue.message;
				if (issue.path[0] === "password") errors.password = issue.message;
			});
			return errors;
		}
		return null;
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setFieldErrors({});
		const errors = validateLogin(email, password);
		if (errors) return setFieldErrors(errors);
		loginMutation.mutate();
		loginMutation.mutate();
	};
	const handleForgotPassword = () => {
		if (!resetEmail || !z.string().email().safeParse(resetEmail).success) {
			return;
		}
		setResetError("");
		setResetSuccess(true);
		setTimeout(() => {
			setShowForgotPassword(false);
			setResetEmail("");
			setResetSuccess(false);
		}, 2000);
	};
	return (
		<Box
			sx={{
				minHeight: "100vh",
				width: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				position: "relative",
				overflow: "hidden",
				background:
					"linear-gradient(to bottom, #2d4494 0%, #1f2e6a 45%, #0d1335 100%)",
				p: 2,
				"&::before": {
					content: '""',
					position: "absolute",
					inset: 0,
					backgroundImage:
						"radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
					backgroundSize: "24px 24px",
					opacity: 0.3,
				},
			}}
		>
			<Paper
				elevation={24}
				sx={{
					position: "relative",
					zIndex: 10,
					width: "100%",
					maxWidth: 480,
					p: 3,
					borderRadius: 2,
					backgroundColor: "#ffffff",
				}}
			>
				{/* Logo */}
				<Box
					sx={{ display: "flex", justifyContent: "center", mb: 8, height: 70 }}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<img
							src={Logo}
							alt="iPrescribe"
							style={{
								width: 110,
								height: "auto",
								objectFit: "contain",
							}}
						/>
					</Box>
				</Box>
				<Typography
					variant="h5"
					align="center"
					fontWeight={600}
					sx={{ color: "#111827", mb: 0.5 }}
				>
					Login to iPrescribe Admin
				</Typography>
				<Typography
					variant="body2"
					align="center"
					color="text.secondary"
					sx={{ mb: 2 }}
				>
					Provide the required details to login
				</Typography>
				{/* Form */}
				<form onSubmit={handleSubmit}>
					<Box sx={{ mb: 1 }}>
						<Typography
							variant="body2"
							sx={{ mb: 1, color: "#374151", fontWeight: 500 }}
						>
							Email Address
						</Typography>
						<TextField
							size="small"
							fullWidth
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							error={!!fieldErrors.email}
							helperText={fieldErrors.email}
							disabled={loginMutation.isPending}
							placeholder="e.g admin@careoneclinics.com"
							sx={textFieldSX}
						/>
					</Box>

					<Box sx={{ mb: 0.5 }}>
						<Typography
							variant="body2"
							sx={{ mb: 1, color: "#374151", fontWeight: 500 }}
						>
							Password
						</Typography>
						<TextField
							size="small"
							fullWidth
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							error={!!fieldErrors.password}
							helperText={fieldErrors.password}
							disabled={loginMutation.isPending}
							placeholder="••••••••••••••••••"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() => setShowPassword(!showPassword)}
											edge="end"
											size="small"
										>
											{showPassword ? (
												<VisibilityOff fontSize="small" />
											) : (
												<Visibility fontSize="small" />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
							sx={{
								"& .MuiOutlinedInput-root": {
									backgroundColor: "#f9fafb",
									"& fieldset": {
										borderColor: "#e5e7eb",
									},
									"&:hover fieldset": {
										borderColor: "#d1d5db",
									},
									"&.Mui-focused fieldset": {
										borderColor: "#3b5ba5",
									},
								},
							}}
						/>
					</Box>

					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							mb: 0.5,
						}}
					>
						<FormControlLabel
							control={
								<Checkbox
									checked={rememberMe}
									onChange={(e) => setRememberMe(e.target.checked)}
									disabled={loginMutation.isPending}
									sx={{
										color: "#9ca3af",
										"&.Mui-checked": {
											color: "#3b5ba5",
										},
									}}
								/>
							}
							label={
								<Typography variant="body2" sx={{ color: "#6b7280" }}>
									Remember me
								</Typography>
							}
						/>
						<Button
							variant="text"
							size="small"
							onClick={() => setShowForgotPassword(true)}
							disabled={loginMutation.isPending}
							sx={{
								textTransform: "none",
								color: "#6b7280",
								"&:hover": {
									backgroundColor: "transparent",
									color: "#374151",
								},
							}}
						>
							Forgot password?
						</Button>
					</Box>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						size="large"
						disabled={loginMutation.isPending}
						sx={{
							py: 0.4,
							mb: 1,
							backgroundColor: "#3b5ba5",
							textTransform: "none",
							fontSize: "1rem",
							fontWeight: 500,
							boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
							"&:hover": {
								backgroundColor: "#2d4a8f",
							},
							"&.Mui-disabled": {
								backgroundColor: "#9ca3af",
							},
						}}
					>
						{loginMutation.isPending ? (
							<CircularProgress size={24} color="inherit" />
						) : (
							"Login"
						)}
					</Button>
				</form>

				{/* Demo Credentials */}
				<Alert
					severity="info"
					sx={{
						mt: 1.5,
						backgroundColor: "#eff6ff",
						"& .MuiAlert-icon": {
							color: "#3b5ba5",
						},
					}}
				>
					<Typography variant="caption" sx={{ color: "#1e3a8a" }}>
						<strong>Demo credentials:</strong> admin@careoneclinics.com /
						admin123
					</Typography>
				</Alert>
			</Paper>
			{/* Forgot Password Dialog */}
			<Dialog
				open={showForgotPassword}
				onClose={() => setShowForgotPassword(false)}
				PaperProps={{
					sx: {
						borderRadius: 3,
						p: 1,
					},
				}}
			>
				<DialogTitle sx={{ fontWeight: 600 }}>Reset Password</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ mb: 2 }}>
						Enter your email address and we'll send you a link to reset your
						password.
					</DialogContentText>
					{resetSuccess ? (
						<Alert severity="success">
							Password reset link sent to your email!
						</Alert>
					) : (
						<TextField
							autoFocus
							fullWidth
							label="Email Address"
							type="email"
							value={resetEmail}
							onChange={(e) => setResetEmail(e.target.value)}
							sx={{
								mt: 1,
								"& .MuiOutlinedInput-root": {
									"&.Mui-focused fieldset": {
										borderColor: "#3b5ba5",
									},
								},
							}}
							helperText={resetError}
							error={!!resetError}
						/>
					)}
				</DialogContent>
				{!resetSuccess && (
					<DialogActions sx={{ px: 3, pb: 2 }}>
						<Button
							onClick={() => setShowForgotPassword(false)}
							sx={{ textTransform: "none", color: "#6b7280" }}
						>
							Cancel
						</Button>
						<Button
							onClick={handleForgotPassword}
							variant="contained"
							sx={{
								textTransform: "none",
								backgroundColor: "#3b5ba5",
								"&:hover": {
									backgroundColor: "#2d4a8f",
								},
							}}
						>
							Send Reset Link
						</Button>
					</DialogActions>
				)}
			</Dialog>
		</Box>
	);
}
