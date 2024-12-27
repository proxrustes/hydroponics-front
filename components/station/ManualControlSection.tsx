import { Box, Button, Stack, Typography } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import AirIcon from "@mui/icons-material/Air";
import WaterPumpIcon from "@mui/icons-material/Opacity";
import FilterIcon from "@mui/icons-material/FilterList";
import Grid2 from "@mui/material/Grid2";
import { ControlItem } from "./ControlItem";
import { LevelAdjustmentsSection } from "./LevelAdjustmentItem";
import { TimerControlSection } from "./TimerSettingItem";
import { CustomContainer } from "../CustomContainer";

export function ManualControlSection() {
  return (
    <Stack>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <CustomContainer>
            <ControlItem
              icon={<LightbulbIcon />}
              label="Light"
              defaultSliderValue={70}
            />
            <ControlItem
              icon={<AirIcon />}
              label="Fan"
              defaultSliderValue={50}
            />
            <ControlItem
              icon={<WaterPumpIcon />}
              label="Water Pump"
              defaultSliderValue={60}
            />
          </CustomContainer>
        </Grid2>

        <Grid2 size={6}>
          <CustomContainer>
          </CustomContainer>
        </Grid2>
        <Grid2
          size={6}
        >
          <CustomContainer>
          </CustomContainer>
        </Grid2>
      </Grid2>

      <Box mt={4}>
        <Button variant="contained" color="primary" fullWidth sx={{fontSize: 22}}>
          Apply Settings
        </Button>
      </Box>
    </Stack>
  );
}
