import { useQuery } from "@tanstack/react-query";
import {
	Box,
	Card,
	CardContent,
	Typography,
	Skeleton,
	Grow,
} from "@mui/material";
import { fetchDashboardStats } from "../../api/mockApi";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import LogoTwo from "../../assets/images/Logo2.png";

export function StatsCards() {
	const { data: stats, isLoading } = useQuery({
		queryKey: ["dashboardStats"],
		queryFn: fetchDashboardStats,
	});

	const statCards = [
		{
			title: "Total patients",
			value: stats?.totalPatients.toLocaleString() || "0",
			color: "#2563eb",
			bgColor: "#ede9fe",
			change: "-0.10%",
		},
		{
			title: "Total Doctors",
			value: stats?.totalDoctors.toLocaleString() || "0",
			color: "#10b981",
			bgColor: "#F6FAFD",
			change: "-0.10%",
		},
		{
			title: "Pending Reviews",
			value: stats?.PendingReviews.toLocaleString() || "0",
			color: "#8b5cf6",
			bgColor: "#fef3c7",
			change: "-0.10%",
		},
		{
			title: "Total consultations",
			value: stats?.totalConsultations.toLocaleString() || "0",
			color: "#10b981",
			bgColor: "#ede9fe",
			change: "-0.10%",
		},
		{
			title: "Prescriptions issued",
			value: stats?.PrescriptionsIssued.toLocaleString() || "0",
			color: "#f59e0b",
			bgColor: "#F2FFFC",
			change: "-0.10%",
		},
	];

	if (isLoading) {
		return (
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: {
						xs: "1fr",
						sm: "repeat(2, 1fr)",
						lg: "repeat(5, 1fr)",
					},
					gap: 2,
				}}
			>
				{[...Array(5)].map((_, i) => (
					<Skeleton
						key={i}
						variant="rectangular"
						height={140}
						sx={{ borderRadius: 2 }}
					/>
				))}
			</Box>
		);
	}

	return (
		<Box
			sx={{
				display: "grid",
				gridTemplateColumns: {
					xs: "1fr",
					sm: "repeat(2, 1fr)",
					lg: "repeat(5, 1fr)",
				},
				gap: 2,
			}}
		>
			{statCards.map((stat, index) => (
				<Grow key={stat.title} in timeout={(index + 1) * 200}>
					<Card
						sx={{
							transition: "all 0.3s",
							"&:hover": {
								transform: "translateY(-4px)",
								boxShadow: 4,
							},
							bgcolor: stat.bgColor,
						}}
					>
						<CardContent>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "flex-start",
								}}
							>
								<Box>
									<Typography
										variant="body2"
										color="text.secondary"
										gutterBottom
									>
										{stat.title}
									</Typography>
									<Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
										{stat.value}
									</Typography>
									<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
										<Typography
											variant="caption"
											sx={{ color: "#fc4141ff", fontWeight: "medium" }}
										>
											<ArrowDownwardIcon
												sx={{ fontSize: 14, verticalAlign: "middle" }}
											/>
											{stat.change}
										</Typography>
										<Typography variant="caption" color="text.secondary">
											since last week
										</Typography>
									</Box>
								</Box>

								{/* LogoTwo for all cards */}
								<Box
									sx={{
										bgcolor: stat.bgColor,
										color: stat.color,
										p: 1.5,
										borderRadius: 2,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Box
										component="img"
										src={LogoTwo}
										alt="Logo"
										sx={{ width: 28, height: 28 }}
									/>
								</Box>
							</Box>
						</CardContent>
					</Card>
				</Grow>
			))}
		</Box>
	);
}
