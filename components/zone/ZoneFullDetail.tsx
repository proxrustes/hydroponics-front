"use client";

import { Typography, Stack, IconButton, Dialog, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { CustomContainer } from "@/components/common/CustomContainer";
import { Loader } from "@/components/common/Loader";
import EditIcon from "@mui/icons-material/Edit";
import LocalFloristOutlinedIcon from "@mui/icons-material/LocalFloristOutlined";
import { EditZonePlant } from "@/components/EditZonePlant";
import { customFetch } from "@/lib/utils/apiUtils";
import { DeviceControlSection } from "@/components/zone/device-schedule/DeviceControlSection";
import ParameterChart from "@/components/graphs/ParameterChart";
import { HarvestMonitor } from "@/components/zone/HarvestMonitor";
import { ZoneParamsComparison } from "@/components/zone/ZoneParamsComparison";

export function ZoneFullDetail({
  uuid,
  index,
}: {
  uuid: string;
  index: number;
}) {
  const [zone, setZone] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setEditMode] = useState(false);

  useEffect(() => {
    async function fetchZone() {
      setLoading(true);
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

    fetchZone();
  }, [uuid, index]);

  if (!zone || loading) return <Loader sx={{ mt: "30vh" }} />;

  return (
    <>
      <Stack gap={1.5}>
        <CustomContainer
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 0.75 }}
          >
            <LocalFloristOutlinedIcon color="primary" />
            {zone.name}
            {zone.plant?.name ? `: ${zone.plant.name}` : ""}
          </Typography>
          <IconButton size="small" onClick={() => setEditMode(true)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </CustomContainer>

        <Grid container spacing={2}>
          <Grid size={6}>
            <ZoneParamsComparison uuid={uuid} index={index} />
          </Grid>
          <Grid size={6}>
            <DeviceControlSection uuid={uuid} index={index} plantId={zone.plant?.id} />
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
      <Divider sx={{ my: 2 }} />
      <HarvestMonitor />
      <Divider sx={{ my: 2 }} />
      <Stack gap={2}>
        <CustomContainer sx={{ py: 1 }}>
          <Typography
            sx={{ textAlign: "center", fontWeight: 600, fontSize: 13 }}
          >
            Температура повітря
          </Typography>
          <ParameterChart
            uuid={uuid}
            index={index}
            paramKey="temperature"
            yAxisLabel="Temperature (°C)"
            height={180}
          />
        </CustomContainer>

        <CustomContainer sx={{ py: 1 }}>
          <Typography
            sx={{ textAlign: "center", fontWeight: 600, fontSize: 13 }}
          >
            Вологість повітря
          </Typography>
          <ParameterChart
            uuid={uuid}
            index={index}
            paramKey="airHumidity"
            yAxisLabel="Humidity (%)"
            height={180}
          />
        </CustomContainer>

        <CustomContainer sx={{ py: 1 }}>
          <Typography
            sx={{ textAlign: "center", fontWeight: 600, fontSize: 13 }}
          >
            Вологість грунту
          </Typography>
          <ParameterChart
            uuid={uuid}
            index={index}
            paramKey="substrateHumidity"
            yAxisLabel="Substrate (%)"
            height={180}
          />
        </CustomContainer>
      </Stack>
    </>
  );
}
