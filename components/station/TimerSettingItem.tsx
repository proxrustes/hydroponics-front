import { useState, useEffect } from "react";
import { Typography, TextField, Switch, Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";

type TimerSettingProps = {
  label: string;
  onTimeout: () => void;
};

function TimerSetting({ label, onTimeout }: TimerSettingProps) {
  const [time, setTime] = useState<number | string>(""); // Время в часах
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (timerActive && typeof time === "number" && time > 0) {
      timeout = setTimeout(() => {
        onTimeout();
        setTimerActive(false);
      }, time * 60 * 60 * 1000); // Преобразование часов в миллисекунды
    }
    return () => clearTimeout(timeout);
  }, [timerActive, time, onTimeout]);

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setTime(isNaN(newValue) ? "" : newValue);
  };

  const handleStartTimer = () => {
    if (typeof time === "number" && time > 0) {
      setTimerActive(true);
    }
  };

  const handleStopTimer = () => {
    setTimerActive(false);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid size={4}>
        <Typography>{label} Timer (hrs):</Typography>
      </Grid>
      <Grid size={2}>
        <TextField
          type="number"
          value={time}
          onChange={handleTimeChange}
          disabled={timerActive}
          sx={{ width: "100px" }}
        />
      </Grid>
      <Grid size={2}>
        <Switch checked={timerActive} onChange={() => setTimerActive(!timerActive)} />
      </Grid>
      <Grid size={2}>
        <Button variant="contained" onClick={handleStartTimer} disabled={timerActive || time === ""}>
          Start
        </Button>
      </Grid>
      <Grid size={2}>
        <Button variant="outlined" onClick={handleStopTimer} disabled={!timerActive}>
          Stop
        </Button>
      </Grid>
    </Grid>
  );
}

export function TimerControlSection() {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Timer Settings</Typography>
      <Grid container spacing={2}>
        <Grid size={12}>
          <TimerSetting label="Light" onTimeout={() => alert("Light timer ended")} />
        </Grid>
        <Grid size={12}>
          <TimerSetting label="Fan" onTimeout={() => alert("Fan timer ended")} />
        </Grid>
        <Grid size={12}>
          <TimerSetting label="Pump" onTimeout={() => alert("Pump timer ended")} />
        </Grid>
      </Grid>
    </Box>
  );
}
