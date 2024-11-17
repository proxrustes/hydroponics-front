import { Station } from "@/enums/StationParams";
import Grid from "@mui/material/Grid2";
import { StationItem } from "./Station";
import { Stack, Typography } from "@mui/material";

const mockStations: Station[] = [
  {
    id: 0,
    name: "Station 1",
    plant: "Tomatoes",
    params: {
      ph_level: 6.2,
      temperature: 22.5,
      humidity: 60,
      light_intensity: 700,
      nutrient_concentration: 1.5,
    },
  },
  {
    id: 1,
    name: "Station 2",
    plant: "Lettuce",
    params: {
      ph_level: 5.8,
      temperature: 20.0,
      humidity: 55,
      light_intensity: 650,
      nutrient_concentration: 1.2,
    },
  },
  {
    id: 2,
    name: "Station 3",
    plant: "Basil",
    params: {
      ph_level: 6.0,
      temperature: 24.0,
      humidity: 50,
      light_intensity: 250,
      nutrient_concentration: 0,
    },
  },
  {
    id: 3,
    name: "Station 4",
    plant: "Strawberries",
    params: {
      ph_level: 2.5,
      temperature: 18,
      humidity: 65,
      light_intensity: 600,
      nutrient_concentration: 1.3,
    },
  },
  {
    id: 4,
    name: "Station 5",
    plant: "Cucumbers",
    params: {
      ph_level: 6.5,
      temperature: 23.0,
      humidity: 58,
      light_intensity: 720,
      nutrient_concentration: 1.1,
    },
  },
];
export function StationsSection() {
  return (
    <Stack gap={1}>
        <Typography variant="h4">Ваші станції:</Typography>
        <Grid container spacing={2}>
      {mockStations.map((station) => (
        <Grid key={station.id} size={3}>
          <StationItem station={station} />
        </Grid>
      ))}
    </Grid>  
    </Stack>
  
  );
}
