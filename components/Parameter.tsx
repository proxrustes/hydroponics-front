import { Typography, Box, Tooltip } from "@mui/material";
import { ReactNode } from "react";

type ParameterProps = {
  name: string;
  value: number;
  norm: [number, number];
  icon: ReactNode;
  variant?: "default" | "small"; 
};

function isParamInRange(value: number, range: [number, number]): boolean {
  return value >= range[0] && value <= range[1];
}

export function Parameter({ name, value, norm, icon, variant = "default" }: ParameterProps) {
  const inRange = isParamInRange(value, norm);
  
  if (variant === "small") {
    return (
      <Tooltip title={name} placement="bottom">
        <Box display="flex" flexDirection="column" alignItems="center" mb={1}  sx={{backgroundColor: inRange ? 'inherit' : '#750707', borderRadius:2}}>
          {icon}
          <Typography sx={{ fontSize: '0.875rem' }}>
            {value}
          </Typography>
        </Box>
      </Tooltip>
    );
  }

  return (
    <Box display="flex" alignItems="center" mb={1}>
      {icon}
      <Typography sx={{ fontWeight: 600, marginRight: 1 }}>{name}:</Typography>
      <Typography sx={{ color: inRange ? 'inherit' : 'red' }}>
        {value}
      </Typography>
    </Box>
  );
}
