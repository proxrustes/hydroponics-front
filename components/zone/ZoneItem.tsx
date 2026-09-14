import {
  Box,
  ButtonGroup,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { customFetch } from "@/lib/utils/apiUtils";
import { Zone } from "@/enums/types/Zone";
import { ZoneParameters } from "./ZoneParams";

export function ZoneItem(props: {
  uuid: string;
  index: number;
  showButton?: boolean;
  onOpen?: () => void;
}) {
  const [zone, setZone] = useState<Zone | null>();

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

    fetchZoneInfo();
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
    <Box sx={{ px: 1.5, py: 1 }}>
      <Stack
        direction={"row"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
          {zone.name}
          {zone.plant?.name ? `: ${zone.plant.name}` : ""}
        </Typography>
        {props.showButton && (
          <ButtonGroup>
            <IconButton onClick={props.onOpen} color="secondary" size="small">
              <SettingsIcon fontSize="small" />
            </IconButton>
          </ButtonGroup>
        )}
      </Stack>

      <ZoneParameters uuid={props.uuid} index={props.index} compact />

      <Divider sx={{ mt: 1.5 }} />
    </Box>
  );
}
