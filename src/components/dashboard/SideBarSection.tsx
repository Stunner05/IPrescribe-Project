import React from "react";
import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";

interface MenuItem {
	id: string;
	label: string;
	icon: React.ElementType; // MUI Icon component
}

interface SidebarSectionProps {
	title: string;
	items: MenuItem[];
	activeNav: string;
	setActiveNav: (id: string) => void;
	selectedBg: string;
	selectedColor: string;
	isMobile?: boolean;
	closeSidebar?: () => void;
}

export const SidebarSection: React.FC<SidebarSectionProps> = ({
	title,
	items,
	activeNav,
	setActiveNav,
	selectedBg,
	selectedColor,
	isMobile = false,
	closeSidebar,
}) => {
	return (
		<>
			<Typography
				variant="caption"
				sx={{
					px: 2.5,
					py: 1,
					display: "block",
					color: "text.secondary",
					fontWeight: 600,
					letterSpacing: 0.5,
					textTransform: "uppercase",
				}}
			>
				{title}
			</Typography>
			<List sx={{ py: 0 }}>
				{items.map((item) => {
					const Icon = item.icon;
					const isActive = activeNav === item.id;
					return (
						<ListItem key={item.id} disablePadding>
							<ListItemButton
								selected={isActive}
								onClick={() => {
									setActiveNav(item.id);
									if (isMobile && closeSidebar) closeSidebar();
								}}
								sx={{
									mx: 2,
									borderRadius: 2,
									width: "100%",
									"&.Mui-selected": {
										bgcolor: selectedBg,
										color: selectedColor,
										"&:hover": {
											bgcolor:
												selectedBg === "white"
													? "rgba(238, 234, 234, 1)"
													: "primary.dark",
										},
										"& .MuiListItemIcon-root": {
											color: selectedColor,
										},
									},
								}}
							>
								<ListItemIcon
									sx={{
										color: isActive ? selectedColor : "#fff",
										minWidth: 40,
									}}
								>
									<Icon fontSize="small" />
								</ListItemIcon>
								<ListItemText
									primary={item.label}
									primaryTypographyProps={{ variant: "body2" }}
								/>
							</ListItemButton>
						</ListItem>
					);
				})}
			</List>
		</>
	);
};
