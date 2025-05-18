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
        device="LIGHT"
        onApplySchedule={(schedule) => handleApplySchedule("LIGHT", schedule)}
      />
      <Divider sx={{ my: 2 }} />
      <DeviceController
        title="Fan"
        device="FAN"
        onApplySchedule={(schedule) => handleApplySchedule("FAN", schedule)}
      />

      <Divider sx={{ my: 2 }} />
      <DeviceController
        title="Water Pump"
        device="PUMP"
        onApplySchedule={(schedule) => handleApplySchedule("PUMP", schedule)}
      />
    </Stack>
  );
}
