import { Station } from "@/enums/StationParams";
import { Stack } from "@mui/material";
import { StationItem } from "./Station";

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
      light_intensity: 750,
      nutrient_concentration: 1.8,
    },
  },
  {
    id: 3,
    name: "Station 4",
    plant: "Strawberries",
    params: {
      ph_level: 5.5,
      temperature: 18.5,
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
      nutrient_concentration: 1.6,
    },
  },
];
export function StationsSection() {
  return (
    <Stack>
      {mockStations.map((station) => (
        <StationItem station={station} />
      ))}
    </Stack>
  );
}
