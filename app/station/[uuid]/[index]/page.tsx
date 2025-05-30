"use client";

import {
  Container,
  Typography,
  Stack,
  IconButton,
  Dialog,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Grid from "@mui/material/Grid2";
import { CustomContainer } from "@/components/common/CustomContainer";
import { Loader } from "@/components/common/Loader";
import { CustomTargetSection } from "@/components/zone/CustomNormsSection";
import EditIcon from "@mui/icons-material/Edit";
import { EditZonePlant } from "@/components/EditZonePlant";
import { customFetch } from "@/lib/utils/apiUtils";
import { ZoneItem } from "@/components/zone/ZoneItem";
import { DeviceControlSection } from "@/components/zone/device-schedule/DeviceControlSection";
import ParameterChart from "@/components/graphs/ParameterChart";
import { HarvestMonitor } from "../../../../components/zone/HarvestMonitor";

export default function Page() {
  const params = useParams();

  const uuid = typeof params.uuid === "string" ? params.uuid : params.uuid?.[0];
  const index = Number(params.index) ?? 0;
  console.log("uuid", uuid);
  console.log("index", index);
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

  if (!uuid || (!index && index !== 0))
    return <div>404 {(uuid?.toString(), index)}</div>;

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
          <Grid size={8}>
            <ZoneItem uuid={uuid} index={Number(index) ?? 0} />

            <CustomTargetSection
              uuid={uuid}
              index={index}
              onUpdate={() => {}}
            />
          </Grid>
          <Grid size={4}>
            <DeviceControlSection uuid={uuid} index={index} />
          </Grid>
        </Grid>
        <Dialog open={isEditMode} onClose={() => setEditMode(false)}>
          <EditZonePlant
            onSuccess={() => {
              setEditMode(false);
              location.reload();
            }}
            uuid={uuid}
            index={index}
          />
        </Dialog>
      </Stack>
      <Divider sx={{ my: 4 }} />
      <HarvestMonitor />
      <Divider sx={{ my: 4 }} />
      <Stack gap={4}>
        <CustomContainer>
          <Typography
            sx={{ textAlign: "center", fontWeight: 600, fontSize: 20 }}
          >
            Температура повітря
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
            Вологість повітря
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
            Вологість грунту
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
