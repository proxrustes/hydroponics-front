import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";

type LevelAdjustmentItemProps = {
  label: string;
  defaultValue: number;
};

export function LevelAdjustmentItem({
  label,
  defaultValue,
}: LevelAdjustmentItemProps) {
  return (
    <Grid size={12}>
      <TextField
        label={label}
        type="number"
        defaultValue={defaultValue}
        fullWidth
      />
    </Grid>
  );
}
