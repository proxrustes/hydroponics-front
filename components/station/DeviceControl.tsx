import { useState } from "react";
import { Button, Stack, Typography, TextField, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { CustomContainer } from "../CustomContainer";

interface DeviceControlProps {
  title: string;
  scheduleFields: { label: string; type: string }[];
  onApplySchedule: (schedule: Record<string, string>) => void;
}

export function DeviceControl({
  title,
  scheduleFields,
  onApplySchedule,
}: DeviceControlProps) {
  const [mode, setMode] = useState<"manual" | "automatic" | null>("automatic"); // Выбранный режим
  const [isOn, setIsOn] = useState(false); // Устройство работает или нет
  const [schedule, setSchedule] = useState<Record<string, string>>({}); // Текущее расписание

  const handleScheduleChange = (field: string, value: string) => {
    setSchedule((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplySchedule = () => {
    if (Object.values(schedule).some((value) => !value)) {
      alert(`Please fill in all fields for ${title} schedule.`);
    } else {
      setIsOn(true);
      onApplySchedule(schedule);
    }
  };

  const handleStop = () => {
    setIsOn(false);
  };

  const handleModeChange = (event: React.MouseEvent<HTMLElement>, newMode: "manual" | "automatic" | null) => {
    if (newMode !== null) {
      setMode(newMode);
      setIsOn(false); 
    }
  };

  return (
    <CustomContainer>
      <Typography sx={{ textAlign: "center", fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography>
        Status:
        <strong>
          {isOn
            ? mode === "manual"
              ? " Manual (On)"
              : " Automatic (On)"
            : " Off"}
        </strong>
      </Typography>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleModeChange}
        sx={{mb: 2 }}
        fullWidth
        size="small"
      >
        <ToggleButton value="automatic">Automatic</ToggleButton>
        <ToggleButton value="manual">Manual</ToggleButton>
      </ToggleButtonGroup>
      {mode === "automatic" && (
        <>
          <Stack mt={2} spacing={1}>
            {scheduleFields.map((field) => (
              <TextField
                key={field.label}
                label={field.label}
                type={field.type}
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={schedule[field.label] || ""}
                onChange={(e) => handleScheduleChange(field.label, e.target.value)}
              />
            ))}
          </Stack>
          <Stack mt={2} direction="row" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" color="error" onClick={handleStop}>
              Stop
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleApplySchedule}
            >
              Apply Schedule
            </Button>
          </Stack>
        </>
      )}
      {mode === "manual" && (
        <Stack gap={1}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={() => setIsOn(true)}
          >
            Start
          </Button>
          <Button variant="outlined" fullWidth color="error" onClick={handleStop}>
            Stop
          </Button>
        </Stack>
      )}
    </CustomContainer>
  );
}
