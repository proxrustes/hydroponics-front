import { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";

export function DeviceController({
  title,
  device,
  onApplySchedule,
}: {
  title: string;
  device: string;
  onApplySchedule: (schedule: Record<string, string>[]) => void;
}) {
  const [schedule, setSchedule] = useState<any[]>([]);

  const handleAddSchedule = () => {
    setSchedule([
      ...schedule,
      {
        onTime: "",
        offTime: "",
        device: device,
      },
    ]);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index] = { ...updatedSchedule[index], [field]: value };
    setSchedule(updatedSchedule);
  };

  const handleApply = () => {
    // Перевірка на порожні значення, щоб не відправляти некоректні дані
    const validSchedule = schedule.filter(
      (item) => item.onTime && item.offTime
    );
    if (validSchedule.length > 0) {
      onApplySchedule(validSchedule);
    } else {
      alert("Заповніть всі поля інтервалів!");
    }
  };

  return (
    <Stack>
      <Typography variant="h6">{title}</Typography>
      {schedule.map((item, index) => (
        <Stack direction="row" spacing={2} key={index} alignItems="center">
          {/* Поле для старту */}
          <TextField
            label="Start Time"
            value={item.onTime || ""}
            onChange={(e) => handleChange(index, "onTime", e.target.value)}
            fullWidth
            type="time"
          />
          {/* Поле для кінця */}
          <TextField
            label="End Time"
            value={item.offTime || ""}
            onChange={(e) => handleChange(index, "offTime", e.target.value)}
            fullWidth
            type="time"
          />
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
