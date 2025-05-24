import { useEffect, useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { customFetch } from "@/lib/utils/apiUtils";

export function DeviceController({
  title,
  device,
  uuid,
  index,
  onApplySchedule,
}: {
  title: string;
  device: string;
  uuid: string;
  index: number;
  onApplySchedule: (schedule: Record<string, string>[]) => void;
}) {
  const [schedule, setSchedule] = useState<any[]>([]);
  useEffect(() => {
    const fetchCurrentSchedule = async () => {
      try {
        const response = await customFetch(
          `station/zone/config?uuid=${uuid}&index=${index}`,
          "GET"
        );
        if (response.status === 200) {
          const message = response.message;
          console.log(message);
          const filteredSchedule = message.scheduleIntervals.filter(
            (interval: any) => interval.device === device
          );
          setSchedule(filteredSchedule);
        } else {
          console.error("Failed to load schedule");
        }
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };

    fetchCurrentSchedule();
  }, [uuid, index]);
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
    <Stack gap={2}>
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
      <Stack direction="row" gap={2}>
        <Button variant="outlined" fullWidth onClick={handleAddSchedule}>
          Додати інтервал
        </Button>
        <Button variant="contained" fullWidth onClick={handleApply}>
          Застосувати розклад
        </Button>
      </Stack>
    </Stack>
  );
}
