import { Divider, Stack, } from "@mui/material";
import { DeviceController } from "./DeviceController";

export function DeviceControlSection() {
  const handleApplySchedule = (title: string, schedule: Record<string, string>[]) => {
    console.log(`Schedule for ${title}:`, schedule);
  };

  return (
    <Stack>
      <DeviceController
        title="Light"
        scheduleFields={[
          { label: "Start Time", type: "time" },
          { label: "End Time", type: "time" },
        ]}
        onApplySchedule={(schedule) => handleApplySchedule("Light", schedule)}
      />
      <Divider sx={{ my: 2 }} />
      <DeviceController
        title="Fan"
        scheduleFields={[
          { label: "Start Time", type: "time" },
          { label: "End Time", type: "time" },
        ]}
        onApplySchedule={(schedule) => handleApplySchedule("Fan", schedule)}
      />

      <Divider sx={{ my: 2 }} />
      <DeviceController
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
