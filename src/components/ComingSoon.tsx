import React from "react";
import { Typography, Box } from "@mui/material";

export function ComingSoonPage({ title }: { title: string }) {
	return (
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
					{title}
				</Typography>
				<Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
					Coming soon…
				</Typography>
			</Box>
		</Box>
	);
}
