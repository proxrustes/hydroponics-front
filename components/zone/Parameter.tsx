import type { ComponentType } from "react";
import { Box, Stack, Typography } from "@mui/material";
import type { SvgIconProps } from "@mui/material/SvgIcon";

export type ParameterCardProps = {
  name: string;
  value: number;
  target?: number;
  valueFormatter?: string;
  norm?: [number, number];
  icon: ComponentType<SvgIconProps>;
};

function round(value: number): number {
  return Math.round(value * 10) / 10;
}

export function ParameterCard({
  name,
  icon: Icon,
  value,
  valueFormatter = "",
  norm,
  target,
}: ParameterCardProps) {
  return (
    <Box
      sx={{
        p: 1.25,
        border: "1px solid #ccc",
        borderRadius: 1.5,
        display: "flex",
        flexDirection: "column",
        gap: 0.25,
      }}
    >
      <Typography
        variant="subtitle2"
        fontWeight={700}
        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
      >
        <Icon fontSize="small" /> {name}
      </Typography>

      <Stack direction="row" gap={1} alignItems="baseline">
        <Typography variant="h6" color="primary.main" sx={{ fontWeight: 600 }}>
          {round(value)} {valueFormatter}
        </Typography>

        {target !== undefined && (
          <Typography
            variant="body2"
            color="primary.main"
            sx={{ fontWeight: 600 }}
          >
            → {round(target)} {valueFormatter}
          </Typography>
        )}
      </Stack>

      {norm && (
        <Typography variant="caption" color="text.secondary">
          Норма: {round(norm[0])}–{round(norm[1])} {valueFormatter}
        </Typography>
      )}
    </Box>
  );
}

export type ParameterRowProps = {
  name: string;
  value?: number;
  target?: number;
  valueFormatter?: string;
  norm?: [number, number];
  icon: ComponentType<SvgIconProps>;
};

export function ParameterRow({
  name,
  icon: Icon,
  value,
  valueFormatter = "",
  norm,
  target,
}: ParameterRowProps) {
  return (
    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" rowGap={0.25}>
      <Stack direction="row" alignItems="center" gap={0.5} width={140}>
        <Icon fontSize="small" sx={{ flexShrink: 0 }} />
        <Typography variant="body2" noWrap>
          {name}
        </Typography>
      </Stack>

      <Typography
        variant="body2"
        width={value === undefined ? 90 : 64}
        fontWeight={value === undefined ? 400 : 600}
        fontStyle={value === undefined ? "italic" : undefined}
        color={value === undefined ? "text.secondary" : undefined}
        sx={{ whiteSpace: "nowrap" }}
      >
        {value === undefined ? "немає даних" : `${round(value)} ${valueFormatter}`}
      </Typography>

      {target !== undefined && (
        <Typography variant="body2" color="primary">
          → {round(target)} {valueFormatter}
        </Typography>
      )}

      {norm && (
        <Typography variant="caption" color="text.secondary">
          ({round(norm[0])}–{round(norm[1])} {valueFormatter})
        </Typography>
      )}
    </Stack>
  );
}
