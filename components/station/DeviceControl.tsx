import { useState } from "react";
import { Button, Stack, Typography, TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomContainer } from "../common/CustomContainer";

interface DeviceControlProps {
  title: string;
  scheduleFields: { label: string; type: string }[];
  onApplySchedule: (schedule: Record<string, string>[]) => void;
}

export function DeviceControl({ title, scheduleFields, onApplySchedule }: DeviceControlProps) {
  const [isOn, setIsOn] = useState(false);
  const [schedule, setSchedule] = useState<Record<string, string>[]>([
    Object.fromEntries(scheduleFields.map((field) => [field.label, ""])),
  ]);

  const handleScheduleChange = (index: number, field: string, value: string) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index][field] = value;
    setSchedule(updatedSchedule);
  };

  const handleAddRow = () => {
    setSchedule([
      ...schedule,
      Object.fromEntries(scheduleFields.map((field) => [field.label, ""])),
    ]);
  };

  const handleRemoveRow = (index: number) => {
    const updatedSchedule = [...schedule];
    updatedSchedule.splice(index, 1);
    setSchedule(updatedSchedule);
  };

  const handleApplySchedule = () => {
    if (schedule.some((row) => Object.values(row).some((value) => !value))) {
      alert("Please fill in all fields in the schedule.");
    } else {
      setIsOn(true);
      onApplySchedule(schedule);
    }
  };

  const handleStop = () => {
    setIsOn(false);
  };

  return (
    <CustomContainer>
      <Typography sx={{ fontWeight: 600, textAlign: "center" }}>
        {title}: {isOn ? "On" : "Off"}
      </Typography>

      <Stack spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Schedule:</Typography>
        {schedule.map((row, rowIndex) => (
          <Stack key={rowIndex} direction="row" spacing={2} alignItems="center">
            {scheduleFields.map((field) => (
              <TextField
                key={`${rowIndex}-${field.label}`}
                label={field.label}
                type={field.type}
                InputLabelProps={{ shrink: true }}
                value={row[field.label] || ""}
                onChange={(e) =>
                  handleScheduleChange(rowIndex, field.label, e.target.value)
                }
                fullWidth
              />
            ))}
            <IconButton
              color="error"
              onClick={() => handleRemoveRow(rowIndex)}
              disabled={schedule.length === 1}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        ))}
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={handleAddRow}
          fullWidth
        >
          Add Row
        </Button>
      </Stack>

      <Stack mt={2} direction="row" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" color="error" onClick={handleStop}>
          Stop
        </Button>
        <Button variant="contained" color="primary" onClick={handleApplySchedule}>
          Save
        </Button>
      </Stack>
    </CustomContainer>
  );
}
