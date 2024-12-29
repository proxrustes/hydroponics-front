import { ParameterProps } from "@/enums/types/Params";
import { Box, CircularProgress, Typography } from "@mui/material";


export function SemiCircleProgress(props: { param: ParameterProps}) {
  const min = props.param.norm[0];
  const max = props.param.norm[1];
  const value = props.param.value;

  let progress = ((value - min) / (max - min)) * 100;
  let isOutOfRange = value < min || value > max;

  if (value > max) {
    progress = 100;
  } else if (value < min) {
    progress = 0;
  }

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
            color: isOutOfRange ? "#f98383" : "secondary.main",
          }}
        />
        <CircularProgress
          variant="determinate"
          value={progress * 0.7}
          size={180}
          thickness={6}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: `rotate(-215deg) !important`,
            color: isOutOfRange ? "error.main" : "primary.main",
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
            color: isOutOfRange ? "error.main" : "primary.dark"
          }}
        >
          {value}{props.param.valueFormatter}
        </Typography>
      </Box>
      <Typography fontWeight="bold" sx={{ mt: -8, textAlign: "center", fontSize: 32 }}>
        {props.param.icon}
      </Typography>
      <Typography variant="body2" fontWeight="bold" sx={{ textAlign: "center", color: "primary.dark" }}>
        {props.param.name}
      </Typography>
    </Box>
  );
}
