"use client";
import { Container, Typography, Stack, ButtonBase } from "@mui/material";
import YardIcon from "@mui/icons-material/Yard";
import { useEffect, useState } from "react";
import { ParamsSection } from "@/components/station/ParamsSection";
import { ManualControlSection } from "@/components/station/ManualControlSection";
import { Zone } from "@/enums/StationParams";
import { CustomContainer } from "@/components/CustomContainer";
import { Loader } from "@/components/Loader";
import { mockStations } from "@/enums/mock_data";

export default function Page({ params }: { params: { stationId: string, zoneId: string} }) {
  const [isAutomated, setIsAutomated] = useState(true);
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
    return <Loader sx={{mt:"30vh"}}/> ;
  }

  return (
    <Container maxWidth="xl">
      <Stack gap={2} >
        <Stack direction="row" gap={2} justifyContent="space-between">
          <CustomContainer sx={{flexDirection:"row", width:"100%", justifyContent:"space-between"}}>
            <Stack>  <Stack direction="row" alignItems="center" gap={1}>
              <YardIcon sx={{ fontSize: 44 }} />
              <Typography variant="h3" sx={{ fontWeight: 900 }}>
                {zone.plant.name}
              </Typography>
            </Stack>
            <Typography>{zone.name}</Typography></Stack>
          
          <ButtonBase
            sx={{
              borderColor: isAutomated ? "success.main" : "warning.main",
              borderWidth: 4,
              borderStyle: "solid",
              py: 2,
              px: 4,
              borderRadius: 8,
              flexDirection: "column",
              width: 240,
            }}
            onClick={() => setIsAutomated((isAutomated) => !isAutomated)}
          >
            <Typography sx={{ fontWeight: 400 }}>Automated Mode</Typography>
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: 24,
                color: isAutomated ? "success.main" : "warning.main",
              }}
            >
              {isAutomated ? "ON" : "OFF"}
            </Typography>
          </ButtonBase>
          </CustomContainer>
        </Stack>
        <ParamsSection zone={zone} />
        {isAutomated ? (
          <Stack
            sx={{
              backgroundColor: "primary.light",
              color: "white",
              py: 2,
              px: 4,
              borderRadius: 8,
              textAlign: "center",
            }}
          >
            <Typography sx={{ fontSize: 24 }}>
              {" "}
              Turn off <strong>Automated Mode</strong> to access Manual Control
              Section
            </Typography>
          </Stack>
        ) : (
          <ManualControlSection />
        )}
      </Stack>
    </Container>
  );
}
