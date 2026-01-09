import { Paper, Typography, Box } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";
import { DynamicTooltip } from "./DynamicTooltip";

const data = [
	{ name: "Pediatrics", value: 45, color: "#3b82f6" },
	{ name: "Cardiology", value: 30, color: "#10b981" },
	{ name: "Surgery", value: 15, color: "#f59e0b" },
	{ name: "Others", value: 10, color: "#f8a81eff" },
];

export function TopSpecialtiesChart() {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const total = data.reduce((sum, item) => sum + item.value, 0);
	const activeValue =
		activeIndex !== null ? data[activeIndex].value : data[0].value;

	return (
		<Paper sx={{ p: 3 }}>
			<Typography variant="h6" fontWeight={600}>
				Top Specialties in Demand
			</Typography>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					mt: 3,
				}}
			>
				{/* LEFT: Donut chart - INCREASED SIZE */}
				<Box sx={{ width: 300, height: 300, position: "relative" }}>
					<ResponsiveContainer>
						<PieChart>
							<Tooltip
								cursor={false}
								wrapperStyle={{ outline: "none" }}
								animationDuration={200}
								offset={10}
								content={(props) => {
									// Pass the color from the hovered segment
									const segmentColor = props?.payload?.[0]?.payload?.color;
									return (
										<DynamicTooltip
											{...props}
											suffix="Doctors"
											color={segmentColor}
										/>
									);
								}}
							/>

							<Pie
								data={data}
								dataKey="value"
								innerRadius={95}
								outerRadius={125}
								paddingAngle={4}
								onMouseEnter={(_, index) => setActiveIndex(index)}
								onMouseLeave={() => setActiveIndex(null)}
							>
								{data.map((entry, index) => (
									<Cell
										key={entry.name}
										fill={entry.color}
										opacity={
											activeIndex === null || activeIndex === index ? 1 : 0.4
										}
										style={{
											cursor: "pointer",
										}}
									/>
								))}
							</Pie>
						</PieChart>
					</ResponsiveContainer>
					{/* Center percentage */}
					<Box
						sx={{
							position: "absolute",
							inset: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "column",
							pointerEvents: "none",
						}}
					>
						<Typography variant="h4" fontWeight={700}>
							{Math.round((activeValue / total) * 100)}%
						</Typography>
					</Box>
				</Box>
				{/* RIGHT: 2x2 stats grid */}
				<Box
					marginRight={4}
					sx={{
						display: "grid",
						gridTemplateColumns: "repeat(2, 1fr)",
						gap: 3,
					}}
				>
					{data.map((item) => (
						<Box key={item.name}>
							<Typography variant="body2" color="text.secondary">
								{item.name}
							</Typography>
							<Box
								sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}
							>
								<Box
									sx={{
										width: 10,
										height: 10,
										borderRadius: "50%",
										bgcolor: item.color,
									}}
								/>
								<Typography variant="h5" fontWeight={700}>
									{item.value}
								</Typography>
							</Box>
						</Box>
					))}
				</Box>
			</Box>
		</Paper>
	);
}
