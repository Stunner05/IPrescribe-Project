import { Box } from "@mui/material";
import { StatsCards } from "./dashboard/StatsCards";
import { ChartsSection } from "./dashboard/ChartsSection";
import { ActiveDoctorsPatientsChart } from "./dashboard/ActiveDoctorsPatientsChart";
import { TopSpecialtiesChart } from "./dashboard/TopSpecialtiesChart";
import { PatientsTable } from "./dashboard/PatientsTable";

export function DashboardContent() {
	return (
		<Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
			<Box sx={{ mb: 4 }}>
				<StatsCards />
			</Box>
			<Box sx={{ mb: 4 }}>
				<ChartsSection />
			</Box>
			<Box
				sx={{
					mb: 4,
					display: "grid",
					gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
					gap: 3,
				}}
			>
				<ActiveDoctorsPatientsChart />
				<TopSpecialtiesChart />
			</Box>
			<Box>
				<PatientsTable />
			</Box>
		</Box>
	);
}
