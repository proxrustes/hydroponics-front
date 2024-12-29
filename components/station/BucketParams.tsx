import Grid from "@mui/material/Grid2";
import { Parameter } from "../zone/Parameter";
import { ParameterProps, StationParams } from "@/enums/types/Params";
import { createParameters, parameterConfig } from "@/lib/parameterConfig";

type Parameter = {
  name: string; 
  value: number;
  norm: [number, number]; 
  valueFormatter?: string; 
  icon: string; 
};


export function BucketParams(props: {stationParams: StationParams}){
  const parameters = createParameters(
    ["ph_level", "solution_lvl", "solution_temperature", "nutrient_concentration"],
    parameterConfig,
    props.stationParams,
    [0, 100]
  );

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