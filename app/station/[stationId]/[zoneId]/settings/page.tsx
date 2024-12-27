"use client";
import { Container, Typography, Stack, ButtonBase, Switch, FormControlLabel } from "@mui/material";
import YardIcon from "@mui/icons-material/Yard";
import { useEffect, useState } from "react";
import { ParamsSection } from "@/components/station/ParamsSection";
import { ManualControlSection } from "@/components/station/ManualControlSection";
import { Zone } from "@/enums/StationParams";
import { CustomContainer } from "@/components/CustomContainer";
import { Loader } from "@/components/Loader";
import { mockStations } from "@/enums/mock_data";
import Grid from "@mui/material/Grid2";

export default function Page({ params }: { params: { stationId: string, zoneId: string } }) {
  const [isCustom, setIsCustom] = useState(true);
  const [zone, setZone] = useState<Zone>();

  useEffect(() => {
    async function fetchZone() {
      const resolvedParams = await params; // Await the params Promise
      const stationData = mockStations[Number(resolvedParams.stationId)].zones[Number(resolvedParams.zoneId)];
      setZone(stationData);
    }
    fetchZone();
  }, [params]);


  if (!zone) {
    return <Loader sx={{ mt: "30vh" }} />;
  }

  return (
    <Container maxWidth="xl">
      <Stack gap={2} >
        <Stack direction="row" gap={2} justifyContent="space-between">
          <CustomContainer sx={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
            <Stack>  <Stack direction="row" alignItems="center" gap={1}>
              <YardIcon sx={{ fontSize: 44 }} />
              <Typography variant="h3" sx={{ fontWeight: 900 }}>
                {zone.plant.name}
              </Typography>
            </Stack>
              <Typography>{zone.name}</Typography></Stack>


          </CustomContainer>
        </Stack>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid size={8}>
            <ParamsSection zone={zone} />
          </Grid>
          <Grid size={4}>
            <CustomContainer>

              <Typography sx={{
                fontWeight: 800, fontSize: 24, textAlign: "center"
              }}>Custom Norms</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={isCustom}
                    onChange={() => setIsCustom((isCustom) => !isCustom)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label={isCustom ? "ON" : "OFF"}
                labelPlacement="bottom"
              />
            </CustomContainer>
          </Grid>
        </Grid>
        <ManualControlSection />
      </Stack>
    </Container>
  );
}
