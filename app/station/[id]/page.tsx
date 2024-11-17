"use client";
import { normalParams } from "@/enums/StationParams";
import {
  Container,
  Typography,
  Box,
  LinearProgress,
  Stack,
  ButtonBase,
} from "@mui/material";
import YardIcon from "@mui/icons-material/Yard";
import { useEffect, useState } from "react";
import { plantIcons } from "@/enums/plantIcons";
import { mockStations } from "@/enums/mock_data";
import { ParamsSection } from "@/components/station/ParamsSection";

export default function Page({ params }: { params: { id: string } }) {
  const [isAutomated, setIsAutomated] = useState(true);
  const [station, setStation] = useState<any>(null);

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      const stationData = mockStations[Number(resolvedParams.id)];
      setStation(stationData);
    }
    fetchParams();
  }, [params]);

  if (!station) {
    return <center>Loading...</center>;
  }

  const plantIcon = plantIcons[station.plant] || <YardIcon />;

  return (
    <Container maxWidth="xl">
      <Stack gap={2}>
        <Stack direction="row" gap={2} justifyContent="space-between">
          <Stack
            sx={{
              width: "100%",
              backgroundColor: "primary.main",
              color: "white",
              py: 1,
              px: 4,
              borderRadius: 8,
            }}
          >
            <Stack direction="row" alignItems="flex-end" gap={1}>
              <Box sx={{ fontSize: 42 }}>{plantIcon}</Box>
              <Typography variant="h3" sx={{ fontWeight: 900 }}>
                {station.plant}
              </Typography>
            </Stack>
            <Typography>{station.name}</Typography>
          </Stack>
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
            <Typography sx={{ fontWeight: 400 }}>Automated Mode </Typography>
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
        </Stack>
        <ParamsSection station={station} />
      </Stack>
    </Container>
  );
}
