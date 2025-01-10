"use client"
import { Stack } from "@mui/material";
import { StationItem } from "./StationItem";
import { useEffect, useState } from "react";
import { Station } from "@/enums/types/Station";

export function StationsSection() {
  const [stations, setStations] = useState<Station[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await (await fetch(`/api/stations`, {
          cache: "no-store",
          next: { revalidate: 0 },
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        })).json()
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
      {stations.map((station) => (
        <StationItem key={station.id} station={station} />
      ))}
    </Stack>

  );
}
