import { useState } from "react";
import {
	Box,
	IconButton,
	Typography,
	Drawer,
	Avatar,
	Menu,
	MenuItem,
	useMediaQuery,
	useTheme,
	Badge,
	Button,
	Popover,
	Divider,
} from "@mui/material";
import {
	Menu as MenuIcon,
	Dashboard,
	People,
	Description,
	LocalPharmacy,
	Payment,
	Settings,
	Logout,
	Brightness4,
	Brightness7,
	FileDownload,
	Shield,
	Article,
	Notifications,
	Language,
	ListAlt,
	NotificationsOutlined,
	KeyboardArrowDown,
	CalendarToday,
} from "@mui/icons-material";
import { useAuthStore } from "../store/authStore";
import { useDashboardStore } from "../store/dashboardStore";
import { useThemeStore } from "../store/themeStore";
import { DashboardContent } from "./DashboardContent";
import AdminImg from "../assets/images/AdminImg.png";
import logoImage from "../assets/images/DBimage.png";
import { SidebarSection } from "./dashboard/SideBarSection";

const drawerWidth = 260;

const mainMenuItems = [
	{ icon: Dashboard, label: "Dashboard", id: "dashboard" },
	{ icon: People, label: "User Management", id: "users" },
	{ icon: Description, label: "Consult. & Presp.", id: "consult" },
	{ icon: LocalPharmacy, label: "Pharm. & Orders Mgt.", id: "pharmacy" },
	{ icon: Payment, label: "Payments", id: "payments" },
];

