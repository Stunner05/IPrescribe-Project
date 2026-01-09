// Mock API functions for TanStack React Query

export type Patient = {
	id: string;
	name: string;
	email: string;
	phone: string;
	location: string;
	signupDate: string;
	lastSeen: string;
	device: "iOS" | "Android" | "Web";
	status: "verified";
};

export interface DashboardStats {
	totalPatients: number;
	totalDoctors: number;
	PendingReviews: number;
	totalConsultations: number;
	PrescriptionsIssued: number;
}

export interface ChartData {
	name: string;
	users: number;
	consultations: number;
	orders: number;
}

export const mockPatients: Patient[] = [
	{
		id: "1",
		name: "Isagi Yoichi",
		email: "isagi.yoichi@example.com",
		phone: "(704) 555-0127",
		location: "Lagos",
		signupDate: "2024-09-05",
		lastSeen: "2024-09-05T15:30:37",
		device: "iOS",
		status: "verified",
	},
	{
		id: "2",
		name: "Esther Howard",
		email: "sara.cruz@example.com",
		phone: "(208) 555-0112",
		location: "Abuja",
		signupDate: "2025-08-19",
		lastSeen: "2024-09-05T15:30:37",
		device: "Android",
		status: "verified",
	},
	{
		id: "3",
		name: "Jenny Wilson",
		email: "felicia.reid@example.com",
		phone: "(205) 555-0100",
		location: "Sokoto",
		signupDate: "2023-06-09",
		lastSeen: "2024-09-05T15:30:37",
		device: "Android",
		status: "verified",
	},
	{
		id: "4",
		name: "Guy Hawkins",
		email: "tanya.hill@example.com",
		phone: "(205) 555-0100",
		location: "Kaduna",
		signupDate: "2024-07-12",
		lastSeen: "2024-09-05T15:30:37",
		device: "Android",
		status: "verified",
	},
	{
		id: "5",
		name: "Jacob Jones",
		email: "jacob@example.com",
		phone: "(205) 555-0100",
		location: "Ogun",
		signupDate: "2025-04-15",
		lastSeen: "2024-09-05T15:30:37",
		device: "iOS",
		status: "verified",
	},
];

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
	await delay(800);
	return {
		totalPatients: 10,
		totalDoctors: 5,
		PendingReviews: 3,
		totalConsultations: 0,
		PrescriptionsIssued: 0,
	};
};

export const fetchChartData = async (): Promise<ChartData[]> => {
	await delay(800);

	const rawData = [
		{ name: "Jan", users: 42, consultations: 40, orders: 14 },
		{ name: "Feb", users: 62, consultations: 50, orders: 22 },
		{ name: "Mar", users: 50, consultations: 60, orders: 20 },
		{ name: "Apr", users: 52, consultations: 70, orders: 25 },
		{ name: "May", users: 95, consultations: 85, orders: 30 },
		{ name: "Jun", users: 70, consultations: 60, orders: 25 },
		{ name: "Jul", users: 80, consultations: 65, orders: 22 },
		{ name: "Aug", users: 59, consultations: 75, orders: 30 },
		{ name: "Sep", users: 62, consultations: 80, orders: 32 },
		{ name: "Oct", users: 62, consultations: 85, orders: 35 },
		{ name: "Nov", users: 58, consultations: 75, orders: 34 },
		{ name: "Dec", users: 40, consultations: 60, orders: 38 },
	];

	// Ensure values do not exceed 100
	return rawData.map((d) => ({
		...d,
		users: Math.min(d.users, 100),
		consultations: Math.min(d.consultations, 100),
		orders: Math.min(d.orders, 100),
	}));
};

export const fetchPatients = async (
	page: number = 1,
	limit: number = 8
): Promise<Patient[]> => {
	await delay(1000);

	const start = (page - 1) * limit;
	const end = start + limit;

	// Generate more patients if needed
	if (start >= mockPatients.length) {
		const names = [
			"Alex",
			"Morgan",
			"Jordan",
			"Taylor",
			"Casey",
			"Riley",
			"Sam",
			"Jamie",
			"Drew",
			"Avery",
		];
		const lastNames = [
			"Smith",
			"Jones",
			"Davis",
			"Miller",
			"Wilson",
			"Moore",
			"Jackson",
			"Martin",
			"Thompson",
			"Harris",
		];
		const cities = [
			"Miami",
			"Seattle",
			"Boston",
			"Denver",
			"Atlanta",
			"Portland",
			"Detroit",
			"Nashville",
			"Memphis",
			"Baltimore",
		];
		const statuses: ("active" | "inactive" | "pending")[] = [
			"active",
			"active",
			"active",
			"pending",
			"inactive",
		];

		const devices: ("iOS" | "Android" | "Web")[] = ["iOS", "Android", "Web"];

		const newPatients = Array.from({ length: limit }, (_, i) => {
			const id = start + i + 1;
			const firstName = names[i % names.length];
			const lastName = lastNames[i % lastNames.length];
			const city = cities[i % cities.length];

			return {
				id: id.toString(),
				name: `${firstName} ${lastName}`,
				email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${id}@email.com`,
				phone: `+1 234 567 ${8900 + id}`,
				location: `${city}, USA`,
				signupDate: new Date(2024, 11, 25 - i).toISOString().split("T")[0],
				lastSeen: new Date(2024, 11, 25 - i).toISOString(),
				device: devices[i % devices.length],
				status: "verified" as const,
			};
		});

		return newPatients;
	}

	return mockPatients.slice(start, end);
};

export const loginUser = async (
	email: string,
	password: string
): Promise<{
	success: boolean;
	user?: { email: string; name: string; role: string };
}> => {
	await delay(1500);

	if (email === "admin@careoneclinics.com" && password === "admin123") {
		return {
			success: true,
			user: {
				email: "admin@careoneclinics.com",
				name: "Alexandro",
				role: "Admin",
			},
		};
	}

	return { success: false };
};
