import { StationParams } from "@/enums/StationParams";
import Grid from "@mui/material/Grid2";
import { Parameter } from "./Parameter";

export function BucketParams(props: {stationParams: StationParams}){
    const parameters  = [
        {
          name: "ph_level",
          value: props.stationParams.ph_level,
          norm: [0, 100],
          icon: "🧪"
        }, {
          name: "solution_lvl",
          value: props.stationParams.solution_lvl,
          norm: [0, 100],
          valueFormatter: "%",
          icon: "〰️"
        },
        {
          name: "solution_temperature",
          value: props.stationParams.solution_temperature,
          norm: [0, 100],
          valueFormatter: "°C",
          icon: "🌡️"
        },
        {
          name: "substrate_humidity",
          value: props.stationParams.substrate_humidity,
          norm: [0, 100],
          valueFormatter: "%",
          icon:"💧"
        },
      ];

      return( <Grid container spacing={2} sx={{ mt: 2 }}>
        {parameters.map((param, index) => (
          <Grid size={6} key={index}>
            <Parameter
              name={param.name}
              value={param.value}
              norm={param.norm}
              icon={param.icon}
              valueFormatter={param.valueFormatter}
              variant="small"
            />
          </Grid>
        ))}
      </Grid>)
}