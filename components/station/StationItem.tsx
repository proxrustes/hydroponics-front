import Grid from "@mui/material/Grid2";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { Station } from "@/enums/StationParams";
import { BucketParams } from "./BucketParams";
import { CustomContainer } from "../common/CustomContainer";
import { ZoneItem } from "../zone/ZoneItem";

export function StationItem(props: {station: Station}) {
    return (
      <CustomContainer>
        <Typography sx={{ fontWeight: 600, fontSize: 24, textAlign: "center" }}>Station {props.station.name}</Typography>
  
        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontWeight: 800, fontSize: 24 }}>🪣 Bucket params</Typography>
          <BucketParams stationParams={props.station.station_params}/>
          <Divider sx={{mt:2}}/>
        </Box>
        <Grid container spacing={2}>
          {props.station.zones.map((zone) => (
            <Grid key={zone.id} size={12}>
              <ZoneItem zone={zone} stationId={props.station.id}/>
            </Grid>
          ))}
        </Grid>
      </CustomContainer>
    )
  }