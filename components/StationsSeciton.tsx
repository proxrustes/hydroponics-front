import { Station } from "@/enums/StationParams";
import Grid from "@mui/material/Grid2";
import { StationItem } from "./Station";
import { Stack, Typography } from "@mui/material";
import { mockStations } from "@/enums/mock_data";
import { CustomContainer } from "./CustomContainer";

export function StationsSection() {
  return (
    <CustomContainer>
        <Typography variant="h4">Ваші станції:</Typography>
        <Grid container spacing={2}>
      {mockStations.map((station) => (
        <Grid key={station.id} size={3}>
          <StationItem station={station} />
        </Grid>
      ))}
    </Grid>  
    </CustomContainer>
  
  );
}
