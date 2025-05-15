import Grid from "@mui/material/Grid2";
import { Box, Divider, LinearProgress, Stack, Typography } from "@mui/material";
import { Station } from "@/enums/types/Station";
import { BucketParams } from "./BucketParams";
import { CustomContainer } from "../common/CustomContainer";
import { ZoneItem } from "../zone/ZoneItem";
import { customFetch } from "@/lib/utils/apiUtils";
import { useEffect, useState } from "react";

export function StationItem(props: { uuid: string }) {
  const [station, setStation] = useState<Station>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch(`station?uuid=${props.uuid}`, "GET");
        if (response.status === 200) {
          setStation(response.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);
  if (!station) {
    return <LinearProgress />;
  }
  return (
    <CustomContainer>
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ fontWeight: 600, fontSize: 24 }}>
          Station {station.name}
        </Typography>

        <Typography sx={{ fontWeight: 600, fontSize: 24 }}>
          # {station.uuid}
        </Typography>
      </Stack>

      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: 800, fontSize: 24 }}>
          🪣 Bucket params
        </Typography>
        <BucketParams uuid={props.uuid} />
        <Divider sx={{ mt: 2 }} />
      </Box>
      <Grid container spacing={2}>
        {station.zones.map((zone) => (
          <Grid key={zone.id} size={12}>
            <ZoneItem uuid={props.uuid} index={zone.index} />
          </Grid>
        ))}
      </Grid>
    </CustomContainer>
  );
}
