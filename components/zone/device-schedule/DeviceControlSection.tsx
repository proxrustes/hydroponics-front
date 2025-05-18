import { Divider, Stack } from "@mui/material";
import { DeviceController } from "./DeviceController";
import { customFetch } from "@/lib/utils/apiUtils";

export function DeviceControlSection({
  uuid,
  index,
}: {
  uuid: string;
  index: number;
}) {
  const handleApplySchedule = (
    title: string,
    schedule: Record<string, string>[]
  ) => {
    console.log(`Schedule for ${title}:`, schedule);

    customFetch(`/station/zone/config`, "POST", {
      uuid,
      index,
      scheduleIntervals: schedule, // Передаємо інтервали
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Розклад успішно збережений!");
        } else {
          alert("Не вдалося зберегти розклад");
        }
      })
      .catch((err) => console.error("Failed to save schedule:", err));
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
        onApplySchedule={(schedule) =>
          handleApplySchedule("Water Pump", schedule)
        }
      />
    </Stack>
  );
}
