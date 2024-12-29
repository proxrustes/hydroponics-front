"use client";
import { Container, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { ParamsSection } from "@/components/zone/ParamsSection";
import { ManualControlSection } from "@/components/zone/ManualControlSection";
import { Zone } from "@/enums/StationParams";
import { CustomContainer } from "@/components/common/CustomContainer";
import { Loader } from "@/components/common/Loader";
import { initialPlantGroups, mockStations } from "@/enums/mock_data";
import Grid from "@mui/material/Grid2";
import { CustomNormsSection } from "@/components/zone/CustomNormsSection";

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

  const resetToStandard = () => {
    if (zone) {
      const standardPlant = initialPlantGroups
        .flatMap((group) => group.plants)
        .find((plant) => plant.name === zone.plant.name);

      if (standardPlant) {
        setZone({
          ...zone,
          plant: {
            ...zone.plant,
            norm: {
              ...zone.plant.norm,
              temperature: standardPlant.norm.temperature,
              substrate_humidity: standardPlant.norm.substrate_humidity,
              air_humidity: standardPlant.norm.air_humidity,
            },
          },
        });
      }
    }
  };
  if (!zone) {
    return <Loader sx={{ mt: "30vh" }} />;
  }

  return (
    <Container maxWidth="xl">
      <Stack gap={2}>
        <CustomContainer sx={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
          <Typography variant="h3" sx={{ fontWeight: 900 }}>
            🪴{zone.plant.name}
          </Typography>
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
          onReset={resetToStandard}
        />
          </Grid>
        </Grid>
        <ManualControlSection />
      </Stack>
    </Container>
  );
}
