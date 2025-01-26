import Grid from "@mui/material/Grid2";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { Station } from "@/enums/types/Station";
import { BucketParams } from "./BucketParams";
import { CustomContainer } from "../common/CustomContainer";
import { ZoneItem } from "../zone/ZoneItem";
import { customFetch } from "@/lib/apiUtils";
import { useEffect, useState } from "react";
import { Zone } from "@/enums/types/Zone";

export function StationItem(props: {stationId: number}) {
  const [station, setStation] = useState<Station>()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch(
          `stations/${props.stationId}`,
          "GET"
        )
        if (response.status === 200) {
          setStation(response.message)
        }
      } catch (error) {
        console.error("Fetch error:", error)
      }
    }

    fetchData()
  }, [])
  if(!station){
    return("hui")
  }
    return (
      <CustomContainer>
        <Typography sx={{ fontWeight: 600, fontSize: 24, textAlign: "center" }}>Station {station.name}</Typography>
  
        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontWeight: 800, fontSize: 24 }}>🪣 Bucket params</Typography>
          <BucketParams stationId={station.id}/>
          <Divider sx={{mt:2}}/>
        </Box>
        <Grid container spacing={2}>
          {station.zones.map((zone) => (
            <Grid key={zone.id} size={12}>
              <ZoneItem zoneId={zone.id}/>
            </Grid>
          ))}
        </Grid>
      </CustomContainer>
    )
  }