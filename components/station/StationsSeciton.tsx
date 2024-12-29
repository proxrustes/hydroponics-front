import { Stack } from "@mui/material";
import { StationItem } from "./StationItem";
import { mockStations } from "@/lib/mock_data";

export function StationsSection() {
  return (
    <Stack gap={4}>
      {mockStations.map((station) => (
        <StationItem key={station.id} station={station} />
      ))}
    </Stack>

  );
}
