"use client";

import React, { useEffect, useState } from "react";
import { Container, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { CustomContainer } from "@/components/common/CustomContainer";
import ParameterChart from "@/components/graphs/ParameterChart";

export default function ZoneParamsDashboardPage() {
  const params = useParams();
  const rawUuid = params.uuid;
  const rawIndex = params.index;

  const uuid = Array.isArray(rawUuid) ? rawUuid[0] : rawUuid;
  const indexStr = Array.isArray(rawIndex) ? rawIndex[0] : rawIndex;
  const index = indexStr !== undefined ? parseInt(indexStr, 10) : NaN;

  if (!uuid || (isNaN(index) && index !== 0)) {
    return <div>Invalid UUID or Index</div>;
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
            uuid={uuid}
            index={index}
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
            uuid={uuid}
            index={index}
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
            uuid={uuid}
            index={index}
            paramKey="substrateHumidity"
            yAxisLabel="Substrate (%)"
          />
        </CustomContainer>
      </Stack>
    </Container>
  );
}
