import { useState, useEffect } from "react";
import { Typography, TextField, Switch, Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";

type TimerSettingProps = {
  label: string;
  onTimeout: () => void;
};

function TimerSetting({ label, onTimeout }: TimerSettingProps) {
  const [time, setTime] = useState<number | string>(""); // Время в часах
  const [endTime, setEndTime] = useState<Date | null>(null); // Время окончания
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (timerActive && typeof time === "number" && time > 0) {
      const calculatedEndTime = new Date(Date.now() + time * 60 * 60 * 1000);
      setEndTime(calculatedEndTime);
      timeout = setTimeout(() => {
        onTimeout();
        setTimerActive(false);
        setEndTime(null);
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
    setEndTime(null);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid size={2}>
        <Switch
          checked={timerActive}
          onChange={() => setTimerActive(!timerActive)}
        />
      </Grid>
      <Grid size={4}>
        <Typography>{label} Timer (hrs):</Typography>
        {endTime && (
          <Typography variant="body2" color="textSecondary">
            Ends at: {endTime.toLocaleTimeString()}
          </Typography>
        )}
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
        <Button
          variant="contained"
          color="success"
          onClick={handleStartTimer}
          disabled={timerActive || time === ""}
        >
          Start
        </Button>
      </Grid>
      <Grid size={2}>
        <Button
          variant="outlined"
          color="error"
          onClick={handleStopTimer}
          disabled={!timerActive}
        >
          Stop
        </Button>
      </Grid>
    </Grid>
  );
}

export function TimerControlSection() {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Timer Settings
      </Typography>
      <Grid container spacing={2}>
        <Grid size={12}>
          <TimerSetting
            label="Light"
            onTimeout={() => alert("Light timer ended")}
          />
        </Grid>
        <Grid size={12}>
          <TimerSetting
            label="Fan"
            onTimeout={() => alert("Fan timer ended")}
          />
        </Grid>
        <Grid size={12}>
          <TimerSetting
            label="Pump"
            onTimeout={() => alert("Pump timer ended")}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
