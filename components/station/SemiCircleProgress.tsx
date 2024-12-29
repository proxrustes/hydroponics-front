import { Box, CircularProgress, Typography } from "@mui/material";

interface SemiCircleProgressProps {
  value: string;
  label: string;
  warning?: boolean;
  progress: number
}

export function SemiCircleProgress({ value, label, warning,progress }: SemiCircleProgressProps) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box position="relative">
        <CircularProgress
          variant="determinate"
          value={70} 
          size={180}
          thickness={6}
          sx={{
            transform: `rotate(-215deg) !important`,
            color: warning ? "#f98383" : "secondary.main", 
          }}
        />
         <CircularProgress
          variant="determinate"
          value={progress * 0.7} 
          size={180}
          thickness={6}
          sx={{
            position: "absolute", // Накладываем поверх базового круга
      top: 0,
      left: 0,
            transform: `rotate(-215deg) !important`,
            color: warning ? "error.main" : "primary.main", 
          }}
        />
        <Typography
          
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: 800,
            fontSize: 24,
            color: warning ? "error.main" : "primary.dark"
          }}
        >
          {value}
        </Typography>
      </Box>
      <Typography variant="body2" fontWeight="bold" sx={{ mt: -6, maxWidth: 100, textAlign: "center", color: "primary.dark" }}>
        {label}
      </Typography>
    </Box>
  );
}
