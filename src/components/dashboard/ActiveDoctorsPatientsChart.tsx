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
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

// Mock data fetch function
const fetchActiveDoctorsPatients = async () => {
	await new Promise((resolve) => setTimeout(resolve, 800));
	return [
		{ month: "Jan", patients: 90, doctors: 65 },
		{ month: "Feb", patients: 30, doctors: 60 },
		{ month: "Mar", patients: 45, doctors: 40 },
		{ month: "Apr", patients: 85, doctors: 60 },
		{ month: "May", patients: 35, doctors: 45 },
		{ month: "Jun", patients: 30, doctors: 75 },
		{ month: "Jul", patients: 45, doctors: 35 },
		{ month: "Aug", patients: 100, doctors: 70 },
		{ month: "Sep", patients: 35, doctors: 55 },
		{ month: "Oct", patients: 45, doctors: 55 },
		{ month: "Nov", patients: 35, doctors: 50 },
		{ month: "Dec", patients: 100, doctors: 78 },
	];
};

export function ActiveDoctorsPatientsChart() {
	const { data, isLoading } = useQuery({
		queryKey: ["activeDoctorsPatients"],
		queryFn: fetchActiveDoctorsPatients,
	});

	if (isLoading) {
		return (
			<Skeleton variant="rectangular" height={350} sx={{ borderRadius: 2 }} />
		);
	}

	return (
		<Grow in timeout={800}>
			<Card>
				<CardContent sx={{ p: 3, pb: 2, "&:last-child": { pb: 2 } }}>
					{/* Title + Legend aligned horizontally */}
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						mb={2}
					>
						{/* Card Title */}
						<Typography variant="h6" fontWeight={600}>
							Active Doctors vs Active Patients
						</Typography>
						{/* Legend */}
						<Box display="flex" gap={1} marginRight={2.7} alignItems="center">
							{/* Doctors */}
							<Box display="flex" alignItems="center" gap={0.5}>
								<Box
									width={12}
									height={12}
									bgcolor="#f97316" // matches Doctors bar color
									borderRadius={2}
								/>
								<Typography variant="body2" fontWeight={500}>
									Doctors
								</Typography>
							</Box>
							{/* Patients */}
							<Box display="flex" alignItems="center" gap={0.5}>
								<Box
									width={12}
									height={12}
									bgcolor="#2563eb" // matches Patients bar color
									borderRadius={2}
								/>
								<Typography variant="body2" fontWeight={500}>
									Patients
								</Typography>
							</Box>
						</Box>
					</Box>
					<Box sx={{ ml: -7, mr: -3 }}>
						<ResponsiveContainer width="100%" height={300}>
							<BarChart
								data={data}
								barGap={1}
								barCategoryGap="30%"
								margin={{ top: 20, right: 44, bottom: 20, left: 24 }}
							>
								<CartesianGrid
									vertical={false}
									horizontal={false}
									stroke="#e5e7eb"
									strokeDasharray=""
								/>
								<XAxis
									dataKey="month"
									tick={{ fontSize: 12 }}
									axisLine={false}
									tickLine={false}
								/>
								<YAxis
									domain={[10, 110]} // ⬅️ allow space below 20
									ticks={[20, 40, 60, 80, 100]} // ⬅️ hide 10 label
									allowDecimals={false}
									scale="linear"
									type="number"
									tick={{ fontSize: 12 }}
									axisLine={false}
									tickLine={false}
								/>
								<Tooltip
									cursor={{ fill: "rgba(0,0,0,0.04)" }}
									contentStyle={{
										backgroundColor: "#ffffff",
										borderRadius: 8,
										border: "1px solid #e5e7eb",
									}}
								/>
								<Bar
									dataKey="doctors"
									fill="#f97316"
									radius={[4, 4, 0, 0]}
									barSize={7}
								/>
								<Bar
									dataKey="patients"
									fill="#2563eb"
									radius={[4, 4, 0, 0]}
									barSize={7}
								/>
							</BarChart>
						</ResponsiveContainer>
					</Box>
				</CardContent>
			</Card>
		</Grow>
	);
}
