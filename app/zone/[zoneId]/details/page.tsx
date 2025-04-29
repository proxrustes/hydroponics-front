"use client";
import React from "react";
import { Container, Stack, Typography } from "@mui/material";
import ParameterChart from "@/components/graphs/ParameterChart";
import { useParams } from "next/navigation";
import { CustomContainer } from "@/components/common/CustomContainer";
import Grid from "@mui/material/Grid2";

export default function ZoneParamsDashboardPage() {
  const { zoneId } = useParams();
  let safeZoneId: string | undefined;
  if (Array.isArray(zoneId)) {
    safeZoneId = zoneId[0];
  } else {
    safeZoneId = zoneId;
  }

  if (!safeZoneId || typeof safeZoneId !== "string") {
    return <div>Invalid Zone ID</div>;
  }

  return (
    <Container maxWidth="xl">
      <Stack gap={4}>
        <CustomContainer>
          <Typography
            sx={{ textAlign: "center", fontWeight: 600, fontSize: 20 }}
          >
            Temperature Over Time
          </Typography>
          <ParameterChart
            zoneId={safeZoneId}
            paramKey="temperature"
            yAxisLabel="Temperature (°C)"
          />
        </CustomContainer>
        <CustomContainer>
          <Typography
            sx={{ textAlign: "center", fontWeight: 600, fontSize: 20 }}
          >
            Humidity Over Time
          </Typography>
          <ParameterChart
            zoneId={safeZoneId}
            paramKey="airHumidity"
            yAxisLabel="Humidity (%)"
          />
        </CustomContainer>

        <CustomContainer>
          <Typography
            sx={{ textAlign: "center", fontWeight: 600, fontSize: 20 }}
          >
            Substrate Humidity Over Time
          </Typography>
          <ParameterChart
            zoneId={safeZoneId}
            paramKey="substrateHumidity"
            yAxisLabel="Substrate (%)"
          />
        </CustomContainer>
      </Stack>
    </Container>
  );
}
