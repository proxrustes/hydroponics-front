"use client"
import { Stack } from "@mui/material";
import { StationItem } from "./StationItem";
import { useEffect, useState } from "react";
import { Station } from "@/enums/types/Station";
import { customFetch } from "@/lib/apiUtils";

export function StationsSection() {
  const [stations, setStations] = useState<Station[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch(
          `stations`,
          "GET"
        )
        if (response.status === 200) {
          setStations(response.message)
        }
      } catch (error) {
        console.error("Fetch error:", error)
      }
    }

    fetchData()
  }, [])
  return (
    <Stack gap={4}>
      {stations && stations.map((station) => (
        <StationItem key={station.id} stationId={station.id} />
      ))}
    </Stack>

  );
}
