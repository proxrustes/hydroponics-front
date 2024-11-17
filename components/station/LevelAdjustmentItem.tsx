import { Box, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

type LevelAdjustmentItemProps = {
  label: string;
  defaultValue: number;
};

function LevelAdjustmentItem({ label, defaultValue }: LevelAdjustmentItemProps) {
  return (
    <Grid container spacing={2} sx={{mb:2}} alignItems="center">
      <Grid size={12}>
        <TextField
          label={label}
          type="number"
          defaultValue={defaultValue}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}

export function LevelAdjustmentsSection() {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Level Adjustments</Typography>
      <LevelAdjustmentItem label="pH Level" defaultValue={5.8} />
      <LevelAdjustmentItem label="Nutrient Concentration" defaultValue={1.2} />
    </Box>
  );
}
