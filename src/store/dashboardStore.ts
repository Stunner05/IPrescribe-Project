import { create } from "zustand";

interface DashboardState {
	activeNav: string;
	sidebarOpen: boolean;
	setActiveNav: (nav: string) => void;
	toggleSidebar: () => void;
	closeSidebar: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
	activeNav: "dashboard",
	sidebarOpen: false,
	setActiveNav: (nav) => set({ activeNav: nav }),
	toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
	closeSidebar: () => set({ sidebarOpen: false }),
}));
