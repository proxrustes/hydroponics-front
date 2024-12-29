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
  const [sliderValue, setSliderValue] = useState(defaultSliderValue);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  return (
    <Grid container spacing={2} alignItems="center" size={12}>
        <Typography variant="body2" color="primary.dark">
          Min: {min} {valueFormatter} | Current: {sliderValue} {valueFormatter} | Max: {max} {valueFormatter}
        </Typography>
        <Slider
          value={sliderValue}
          step={(max / 20)}
          marks
          color="secondary"
          onChange={handleSliderChange}
          min={min}
          max={max}
        />
    </Grid>
  );
}
