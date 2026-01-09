import { useQuery } from "@tanstack/react-query";
import {
	Box,
	Card,
	CardContent,
	Typography,
	Skeleton,
	Grow,
} from "@mui/material";
import {
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { fetchChartData } from "../../api/mockApi";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { AreaChart, Area } from "recharts";
import { DynamicTooltip } from "./DynamicTooltip";

export function ChartsSection() {
	const { data: chartData, isLoading } = useQuery({
		queryKey: ["chartData"],
		queryFn: fetchChartData,
	});

	if (isLoading) {
		return (
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
					gap: 3,
				}}
			>
				<Skeleton variant="rectangular" height={350} sx={{ borderRadius: 2 }} />
				<Skeleton variant="rectangular" height={350} sx={{ borderRadius: 2 }} />
			</Box>
		);
	}

	return (
		<Box
			sx={{
				display: "grid",
				gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
				gap: 3,
			}}
		>
			{/* User Growth Chart */}
			<Grow in timeout={600}>
				<Card
					sx={{
						transition: "all 0.3s",
						"&:hover": {
							boxShadow: 4,
						},
					}}
				>
					<CardContent>
						{/* Flex container for title and dots */}
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								mb: 3,
							}}
						>
							<Typography variant="h6" fontWeight={600}>
								Consultation Over Time
							</Typography>

							<MoreHorizIcon
								sx={{
									cursor: "pointer",
									color: "text.secondary",
								}}
							/>
						</Box>
						{/* Blue Area Chart */}
						<Box sx={{ ml: -7, mr: -3 }}>
							<ResponsiveContainer width="100%" height={300}>
								<AreaChart
									data={chartData}
									margin={{ top: 20, right: 44, bottom: 20, left: 24 }}
								>
									<defs>
										<linearGradient
											id="blueGradient"
											x1="0"
											y1="0"
											x2="0"
											y2="1"
										>
											<stop
												offset="0%"
												stopColor="#2563eb"
												stopOpacity={0.25}
											/>
											<stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
										</linearGradient>
									</defs>
									<CartesianGrid
										stroke="#e5e7eb"
										// vertical={false}
										horizontal={false}
										strokeDasharray=""
									/>
									<XAxis dataKey="name" style={{ fontSize: 12 }} />
									<YAxis
										domain={[10, 100]} // space below first visible tick
										ticks={[20, 40, 60, 80, 100]} // visible labels only
										allowDecimals={false}
										axisLine={false}
										tickLine={false}
										tick={{ fontSize: 12 }}
									/>
									<Tooltip
										content={(props) => (
											<DynamicTooltip
												{...(props as any)}
												color="#2563eb"
												suffix="Consultations"
											/>
										)}
									/>
									<Area
										type="monotone"
										dataKey="users"
										stroke="#2563eb"
										strokeWidth={2.5}
										fill="url(#blueGradient)"
										dot={({ cx, cy }) => (
											<circle
												cx={cx}
												cy={cy}
												r={5}
												fill="#ffffff"
												stroke="#2563eb"
												strokeWidth={2}
											/>
										)}
										activeDot={{ r: 6, fill: "#2563eb" }}
									/>
								</AreaChart>
							</ResponsiveContainer>
						</Box>
					</CardContent>
				</Card>
			</Grow>
			{/* Presriptions Volume Chart */}
			<Grow in timeout={700}>
				<Card
					sx={{
						transition: "all 0.3s",
						"&:hover": {
							boxShadow: 4,
						},
					}}
				>
					<CardContent>
						{/* Flex container for title and dots */}
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								mb: 3,
							}}
						>
							<Typography variant="h6" fontWeight={600}>
								Consultation Over Time
							</Typography>

							<MoreHorizIcon
								sx={{
									cursor: "pointer",
									color: "text.secondary",
								}}
							/>
						</Box>
						{/* Chart */}
						<Box sx={{ ml: -7, mr: -3 }}>
							<ResponsiveContainer width="100%" height={300}>
								<AreaChart
									data={chartData}
									margin={{ top: 20, right: 44, bottom: 20, left: 24 }}
								>
									<defs>
										<linearGradient
											id="greenGradient"
											x1="0"
											y1="0"
											x2="0"
											y2="1"
										>
											<stop
												offset="0%"
												stopColor="#22c55e"
												stopOpacity={0.25}
											/>
											<stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
										</linearGradient>
									</defs>

									<CartesianGrid stroke="#e5e7eb" horizontal={false} />
									<XAxis dataKey="name" style={{ fontSize: 12 }} />
									<YAxis
										domain={[10, 100]} // space below first visible tick
										ticks={[20, 40, 60, 80, 100]} // visible labels only
										allowDecimals={false}
										axisLine={false}
										tickLine={false}
										tick={{ fontSize: 12 }}
									/>
									<Tooltip
										content={(props) => (
											<DynamicTooltip
												{...(props as any)}
												color="#22c55e"
												suffix="Prescriptions"
											/>
										)}
									/>
									<Area
										type="monotone"
										dataKey="users"
										stroke="#22c55e"
										strokeWidth={2.5}
										fill="url(#greenGradient)"
										dot={({ cx, cy }) => (
											<circle
												cx={cx}
												cy={cy}
												r={5}
												fill="#ffffff"
												stroke="#22c55e"
												strokeWidth={2}
											/>
										)}
										activeDot={{ r: 6, fill: "#22c55e" }}
									/>
								</AreaChart>
							</ResponsiveContainer>
						</Box>
					</CardContent>
				</Card>
			</Grow>
		</Box>
	);
}
