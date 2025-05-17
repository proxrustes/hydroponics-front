import {
  Box,
  Button,
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
import { Zone } from "@/enums/types/Zone";
import { ZoneParameters } from "./ZoneParams";

export function ZoneItem(props: { uuid: string; index: number }) {
  const [zone, setZone] = useState<Zone | null>();
  const [currentParams, setCurrentParams] = useState<any>();
  const [targetParams, setTargetParams] = useState<any>();
  const [zoneNorms, setZoneNorms] =
    useState<Record<string, [number, number]>>();

  useEffect(() => {
    const fetchZoneInfo = async () => {
      try {
        const response = await customFetch(
          `station/zone?uuid=${props.uuid}&index=${props.index}`,
          "GET"
        );
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
          `station/zone/params?uuid=${props.uuid}&index=${props.index}`,
          "GET"
        );
        if (response.status === 200) {
          setCurrentParams(response.message);
        }
      } catch (error) {
        console.error("Fetch zone params error:", error);
      }
    };

    const fetchTargetParams = async () => {
      try {
        const response = await customFetch(
          `station/zone/config?uuid=${props.uuid}&index=${props.index}`,
          "GET"
        );
        if (response.status === 200) {
          setTargetParams(response.message);
        }
      } catch (error) {
        console.error("Fetch target params error:", error);
      }
    };

    const fetchZoneNorms = async () => {
      try {
        const response = await customFetch(
          `station/zone/norms?uuid=${props.uuid}&index=${props.index}`,
          "GET"
        );
        if (response.status === 200) {
          setZoneNorms(response.message.effectiveNorms);
        }
      } catch (error) {
        console.error("Fetch zone norms error:", error);
      }
    };

    fetchZoneInfo();
    fetchZoneParams();
    fetchTargetParams();
    fetchZoneNorms();
  }, [props.index]);
  if (!zone) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>Завантаження інформації про зону...</Typography>
        <LinearProgress sx={{ mt: 1 }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ fontWeight: 800, fontSize: 24 }}>
          {zone.name}: {zone.plant?.name}
        </Typography>
        <ButtonGroup>
          <IconButton
            href={`/station/${props.uuid}/${props.index}/details`}
            color="secondary"
          >
            <InsertChartIcon fontSize="large" />
          </IconButton>
          <IconButton
            href={`/station/${props.uuid}/${props.index}/settings`}
            color="secondary"
          >
            <SettingsIcon fontSize="large" />
          </IconButton>
        </ButtonGroup>
      </Stack>

      <ZoneParameters uuid={props.uuid} index={props.index} />

      <Divider sx={{ mt: 2 }} />
    </Box>
  );
}
