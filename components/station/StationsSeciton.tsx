"use client";
import { Container, Stack, Typography } from "@mui/material";
import { StationItem } from "./StationItem";
import { useEffect, useState } from "react";
import { Station } from "@/enums/types/Station";
import { customFetch } from "@/lib/utils/apiUtils";
import { useRouter } from "next/navigation";
import { AddStationForm } from "./AddStation";

export function StationsSection() {
  const [stations, setStations] = useState<Station[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch(`station`, "GET");
        if (response.status === 200) {
          setStations(response.message);
        } else if (response.status === 401) {
          router.push("/user/login");
        } else if (response.status === 404) {
          setError("Станції не знайдено.");
        } else {
          setError("Сталася помилка при завантаженні.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Сталася критична помилка.");
      }
    };

    fetchData();
  }, [router]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      <Stack gap={4}>
        <AddStationForm />
        {stations &&
          stations.map((station) => (
            <StationItem key={station.id} uuid={station.uuid} />
          ))}
      </Stack>
    </Container>
  );
}
