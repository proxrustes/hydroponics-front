import { ParameterProps } from "@/enums/types/Params";
import { Typography, Box, Tooltip, Stack } from "@mui/material";

function isParamInRange(value: number, range: [number, number]): boolean {
  return value >= range[0] && value <= range[1];
}

export function Parameter({ name, value, norm, valueFormatter, icon }: ParameterProps) {
  const inRange = typeof value === 'number' ? isParamInRange(value, norm) : true
  const formattedValue = typeof value === "boolean" ? (value ? "ON" : "OFF") : `${value.toPrecision(3)}${valueFormatter || ""}`;
  return (
    <Tooltip title={name} placement="bottom">
      <Stack direction="row" gap={2} alignItems="center" mb={1} p={1}
        sx={{ backgroundColor: inRange ? 'inherit' : '#f58742', borderRadius: 2 }}>
        <Typography sx={{ fontSize: 62 }}>{icon}</Typography>
        <Stack>
          <Typography sx={{ fontSize: 18, fontWeight: 800 }}>
            {name}
          </Typography>
          <Typography sx={{ fontSize: 34, fontWeight: 600, lineHeight: 1 }}>
          {formattedValue}
          </Typography>
        </Stack>

      </Stack>
    </Tooltip>
  );
}
