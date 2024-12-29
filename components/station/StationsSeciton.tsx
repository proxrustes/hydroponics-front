import { Stack } from "@mui/material";
import { mockStations } from "@/enums/mock_data";
import { StationItem } from "./StationItem";

export function StationsSection() {
  return (
    <Stack gap={4}>
      {mockStations.map((station) => (
        <StationItem key={station.id} station={station} />
      ))}
    </Stack>

  );
}
