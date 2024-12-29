import Grid from "@mui/material/Grid2";
import { Parameter } from "./Parameter";
import { StationParams } from "@/enums/Params";

type Parameter = {
  name: string; 
  value: number;
  norm: [number, number]; 
  valueFormatter?: string; 
  icon: string; 
};


export function BucketParams(props: {stationParams: StationParams}){
    const parameters: Parameter[]  = [
        {
          name: "ph_level",
          value: props.stationParams.ph_level,
          norm: [0, 100],
          icon: "🧪"
        },
        {
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
          name: "nutrient_concentration",
          value: props.stationParams.nutrient_concentration,
          norm: [0, 100],
          valueFormatter: "%",
          icon:"〰️"
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
            />
          </Grid>
        ))}
      </Grid>)
}