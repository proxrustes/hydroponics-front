import { Box, Stack, Typography } from "@mui/material";

export type ParameterCardProps = {
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

export function ParameterCard({
  name,
  icon,
  value,
  valueFormatter = "",
  norm,
  target,
}: ParameterCardProps) {
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

      <Stack direction="row" gap={2}>
        <Typography variant="h4" color="primary.main" sx={{ fontWeight: 600 }}>
          {round(value)} {valueFormatter}
        </Typography>

        {target !== undefined && (
          <Typography
            variant="h4"
            color="primary.main"
            sx={{ fontWeight: 600 }}
          >
            → {round(target)} {valueFormatter}
          </Typography>
        )}
      </Stack>

      {norm && (
        <Typography variant="body2" color="text.secondary">
          Норма: {round(norm[0])}–{round(norm[1])} {valueFormatter}
        </Typography>
      )}
    </Box>
  );
}

export type ParameterRowProps = {
  name: string;
  value: number;
  target?: number;
  valueFormatter?: string;
  norm?: [number, number];
  icon: string;
};

export function ParameterRow({
  name,
  icon,
  value,
  valueFormatter = "",
  norm,
  target,
}: ParameterRowProps) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography width={220} variant="body1">
        {icon} {name}
      </Typography>

      <Typography variant="body1" width={80} fontWeight={600}>
        {round(value)} {valueFormatter}
      </Typography>

      {target !== undefined && (
        <Typography variant="body1" color="primary">
          → {round(target)} {valueFormatter}
        </Typography>
      )}

      {norm && (
        <Typography variant="body2" color="text.secondary">
          ({round(norm[0])}–{round(norm[1])} {valueFormatter})
        </Typography>
      )}
    </Stack>
  );
}
