"use client"
import React from "react"
import { Container } from "@mui/material"
import ParameterChart from "@/components/graphs/ParameterChart"
import { useParams } from "next/navigation"

export default function ZoneParamsDashboardPage() {
  const { zoneId } = useParams()
  let safeZoneId: string | undefined
  if (Array.isArray(zoneId)) {
    safeZoneId = zoneId[0]
  } else {
    safeZoneId = zoneId
  }

  if (!safeZoneId || typeof safeZoneId !== "string") {
    return <div>Invalid Zone ID</div>
  }

  return (
    <Container maxWidth="xl">
      <h2>Zone Dashboard - Separate Charts</h2>
      <ParameterChart
        zoneId={safeZoneId}
        paramKey="temperature"
        yAxisLabel="Temperature (°C)"
        chartTitle="Temperature Over Time"
      />
      <ParameterChart
        zoneId={safeZoneId}
        paramKey="airHumidity"
        yAxisLabel="Humidity (%)"
        chartTitle="Humidity Over Time"
      />
      <ParameterChart
        zoneId={safeZoneId}
        paramKey="substrateHumidity"
        yAxisLabel="Substrate (%)"
        chartTitle="Substrate Humidity Over Time"
      />
    </Container>
  )
}