const adminMenuItems = [
	{ icon: Settings, label: "Settings", id: "settings" },
	{ icon: Shield, label: "Roles & Permissions", id: "roles" },
	{ icon: ListAlt, label: "Activity Log", id: "activity" },
	{ icon: Article, label: "Blog / Health Tips", id: "blog" },
	{ icon: Notifications, label: "Notifications Mgt.", id: "notifications" },
	{ icon: Language, label: "Website Updates", id: "website" },
];
const allNavItems = [...mainMenuItems, ...adminMenuItems];
export function DashboardLayout() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
	const [exportAnchor, setExportAnchor] = useState<null | HTMLElement>(null);
	const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
	const [dateAnchor, setDateAnchor] = useState<null | HTMLElement>(null);
	const user = useAuthStore((state) => state.user);
	const logout = useAuthStore((state) => state.logout);
	const { activeNav, sidebarOpen, setActiveNav, toggleSidebar, closeSidebar } =
		useDashboardStore();
	const { mode, toggleTheme } = useThemeStore();
	const handleExport = (format: "csv" | "pdf") => {
		const link = document.createElement("a");
		const blob = new Blob(["Mock data export"], {
			type: format === "csv" ? "text/csv" : "application/pdf",
		});
		link.href = URL.createObjectURL(blob);
		link.download = `dashboard-export-${
			new Date().toISOString().split("T")[0]
		}.${format}`;
		link.click();
		setExportAnchor(null);
	};
	const drawer = (
		<Box
			sx={{
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				// color: "white",
			}}
		>
			<Box sx={{ py: 2, alignItems: "" }}>
				<img
					src={logoImage}
					alt="Prescribe Online"
					style={{ height: 50, objectFit: "contain" }}
				/>
			</Box>
			{/* Navigation */}
			<Box sx={{ flexGrow: 1, py: 2, overflow: "auto" }}>
				<SidebarSection
					title="Main Menu"
					items={mainMenuItems}
					activeNav={activeNav}
					setActiveNav={setActiveNav}
					selectedBg="rgba(255,255,255,0.12)" // active bg
					selectedColor="#2b70dfff"
					isMobile={isMobile}
					closeSidebar={closeSidebar}
				/>

				<SidebarSection
					title="Admin Menu"
					items={adminMenuItems}
					activeNav={activeNav}
					setActiveNav={setActiveNav}
					selectedBg="primary.main"
					selectedColor="#3b82f6"
					isMobile={isMobile}
					closeSidebar={closeSidebar}
				/>
			</Box>
			{/* User Info */}
		</Box>
	);

	return (
		<Box
			sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}
		>
			<Drawer
				variant={isMobile ? "temporary" : "permanent"}
				open={isMobile ? sidebarOpen : true}
				onClose={closeSidebar}
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
						borderRight: "none",
						background: "linear-gradient(180deg, #2E3B8F 0%, #1B2559 100%)",
						color: "#FFFFFF",
					},
				}}
			>
				{drawer}
			</Drawer>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					display: "flex",
					flexDirection: "column",
					overflow: "hidden",
					ml: { xs: 0, lg: 0 },
				}}
			>
				<Box
					sx={{
						bgcolor: "background.paper",
						borderBottom: 1,
						borderColor: "divider",
						px: { xs: 2, sm: 3, md: 4 },
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<IconButton
							onClick={toggleSidebar}
							sx={{ display: { lg: "none" } }}
						>
							<MenuIcon />
						</IconButton>
						<Box sx={{ flexGrow: 1, display: { xs: "none", lg: "block" } }} />
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							{/* Theme Toggle */}
							<IconButton onClick={toggleTheme} size="medium">
								{mode === "dark" ? <Brightness7 /> : <Brightness4 />}
							</IconButton>

							{/* Notifications */}
							<IconButton size="medium">
								<Badge badgeContent={3} color="error">
									<NotificationsOutlined />
								</Badge>
							</IconButton>
							<Divider
								orientation="vertical"
								flexItem
								sx={{
									mx: 1,
									my: "auto",
									height: 30,
									bgcolor:
										mode === "dark" ? "rgba(255,255,255,0.2)" : "divider",
								}}
							/>
							<Button
								onClick={(e) => setProfileAnchor(e.currentTarget)}
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 1.5,
									textTransform: "none",
									color: "text.primary",
									borderRadius: 2,
									px: 2,
									py: 1,
									"&:hover": {
										bgcolor: "action.hover",
									},
								}}
							>
								<Avatar
									src={AdminImg}
									alt={user?.name || "Admin"}
									sx={{
										width: 40,
										height: 40,
										bgcolor: "primary.main",
									}}
								>
									{user?.name?.charAt(0) || "A"}
								</Avatar>
								<Box
									sx={{
										textAlign: "left",
										display: { xs: "none", sm: "block" },
									}}
								>
									<Typography variant="body2" fontWeight="600">
										{user?.name || "Alexandra"}
									</Typography>
									<Typography variant="caption" color="text.mutedBlue">
										{user?.role || "Admin"}
									</Typography>
								</Box>
								<KeyboardArrowDown fontSize="small" />
							</Button>
							<Menu
								anchorEl={profileAnchor}
								open={Boolean(profileAnchor)}
								onClose={() => setProfileAnchor(null)}
								sx={{ mt: 1 }}
							>
								<MenuItem onClick={() => setProfileAnchor(null)}>
									Profile
								</MenuItem>
								<MenuItem onClick={() => setProfileAnchor(null)}>
									My Account
								</MenuItem>
								<MenuItem onClick={() => setProfileAnchor(null)}>
									Settings
								</MenuItem>
								<Divider />
								<MenuItem
									onClick={() => {
										setProfileAnchor(null);
										logout();
									}}
									sx={{ color: "error.main" }}
								>
									<Logout fontSize="small" sx={{ mr: 1 }} />
									Logout
								</MenuItem>
							</Menu>
						</Box>
					</Box>
				</Box>
				<Box
					sx={{
						bgcolor: "background.paper",
						borderColor: "divider",
						px: { xs: 2, sm: 3, md: 4 },
						py: 2.5,
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							flexWrap: "wrap",
							gap: 2,
						}}
					>
						<Box>
							<Typography variant="h5" fontWeight="700" gutterBottom>
								{allNavItems.find((item) => item.id === activeNav)?.label ||
									"Dashboard"}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Latest update for the last 7 days, check now
							</Typography>
						</Box>
						<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
							{/* Date Range Selector */}
							<Button
								variant="outlined"
								startIcon={<CalendarToday />}
								endIcon={<KeyboardArrowDown />}
								onClick={(e) => setDateAnchor(e.currentTarget)}
								sx={{
									textTransform: "none",
									borderRadius: 1,
									px: 2,
									borderColor: "#ccc", // set your desired border color
									color: "inherit", // keep text color default
									"&:hover": {
										borderColor: "#999", // hover border
										backgroundColor: "transparent", // remove default hover bg
									},
									"&.Mui-focused": {
										borderColor: "#ccc", // remove blue focus border
										boxShadow: "none", // remove default focus shadow
									},
								}}
							>
								12th Sept - 15th Sept, 2025
							</Button>

							<Popover
								anchorEl={dateAnchor}
								open={Boolean(dateAnchor)}
								onClose={() => setDateAnchor(null)}
								anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
								transformOrigin={{ vertical: "top", horizontal: "right" }}
							>
								<Box sx={{ p: 2, minWidth: 200 }}>
									<Typography variant="body2">
										Date range picker coming soon...
									</Typography>
								</Box>
							</Popover>

							{/* Export Button */}
							<Button
								variant="contained"
								startIcon={<FileDownload />}
								onClick={(e) => setExportAnchor(e.currentTarget)}
								sx={{
									textTransform: "none",
									borderRadius: 1,
									px: 3,
									background:
										"linear-gradient(180deg, #2E3B8F 0%, #1B2559 100%)",
									color: "#fff", // ensure text stays white
									"&:hover": {
										background:
											"linear-gradient(180deg, #2E3B8F 0%, #1B2559 100%)", // keep hover same
										boxShadow: "none", // remove hover shadow
									},
									"&.Mui-focused": {
										boxShadow: "none", // remove focus shadow
									},
								}}
							>
								Export
							</Button>

							<Menu
								anchorEl={exportAnchor}
								open={Boolean(exportAnchor)}
								onClose={() => setExportAnchor(null)}
							>
								<MenuItem onClick={() => handleExport("csv")}>
									Export as CSV
								</MenuItem>
								<MenuItem onClick={() => handleExport("pdf")}>
									Export as PDF
								</MenuItem>
							</Menu>
						</Box>
					</Box>
				</Box>
				<Box
					sx={{
						flexGrow: 1,
						overflow: "auto",
						bgcolor: "background.paper",
					}}
				>
					{activeNav === "dashboard" ? (
						<DashboardContent />
					) : (
						<Box
							sx={{
								height: "100%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Box sx={{ textAlign: "center" }}>
								<Typography variant="h5" color="text.secondary">
									{allNavItems.find((item) => item.id === activeNav)?.label}{" "}
									page
								</Typography>
								<Typography
									variant="body2"
									color="text.disabled"
									sx={{ mt: 1 }}
								>
									Coming soon...
								</Typography>
							</Box>
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
}
