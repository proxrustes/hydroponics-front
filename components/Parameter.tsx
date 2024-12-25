import { Typography, Box, Tooltip, Stack } from "@mui/material";
import { ReactNode } from "react";

type ParameterProps = {
  name: string;
  value: number;
  valueFormatter?: string;
  norm: [number, number];
  icon: ReactNode;
  variant?: "default" | "small";
};

function isParamInRange(value: number, range: [number, number]): boolean {
  return value >= range[0] && value <= range[1];
}

export function Parameter({ name, value, norm, valueFormatter, icon, variant = "default" }: ParameterProps) {
  const inRange = isParamInRange(value, norm);

  if (variant === "small") {
    return (
      <Tooltip title={name} placement="bottom">
        <Stack direction="row" gap={2} alignItems="center" mb={1} p={1}
          sx={{ backgroundColor: inRange ? 'inherit' : '#f58742', borderRadius: 2 }}>
          <Typography sx={{fontSize: 62}}>{icon}</Typography>
          <Stack>
            <Typography sx={{ fontSize: 18, fontWeight:800 }}>
              {name}
            </Typography>
            <Typography sx={{ fontSize: 34, fontWeight: 600, lineHeight: 1 }}>
              {value}{valueFormatter}
            </Typography>
          </Stack>

        </Stack>
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
