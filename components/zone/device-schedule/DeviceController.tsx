import { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";

export function DeviceController({
  title,
  scheduleFields,
  onApplySchedule,
}: {
  title: string;
  scheduleFields: { label: string; type: string }[];
  onApplySchedule: (schedule: Record<string, string>[]) => void;
}) {
  const [schedule, setSchedule] = useState<any[]>([]);

  const handleAddSchedule = () => {
    setSchedule([
      ...schedule,
      {
        startTime: "",
        endTime: "",
      },
    ]);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index] = { ...updatedSchedule[index], [field]: value };
    setSchedule(updatedSchedule);
  };

  const handleApply = () => {
    onApplySchedule(schedule);
  };

  return (
    <Stack>
      <Typography variant="h6">{title}</Typography>
      {schedule.map((item, index) => (
        <Stack direction="row" spacing={2} key={index} alignItems="center">
          {scheduleFields.map((field) => (
            <TextField
              key={field.label}
              label={field.label}
              value={item[field.label.replace(" ", "").toLowerCase()] || ""}
              onChange={(e) =>
                handleChange(
                  index,
                  field.label.replace(" ", "").toLowerCase(),
                  e.target.value
                )
              }
              fullWidth
              type="time"
            />
          ))}
        </Stack>
      ))}
      <Button variant="outlined" onClick={handleAddSchedule}>
        Додати інтервал
      </Button>
      <Button variant="contained" onClick={handleApply}>
        Застосувати розклад
      </Button>
    </Stack>
  );
}
