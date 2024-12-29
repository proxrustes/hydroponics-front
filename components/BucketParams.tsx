import Grid from "@mui/material/Grid2";
import { Parameter } from "./Parameter";
import { ParameterProps, StationParams } from "@/enums/Params";
import { parameterConfig } from "@/enums/parameterConfig";

type Parameter = {
  name: string; 
  value: number;
  norm: [number, number]; 
  valueFormatter?: string; 
  icon: string; 
};


export function BucketParams(props: {stationParams: StationParams}){
  const parameters: ParameterProps[] = ([
    "ph_level",
    "solution_lvl",
    "solution_temperature",
    "nutrient_concentration"
  ] as const).map((key) => ({
    ...parameterConfig[key],
    value: props.stationParams[key],
    norm: [0, 100],
  }));

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