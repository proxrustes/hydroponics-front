import { Typography, Switch, Slider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";

type ControlItemProps = {
  defaultSliderValue?: number;
  valueFormatter?: string;
  min?: number;
  max?: number;
};

export function ControlItem({
  defaultSliderValue = 50,
  valueFormatter,
  min = 0,
  max = 100,
}: ControlItemProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [sliderValue, setSliderValue] = useState(defaultSliderValue);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  return (
    <Grid container spacing={2} alignItems="center" size={12}>
      <Grid size={10}>
        <Typography variant="body2" color="primary.dark">
          Min: {min} {valueFormatter} | Current: {sliderValue} {valueFormatter} | Max: {max} {valueFormatter}
        </Typography>
        <Slider
          disabled={isDisabled}
          value={sliderValue}
          step={(max / 20)}
          marks
          color="secondary"
          onChange={handleSliderChange}
          min={min}
          max={max}
        />
      </Grid>

      <Grid size={2} display="flex" justifyContent="center">
        <Switch checked={!isDisabled} color="secondary" onChange={() => setIsDisabled(!isDisabled)} />
      </Grid>
    </Grid>
  );
}
