import { Station } from "@/enums/StationParams";
import { Box, Button, Typography } from "@mui/material";

export function StationItem(props: {station: Station}) {
  return (
    <Box>
      <Typography sx={{fontWeight: 800}}>{props.station.name}: {props.station.plant}</Typography>
      <Typography>humidity: {props.station.params.humidity}</Typography>
      <Typography>light_intensity: {props.station.params.light_intensity}</Typography>
      <Typography>ph_level: {props.station.params.ph_level}</Typography>
      <Typography>temperature: {props.station.params.temperature}</Typography>
      <Typography>nutrient_concentration: {props.station.params.nutrient_concentration}</Typography>
      <Button href={`station/${props.station.id}`}/>
    </Box>
  );
}
