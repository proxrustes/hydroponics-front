import { Zone } from "@/enums/types/Zone";
import { Box, ButtonGroup, Divider, IconButton, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Parameter } from "./Parameter";
import SettingsIcon from '@mui/icons-material/Settings';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { createParameters, parameterConfig } from "@/lib/parameterConfig";
import { Station } from "@/enums/types/Station";
import { customFetch } from "@/lib/apiUtils";
import { useState, useEffect } from "react";

export function ZoneItem(props: { zoneId: number }) {
  const [zone, setZone] = useState<Zone>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch(
          `zone/${props.zoneId}`,
          "GET"
        )
        if (response.status === 200) {
          setZone(response.message)
        }
      } catch (error) {
        console.error("Fetch error:", error)
      }
    }

    fetchData()
  }, [])
  
if(!zone) return <Typography>...</Typography>

  const norms = zone.plant.norm;
  const parameters = createParameters(
    ["air_humidity", "temperature", "substrate_humidity"],
    parameterConfig,
    zone.params,
    norms
  );

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ fontWeight: 800, fontSize: 24 }}>
          {zone.name}: {zone.plant.name}
        </Typography>
        <ButtonGroup>
        <IconButton href={`station//${zone.id}/details`} color="secondary">
          <InsertChartIcon fontSize="large" />
        </IconButton>
          <IconButton href={`station/${zone.id}/settings`} color="secondary">
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
