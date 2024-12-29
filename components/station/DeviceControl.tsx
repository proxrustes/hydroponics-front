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
    setIsOn(false); // Остановить устройство
  };

  const handleModeChange = (event: React.MouseEvent<HTMLElement>, newMode: "manual" | "automatic" | null) => {
    if (newMode !== null) {
      setMode(newMode);
      setIsOn(false); // Остановить устройство при смене режима
    }
  };

  return (
    <CustomContainer>
      <Typography sx={{ textAlign: "center", fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography  sx={{ textAlign: "center"}}>
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
        sx={{ mt: 2, mb: 2 }}
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
          <Stack mt={2} direction="row" gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleApplySchedule}
            >
              Apply Schedule
            </Button>
            <Button variant="contained" color="error" onClick={handleStop}>
              Stop
            </Button>
          </Stack>
        </>
      )}
      {mode === "manual" && (
        <Stack mt={2} direction="row" gap={2}>
          <Button
            variant="contained"
            color="success"
            onClick={() => setIsOn(true)}
          >
            Start
          </Button>
          <Button variant="contained" color="error" onClick={handleStop}>
            Stop
          </Button>
        </Stack>
      )}
    </CustomContainer>
  );
}
