import { Box, Button, Slider, Stack, Switch, TextField, Typography } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import AirIcon from "@mui/icons-material/Air";
import WaterPumpIcon from "@mui/icons-material/Opacity";
import FilterIcon from "@mui/icons-material/FilterList";
import Grid2 from "@mui/material/Grid2";
import { ControlItem } from "./ControlItem";
import { LevelAdjustmentItem } from "./LevelAdjustmentItem";
import { TimerControlSection } from "./TimerSettingItem";


export function ManualControlSection() {
  return (
    <Stack>
      <Typography variant="h4">Manual Control:</Typography>
      <Stack
        sx={{
          borderColor: "primary.main",
          borderWidth: 4,
          borderStyle: "solid",
          py: 2,
          px: 4,
          borderRadius: 8,
        }}
      >
        <Grid2 container spacing={2}>
          <ControlItem icon={<LightbulbIcon />} label="Light" defaultSliderValue={70} />
          <ControlItem icon={<AirIcon />} label="Fan" defaultSliderValue={50} />
          <ControlItem icon={<WaterPumpIcon />} label="Water Pump" defaultSliderValue={60} />
          <ControlItem icon={<FilterIcon />} label="Filter Water Pump" />

          <TimerControlSection />

          <Typography variant="h6" sx={{ mt: 3 }}>Level Adjustments</Typography>
          <LevelAdjustmentItem label="pH Level" defaultValue={5.8} />
          <LevelAdjustmentItem label="Nutrient Concentration" defaultValue={1.2} />
        </Grid2>

        <Box mt={4}>
          <Button variant="contained" color="primary" fullWidth>
            Apply Settings
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
}
