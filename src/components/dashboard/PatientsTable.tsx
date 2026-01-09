import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
	Box,
	Card,
	CardContent,
	Typography,
	TextField,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Chip,
	InputAdornment,
	CircularProgress,
	Grow,
	TableSortLabel,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useEffect } from "react";
import { fetchPatients, type Patient } from "../../api/mockApi";

type Order = "asc" | "desc";

export function PatientsTable() {
	const [page, setPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [allPatients, setAllPatients] = useState<Patient[]>([]);
	const [order, setOrder] = useState<Order>("desc");
	const [orderBy, setOrderBy] = useState<keyof Patient>("signupDate");

	const { data, isLoading, isFetching } = useQuery<Patient[]>({
		queryKey: ["patients", page],
		queryFn: () => fetchPatients(page),
	});
	useEffect(() => {
		if (data) {
			setAllPatients((prev) => {
				const merged = [...prev, ...data];
				// deduplicate by id
				return merged.filter(
					(patient, index, self) =>
						self.findIndex((p) => p.id === patient.id) === index
				);
			});
		}
	}, [data]);
	const handleSort = (property: keyof Patient) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};
	const filteredPatients = (data ? [...allPatients, ...data] : allPatients)
		.filter(
			(patient, index, self) =>
				self.findIndex((p) => p.id === patient.id) === index
		)
		.filter((patient) => {
			const query = searchQuery.toLowerCase();
			return (
				patient.name.toLowerCase().includes(query) ||
				patient.email.toLowerCase().includes(query) ||
				patient.location.toLowerCase().includes(query)
			);
		});
	const sortedPatients = [...filteredPatients].sort((a, b) => {
		const aValue = a[orderBy];
		const bValue = b[orderBy];
		if (aValue < bValue) return order === "asc" ? -1 : 1;
		if (aValue > bValue) return order === "asc" ? 1 : -1;
		return 0;
	});
	const handleLoadMore = () => {
		setPage((prev) => prev + 1);
	};
	const headCellSx = {
		py: 1.5,
		fontSize: 13,
		fontWeight: 600,
		color: "#000", // or "text.primary"
		whiteSpace: "nowrap",
	};

	const bodyCellSx = {
		py: 1.75,
		fontSize: 14,
	};

	return (
		<Grow in timeout={800}>
			<Card>
				<CardContent>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							mb: 3,
							flexWrap: "wrap",
							gap: 2,
						}}
					>
						<Typography variant="h6" fontWeight={600}>
							Recent Patient Sign Ups
						</Typography>
						<TextField
							size="small"
							placeholder="Search by name, email, or location..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Search />
									</InputAdornment>
								),
							}}
							sx={{ minWidth: { xs: "100%", sm: 300 } }}
						/>
					</Box>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell sx={headCellSx}>#</TableCell>

									{[
										{ key: "signupDate", label: "Sign Up Date" },
										{ key: "name", label: "Patient Name" },
										{ key: "email", label: "Email Address" },
										{ key: "phone", label: "Phone Number" },
										{ key: "lastSeen", label: "Last Seen Date & Time" },
										{ key: "location", label: "Location" },
										{ key: "device", label: "Device" },
									].map(({ key, label }) => (
										<TableCell
											key={key}
											sortDirection={orderBy === key ? order : false}
											sx={headCellSx}
										>
											<TableSortLabel
												active={orderBy === key}
												direction={orderBy === key ? order : "asc"}
												onClick={() => handleSort(key as keyof Patient)}
											>
												{label}
											</TableSortLabel>
										</TableCell>
									))}
									<TableCell sx={headCellSx}>Status</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{isLoading && page === 1 ? (
									<TableRow>
										<TableCell colSpan={9} align="center" sx={{ py: 4 }}>
											<CircularProgress />
										</TableCell>
									</TableRow>
								) : sortedPatients.length === 0 ? (
									<TableRow>
										<TableCell colSpan={9} align="center" sx={{ py: 4 }}>
											<Typography color="text.secondary">
												No patients found
											</Typography>
										</TableCell>
									</TableRow>
								) : (
									sortedPatients.map((patient, index) => (
										<TableRow
											key={patient.id}
											sx={{
												backgroundColor:
													index % 2 === 0 ? "background.paper" : "action.hover",
												"&:hover": {
													backgroundColor: "action.selected",
												},
											}}
										>
											<TableCell sx={bodyCellSx}>{index + 1}</TableCell>
											<TableCell sx={bodyCellSx}>
												{/* {new Date(patient.signupDate).toLocaleDateString()} */}
												{patient.signupDate}
											</TableCell>
											<TableCell sx={bodyCellSx}>{patient.name}</TableCell>
											<TableCell sx={bodyCellSx}>{patient.email}</TableCell>
											<TableCell sx={bodyCellSx}>{patient.phone}</TableCell>
											<TableCell sx={bodyCellSx}>
												{new Date(patient.lastSeen).toLocaleString()}
											</TableCell>
											<TableCell sx={bodyCellSx}>{patient.location}</TableCell>
											<TableCell sx={bodyCellSx}>{patient.device}</TableCell>
											<TableCell sx={bodyCellSx}>
												<Chip
													label="Verified"
													size="small"
													sx={{
														bgcolor: "success.lightest",
														color: "success.main",
														fontWeight: 500,
														borderRadius: 0.5,
													}}
												/>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
						<Button
							variant="outlined"
							onClick={handleLoadMore}
							disabled={isFetching}
							sx={{ minWidth: 150 }}
						>
							{isFetching ? <CircularProgress size={24} /> : "Load More"}
						</Button>
					</Box>
				</CardContent>
			</Card>
		</Grow>
	);
}
