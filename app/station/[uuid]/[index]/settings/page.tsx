"use client";

import {
  Container,
  Typography,
  Stack,
  IconButton,
  Dialog,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Grid from "@mui/material/Grid2";

import { ParamsSection } from "@/components/zone/ParamsSection";
import { DeviceControlSection } from "@/components/zone/DeviceControlSection";
import { CustomContainer } from "@/components/common/CustomContainer";
import { Loader } from "@/components/common/Loader";
import { CustomNormsSection } from "@/components/zone/CustomNormsSection";
import EditIcon from "@mui/icons-material/Edit";
import { EditZonePlant } from "@/components/EditZonePlant";
import { customFetch } from "@/lib/utils/apiUtils";

export default function Page() {
  const { uuid, index } = useParams();
  const [zone, setZone] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setEditMode] = useState(false);

  useEffect(() => {
    async function fetchZone() {
      try {
        const res = await customFetch(
          `station/zone?uuid=${uuid}&index=${index}`,
          "GET"
        );
        if (res.status === 200) {
          setZone(res.message);
        } else {
          console.error("Failed to fetch zone:", res.status);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    if (uuid && index !== undefined) fetchZone();
  }, [uuid, index]);

  if (!uuid || !index) return <div>Некорректные параметры маршрута</div>;

  if (!zone || loading) return <Loader sx={{ mt: "30vh" }} />;

  return (
    <Container maxWidth="xl">
      <Stack gap={2}>
        <CustomContainer
          sx={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Typography variant="h3" sx={{ fontWeight: 900 }}>
            🪴 {zone.name}: {zone.plant?.name}
          </Typography>
          <IconButton onClick={() => setEditMode(true)}>
            <EditIcon sx={{ fontSize: 36 }} />
          </IconButton>
        </CustomContainer>

        <Grid container spacing={2}>
          <Grid size={12}>
            <ParamsSection zoneId={zone.id} />
          </Grid>
          <Grid size={12}>
            <CustomNormsSection zoneId={zone.id} onUpdate={() => {}} />
          </Grid>
        </Grid>

        <DeviceControlSection />

        <Dialog open={isEditMode} onClose={() => setEditMode(false)}>
          <EditZonePlant
            zoneId={zone.id}
            currentPlantId={zone.plant?.id}
            onSuccess={() => {
              setEditMode(false);
              location.reload(); // Можно заменить на обновление setZone() при необходимости
            }}
          />
        </Dialog>
      </Stack>
    </Container>
  );
}
