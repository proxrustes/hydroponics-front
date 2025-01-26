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
import InfoIcon from '@mui/icons-material/Info';

export default function Page({ params }: { params: Promise<{ stationId: string; zoneId: string }> }) {
  const [zone, setZone] = useState<Zone>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchZone = async () => {
      try {
        const resolvedParams = await params;
        const response = await fetch(`/api/zone/${resolvedParams.zoneId}`, {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setZone(data.message); // предполагается, что API возвращает объект с `message`
        } else {
          console.error("Failed to fetch zone:", response.status);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchZone();
  }, [params]);

  const handleSaveCustomNorms = (customParams: {
    temperature: [number, number];
    substrateHumidity: [number, number];
    airHumidity: [number, number];
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
            substrateHumidity: zone.plant.norm.substrateHumidity,
            airHumidity: zone.plant.norm.airHumidity,
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
