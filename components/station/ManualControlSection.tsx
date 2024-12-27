import { Box, Button, Stack, Typography } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import AirIcon from "@mui/icons-material/Air";
import WaterPumpIcon from "@mui/icons-material/Opacity";
import Grid2 from "@mui/material/Grid2";
import { ControlItem } from "./ControlItem";
import { CustomContainer } from "../CustomContainer";

export function ManualControlSection() {
  return (
    <Stack>
      <Grid2 container spacing={2}>
        <Grid2 size={4}>
          <CustomContainer>
            <Typography sx={{ textAlign: "center", fontWeight: 600 }}>Light</Typography>
            <ControlItem
              defaultSliderValue={40000}
              min={0}
              max={100000}
              valueFormatter="Lux"
            />
          </CustomContainer>
        </Grid2>
        <Grid2
          size={4}
        >
          <CustomContainer>
            <Typography sx={{ textAlign: "center", fontWeight: 600 }}>Fan</Typography>
            <ControlItem
              defaultSliderValue={50}
              valueFormatter="%"
            />
          </CustomContainer>
        </Grid2>
        <Grid2
          size={4}
        >
          <CustomContainer>
            <Typography sx={{ textAlign: "center", fontWeight: 600 }}>Water Pump</Typography>
            <ControlItem
              defaultSliderValue={50}
              valueFormatter="%"
            />
          </CustomContainer>
        </Grid2>
      </Grid2>

      <Box mt={4}>
        <Button variant="contained" color="primary" fullWidth sx={{ fontSize: 22 }}>
          Apply Settings
        </Button>
      </Box>
    </Stack>
  );
}
