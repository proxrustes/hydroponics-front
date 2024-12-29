import { Station, Zone } from "@/enums/StationParams";
import { Box, Stack, Typography, LinearProgress, CircularProgress } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { CustomContainer } from "../CustomContainer";
import { SemiCircleProgress } from "./SemiCircleProgress";
export function ParamsSection(props: { zone: Zone }) {
  const norms = props.zone.plant.norm;
  const parameters = [
    {
      name: "Air Humidity",
      value: props.zone.params.air_humidity,
      valueFormatter: "%",
      norm: norms.air_humidity,
    },
    {
      name: "Substrate Humidity",
      value: props.zone.params.substrate_humidity,
      valueFormatter: "%",
      norm: norms.substrate_humidity,
    },
    {
      name: "Temperature",
      value: props.zone.params.temperature,
      valueFormatter: "°C",
      norm: norms.temperature,
    },
  ];
  return (
    <CustomContainer>
      <Stack direction="row" justifyContent="space-around">
        {parameters.map((param) => {
          const min = param.norm[0];
          const max = param.norm[1];
          const value = param.value;

          let progress = ((value - min) / (max - min)) * 100;
          let isOutOfRange = value < min || value > max;

          if (value > max) {
            progress = 100;
          } else if (value < min) {
            progress = 0;
          }

          return (
            <SemiCircleProgress warning={isOutOfRange} key={param.name} value={`${value}${param.valueFormatter}`} progress={progress} label={param.name} />
          );
        })}
      </Stack>

    </CustomContainer>
  );
}
