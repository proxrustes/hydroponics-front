import { Box, Typography } from "@mui/material";

export type ParameterProps = {
  name: string;
  value: number;
  target?: number;
  valueFormatter?: string;
  norm?: [number, number];
  icon: string;
};

function round(value: number): number {
  return Math.round(value * 10) / 10;
}

export function Parameter({
  name,
  icon,
  value,
  valueFormatter = "",
  norm,
  target,
}: ParameterProps) {
  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" fontWeight={700}>
        {icon} {name}
      </Typography>

      <Typography variant="h4" fontWeight={700} color="primary">
        {round(value)} {valueFormatter}
      </Typography>

      {norm && (
        <Typography variant="body2" color="text.secondary">
          Норма: {round(norm[0])}–{round(norm[1])} {valueFormatter}
        </Typography>
      )}

      {target !== undefined && (
        <Typography variant="body2" color="secondary">
          🎯 Ціль: {round(target)} {valueFormatter}
        </Typography>
      )}
    </Box>
  );
}
