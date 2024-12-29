import { Stack, Box, Grid, Button } from "@mui/material";
import { DeviceControl } from "./DeviceControl";

export function ManualControlSection() {
  const handleApplySchedule = (device: string, schedule: Record<string, string>) => {
    alert(`${device} schedule applied: ${JSON.stringify(schedule)}`);
  };

  return (
    <Stack>
      <Grid container spacing={2}>
        {/* Light Section */}
        <Grid item xs={4}>
          <DeviceControl
            title="Light"
            scheduleFields={[
              { label: "Start Time", type: "time" },
              { label: "End Time", type: "time" },
            ]}
            onApplySchedule={(schedule) => handleApplySchedule("Light", schedule)}
          />
        </Grid>

        {/* Fan Section */}
        <Grid item xs={4}>
          <DeviceControl
            title="Fan"
            scheduleFields={[
              { label: "Start Time", type: "time" },
              { label: "End Time", type: "time" },
            ]}
            onApplySchedule={(schedule) => handleApplySchedule("Fan", schedule)}
          />
        </Grid>

        {/* Water Pump Section */}
        <Grid item xs={4}>
          <DeviceControl
            title="Water Pump"
            scheduleFields={[
              { label: "Start Time", type: "time" },
              { label: "Liters to Pump", type: "number" },
            ]}
            onApplySchedule={(schedule) => handleApplySchedule("Water Pump", schedule)}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
