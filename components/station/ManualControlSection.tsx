import { Divider, Stack, } from "@mui/material";
import { DeviceControl } from "./DeviceControl";

export function ManualControlSection() {
  const handleApplySchedule = (title: string, schedule: Record<string, string>[]) => {
    console.log(`Schedule for ${title}:`, schedule);
  };

  return (
    <Stack>
      <DeviceControl
        title="Light"
        scheduleFields={[
          { label: "Start Time", type: "time" },
          { label: "End Time", type: "time" },
        ]}
        onApplySchedule={(schedule) => handleApplySchedule("Light", schedule)}
      />
      <Divider sx={{ my: 2 }} />
      <DeviceControl
        title="Fan"
        scheduleFields={[
          { label: "Start Time", type: "time" },
          { label: "End Time", type: "time" },
        ]}
        onApplySchedule={(schedule) => handleApplySchedule("Fan", schedule)}
      />

      <Divider sx={{ my: 2 }} />
      <DeviceControl
        title="Water Pump"
        scheduleFields={[
          { label: "Start Time", type: "time" },
          { label: "Liters to Pump", type: "number" },
        ]}
        onApplySchedule={(schedule) => handleApplySchedule("Water Pump", schedule)}
      />
    </Stack>
  );
}
