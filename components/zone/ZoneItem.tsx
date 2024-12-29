import { Zone } from "@/enums/types/Zone";
import { Box, ButtonGroup, Divider, IconButton, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Parameter } from "./Parameter";
import SettingsIcon from '@mui/icons-material/Settings';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { createParameters, parameterConfig } from "@/lib/parameterConfig";

export function ZoneItem(props: { zone: Zone, stationId: number }) {
  const { zone, stationId } = props;
  const norms = props.zone.plant.norm;
  const parameters = createParameters(
    ["air_humidity", "temperature", "substrate_humidity"],
    parameterConfig,
    props.zone.params,
    norms
  );

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ fontWeight: 800, fontSize: 24 }}>
          {zone.name}: {zone.plant.name}
        </Typography>
        <ButtonGroup>
        <IconButton href={`station/${stationId}/${zone.id}/details`} color="secondary">
          <InsertChartIcon fontSize="large" />
        </IconButton>
          <IconButton href={`station/${stationId}/${zone.id}/settings`} color="secondary">
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
