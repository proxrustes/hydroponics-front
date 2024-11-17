import { Typography, Switch, Slider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";

type ControlItemProps = {
  icon: React.ReactNode;
  label: string;
  defaultSliderValue?: number;
  min?: number;
  max?: number;
};

export function ControlItem({
  icon,
  label,
  defaultSliderValue = 50,
  min = 0,
  max = 100
}: ControlItemProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [sliderValue, setSliderValue] = useState(defaultSliderValue);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  return (
    <>
      <Grid size={2} display="flex" gap={1} justifyContent="conter" alignItems="center">
        {icon}
        <Typography>{label}</Typography>
      </Grid>
     
     
      <Grid size={9}>
        <Typography variant="body2" color="textSecondary">
          Min: {min} | Current: {sliderValue} | Max: {max}
        </Typography>
        <Slider
          disabled={isDisabled}
          defaultValue={defaultSliderValue}
          value={sliderValue}
          onChange={handleSliderChange}
          aria-labelledby={`${label.toLowerCase()}-intensity`}
          min={min}
          max={max}
        />
      </Grid>
      <Grid size={1} alignItems="center">
        <Switch checked={!isDisabled} onChange={() => setIsDisabled(!isDisabled)} />
      </Grid>
    </>
  );
}
