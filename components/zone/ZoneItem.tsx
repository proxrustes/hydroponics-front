import {
  Box,
  ButtonGroup,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { Parameter } from "./Parameter";
import SettingsIcon from "@mui/icons-material/Settings";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import { createParameters, parameterConfig } from "@/lib/parameterConfig";
import { customFetch } from "@/lib/utils/apiUtils";
// Тип Zone — ваш
import { Zone } from "@/enums/types/Zone";

export function ZoneItem(props: { zoneId: number }) {
  const [zone, setZone] = useState<Zone | null>();
  const [currentParams, setCurrentParams] = useState<any>();
  console.log(zone);
  const [zoneNorms, setZoneNorms] =
    useState<Record<string, [number, number]>>();

  useEffect(() => {
    const fetchZoneInfo = async () => {
      try {
        const response = await customFetch(`zone/${props.zoneId}`, "GET");
        if (response.status === 200) {
          setZone(response.message);
        }
      } catch (error) {
        console.error("Fetch zone info error:", error);
      }
    };

    const fetchZoneParams = async () => {
      try {
        const response = await customFetch(
          `zone/${props.zoneId}/params`,
          "GET"
        );
        if (response.status === 200) {
          setCurrentParams(response.message);
        }
      } catch (error) {
        console.error("Fetch zone params error:", error);
      }
    };

    const fetchZoneNorms = async () => {
      try {
        const response = await customFetch(`zone/${props.zoneId}/norms`, "GET");
        if (response.status === 200) {
          setZoneNorms(response.message.effectiveNorms);
        }
      } catch (error) {
        console.error("Fetch zone norms error:", error);
      }
    };

    fetchZoneInfo();
    fetchZoneParams();
    fetchZoneNorms();
  }, [props.zoneId]);

  if (!zone || !currentParams || !zoneNorms) {
    console.log(zone, currentParams, zoneNorms);
    return <LinearProgress />;
  }

  const parameters = createParameters(
    ["airHumidity", "temperature", "substrateHumidity"],
    parameterConfig,
    currentParams, // фактические значения (текущие)
    zoneNorms // нормы
  );

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ fontWeight: 800, fontSize: 24 }}>
          {zone.name}: {zone.plant?.name}
        </Typography>
        <ButtonGroup>
          <IconButton href={`zone/${zone.id}/details`} color="secondary">
            <InsertChartIcon fontSize="large" />
          </IconButton>
          <IconButton href={`zone/${zone.id}/settings`} color="secondary">
            <SettingsIcon fontSize="large" />
          </IconButton>
        </ButtonGroup>
      </Stack>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {parameters.map((param, index) => (
          <Grid size={4} key={index}>
            <Parameter
              name={param.name}
              value={param.value}
              norm={param.norm}
              icon={param.icon}
              valueFormatter={param.valueFormatter}
            />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mt: 2 }} />
    </Box>
  );
}
