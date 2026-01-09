import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Typography } from "@mui/material";

type DynamicTooltipProps = {
	active?: boolean;
	payload?: readonly any[];
	label?: string | number;
	color?: string;
	suffix?: string;
};

export function DynamicTooltip({
	active,
	payload,
	label,
	color = "#2563eb",
	suffix = "Value",
}: DynamicTooltipProps) {
	if (!active || !payload || !payload.length) return null;

	const displayLabel = String(label || payload[0]?.name || payload[0]?.dataKey);
	const displayColor = color || payload[0]?.payload?.color || payload[0]?.fill;
	const displayValue =
		payload[0]?.value !== undefined
			? payload[0].value
			: Object.values(payload[0]?.payload || {}).filter(
					(v) => typeof v === "number"
			  )[0];
	return (
		<Box
			sx={{
				backgroundColor: "#111827",
				borderRadius: "12px",
				px: 2,
				py: 1.5,
				color: "#fff",
				display: "flex",
				alignItems: "center",
				gap: 1.5,
				boxShadow: "0px 10px 30px rgba(0,0,0,0.35)",
			}}
		>
			<CheckCircleIcon
				sx={{
					color: displayColor,
					fontSize: 20,
				}}
			/>
			<Box>
				<Typography fontSize={12} sx={{ opacity: 0.7 }}>
					{displayLabel}
				</Typography>
				<Typography fontWeight={600}>
					{displayValue} {suffix}
				</Typography>
			</Box>
		</Box>
	);
}
