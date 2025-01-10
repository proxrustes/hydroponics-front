"use client";
import { Container, Typography, Stack, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { ParamsSection } from "@/components/zone/ParamsSection";
import { DeviceControlSection } from "@/components/zone/DeviceControlSection";
import { Zone } from "@/enums/types/Zone";
import { CustomContainer } from "@/components/common/CustomContainer";
import { Loader } from "@/components/common/Loader";
import Grid from "@mui/material/Grid2";
import { CustomNormsSection } from "@/components/zone/CustomNormsSection";
import { mockStations } from "@/lib/mock_data";
import InfoIcon from '@mui/icons-material/Info';

export default function Page({ params }: { params: Promise<{ stationId: string; zoneId: string }> }) {
  const [zone, setZone] = useState<Zone>();

  useEffect(() => {
    async function fetchZone() {
      const resolvedParams = await params;
      const stationData = mockStations[Number(resolvedParams.stationId)].zones[Number(resolvedParams.zoneId)];
      setZone(stationData);
    }
    fetchZone();
  }, [params]);

  const handleSaveCustomNorms = (customParams: {
    temperature: [number, number];
    substrate_humidity: [number, number];
    air_humidity: [number, number];
  }) => {
    if (zone) {
      setZone({
        ...zone,
        plant: {
          ...zone.plant,
          norm: { ...zone.plant.norm, ...customParams },
        },
      });
    }
  };

  if (!zone) {
    return <Loader sx={{ mt: "30vh" }} />;
  }

  return (
    <Container maxWidth="xl">
      <Stack gap={2}>
        <CustomContainer sx={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography variant="h3" sx={{ fontWeight: 900 }}>
            🪴{zone.plant.name}
          </Typography>
         <IconButton href={`/plants/${zone.plant.id}`}><InfoIcon sx={{fontSize: 36}}/></IconButton>
        </CustomContainer>
        <Grid container spacing={2}>
          <Grid size={8}>
            <ParamsSection zone={zone} />
          </Grid>
          <Grid size={4}>
          <CustomNormsSection
          initialParams={{
            temperature: zone.plant.norm.temperature,
            substrate_humidity: zone.plant.norm.substrate_humidity,
            air_humidity: zone.plant.norm.air_humidity,
          }}
          onSave={handleSaveCustomNorms}
        />
          </Grid>
        </Grid>
        <Typography sx={{color:"white"}}>Device Control</Typography>
        <DeviceControlSection />
      </Stack>
    </Container>
  );
}
