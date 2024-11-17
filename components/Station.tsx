import { Station } from "@/enums/StationParams";
import {  Button, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Parameter } from "./Parameter"; 
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import OpacityIcon from '@mui/icons-material/Opacity';
import ScienceIcon from '@mui/icons-material/Science';

export function StationItem(props: { station: Station }) {
  const { station } = props;
  const norms = props.station.plant.norm;
  const parameters = [
    {
      name: "Humidity",
      value: station.params.humidity,
      norm: norms.humidity,
      icon: <WaterDropIcon />
    },
    {
      name: "Light Intensity",
      value: station.params.light_intensity,
      norm: norms.light_intensity,
      icon: <WbSunnyIcon />
    },
    {
      name: "pH Level",
      value: station.params.ph_level,
      norm: norms.ph_level,
      icon: <ScienceIcon />
    },
    {
      name: "Temperature",
      value: station.params.temperature,
      norm: norms.temperature,
      icon: <AcUnitIcon />
    },
    {
      name: "Nutrient Concentration",
      value: station.params.nutrient_concentration,
      norm: norms.nutrient_concentration,
      icon: <OpacityIcon />
    }
  ];
  return (
    <Paper sx={{ p: 2 }}>
      <Typography sx={{ fontWeight: 800, fontSize: 24 }}>
        {station.name}: {station.plant.name}
      </Typography>
      <Grid container spacing={2} sx={{mt:2}}>
        {parameters.map((param, index) => (
          <Grid size={2.4} key={index}>
            <Parameter
              name={param.name}
              value={param.value}
              norm={param.norm}
              icon={param.icon}
              variant="small"
            />
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" href={`station/${station.id}`} fullWidth sx={{ mt: 2}}>
        View Details
      </Button>
    </Paper>
  );
}