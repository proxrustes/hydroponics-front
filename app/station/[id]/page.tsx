"use client";
import { Container, Typography, Box, Stack, ButtonBase, CircularProgress } from "@mui/material";
import YardIcon from "@mui/icons-material/Yard";
import { useEffect, useState } from "react";
import { mockZones } from "@/enums/mock_data";
import { ParamsSection } from "@/components/station/ParamsSection";
import { ManualControlSection } from "@/components/station/ManualControlSection";
import { Station, Zone } from "@/enums/StationParams";
import { CustomContainer } from "@/components/CustomContainer";
import { Loader } from "@/components/Loader";

export default function Page({ params }: { params: { id: string } }) {
  const [isAutomated, setIsAutomated] = useState(true);
  const [station, setStation] = useState<Zone>();

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      const stationData = mockZones[Number(resolvedParams.id)];
      setStation(stationData);
    }
    fetchParams();
  }, [params]);

  if (!station) {
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
                {station.plant.name}
              </Typography>
            </Stack>
            <Typography>{station.name}</Typography></Stack>
          
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
        <ParamsSection station={station} />
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
