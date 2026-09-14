"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import { Station } from "@/enums/types/Station";
import { Zone } from "@/enums/types/Zone";
import { customFetch } from "@/lib/utils/apiUtils";
import { AddStationForm } from "./AddStation";
import { BucketParams } from "./BucketParams";
import { ZoneItem } from "../zone/ZoneItem";
import { ZoneFullDetail } from "../zone/ZoneFullDetail";

type Selection = { stationUuid: string; zoneIndex: number | null };

export function StationsMasterDetail() {
  const [stations, setStations] = useState<Station[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [addingStation, setAddingStation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch(`station`, "GET");
        if (response.status === 200) {
          setStations(response.message);
          setSelection((prev) =>
            prev ?? (response.message[0] ? { stationUuid: response.message[0].uuid, zoneIndex: null } : null)
          );
        } else if (response.status === 401) {
          router.push("/user/login");
        } else if (response.status === 404) {
          setError("Станції не знайдено.");
        } else {
          setError("Сталася помилка при завантаженні.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Сталася критична помилка.");
      }
    };

    fetchData();
  }, [router]);

  const selectedStation = useMemo(
    () => stations.find((s) => s.uuid === selection?.stationUuid) ?? null,
    [stations, selection]
  );

  const selectedZone = useMemo(
    () =>
      selection?.zoneIndex !== null && selection?.zoneIndex !== undefined
        ? selectedStation?.zones.find((z) => z.index === selection.zoneIndex) ?? null
        : null,
    [selectedStation, selection]
  );

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Stack direction="row" sx={{ minHeight: "calc(100vh - 64px)", m: 0 }}>
      <Box sx={{ width: 300, flex: "none", borderRight: "1px solid #e2e6e1", bgcolor: "#fafbf9", overflowY: "auto" }}>
        <List
          component="nav"
          sx={{ py: 0 }}
          subheader={
            <ListSubheader sx={{ bgcolor: "transparent", fontWeight: 700, color: "text.primary", lineHeight: "40px" }}>
              Станції
            </ListSubheader>
          }
        >
          {stations.map((station) => (
            <Box key={station.uuid}>
              <ListItemButton
                selected={selection?.stationUuid === station.uuid && selection?.zoneIndex === null}
                onClick={() => setSelection({ stationUuid: station.uuid, zoneIndex: null })}
                sx={{
                  py: 0.75,
                  "&.Mui-selected": { bgcolor: "secondary.main" },
                  "&.Mui-selected:hover": { bgcolor: "secondary.main" },
                }}
              >
                <Stack sx={{ width: "100%" }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 14.5 }}>{station.name}</Typography>
                  <Typography sx={{ fontSize: 11.5, color: "primary.light", fontWeight: 600 }}>
                    #{station.uuid}
                  </Typography>
                </Stack>
              </ListItemButton>
              {station.zones.map((zone: Zone) => (
                <ListItemButton
                  key={zone.id}
                  selected={selection?.stationUuid === station.uuid && selection?.zoneIndex === zone.index}
                  onClick={() => setSelection({ stationUuid: station.uuid, zoneIndex: zone.index })}
                  sx={{
                    pl: 4,
                    py: 0.5,
                    "&.Mui-selected": { bgcolor: "secondary.main" },
                    "&.Mui-selected:hover": { bgcolor: "secondary.main" },
                  }}
                >
                  <Typography sx={{ fontSize: 13.5, color: "text.secondary" }}>{zone.name}</Typography>
                  {zone.plant && (
                    <Typography sx={{ fontSize: 11.5, color: "primary.light", fontWeight: 600, ml: "auto" }}>
                      {zone.plant.name}
                    </Typography>
                  )}
                </ListItemButton>
              ))}
            </Box>
          ))}
        </List>

        <Divider sx={{ my: 1 }} />

        <ListItemButton onClick={() => setAddingStation((v) => !v)} sx={{ color: "primary.main", fontWeight: 700 }}>
          <AddIcon fontSize="small" sx={{ mr: 1 }} />
          Додати станцію
        </ListItemButton>
        {addingStation && (
          <Box sx={{ px: 2, pb: 2 }}>
            <AddStationForm sx={{ mt: 0, p: 2, boxShadow: "none", border: "1px solid #e2e6e1" }} />
          </Box>
        )}
      </Box>

      <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
        {!selectedStation && <Typography color="text.secondary">Оберіть станцію ліворуч.</Typography>}

        {selectedStation && !selectedZone && (
          <Stack gap={1.5}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography sx={{ fontWeight: 700, fontSize: 18 }}>{selectedStation.name}</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 14, color: "primary.light" }}>
                #{selectedStation.uuid}
              </Typography>
            </Stack>

            <Typography sx={{ fontWeight: 700, fontSize: 13 }}>🪣 Бак</Typography>
            <BucketParams uuid={selectedStation.uuid} />

            <Divider sx={{ mt: 0.5 }} />

            <Typography sx={{ fontWeight: 700, fontSize: 13 }}>Зони</Typography>
            <Grid container spacing={1.5}>
              {selectedStation.zones.map((zone) => (
                <Grid key={zone.id} size={3}>
                  <ZoneItem
                    uuid={selectedStation.uuid}
                    index={zone.index}
                    showButton
                    onOpen={() => setSelection({ stationUuid: selectedStation.uuid, zoneIndex: zone.index })}
                  />
                </Grid>
              ))}
            </Grid>
          </Stack>
        )}

        {selectedStation && selectedZone && (
          <Stack gap={1}>
            <Typography sx={{ fontSize: 12, color: "primary.light", fontWeight: 600 }}>
              {selectedStation.name} / {selectedZone.name}
            </Typography>

            <ZoneFullDetail uuid={selectedStation.uuid} index={selectedZone.index} />
          </Stack>
        )}
      </Box>
    </Stack>
  );
}
