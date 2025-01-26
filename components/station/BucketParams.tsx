import Grid from "@mui/material/Grid2";
import { Parameter } from "../zone/Parameter";
import { ParameterProps, StationParams, ZoneParams } from "@/enums/types/Params";
import { createParameters, parameterConfig } from "@/lib/parameterConfig";
import { customFetch } from "@/lib/apiUtils";
import { useState, useEffect } from "react";

type Parameter = {
  name: string; 
  value: number;
  norm: [number, number]; 
  valueFormatter?: string; 
  icon: string; 
};


export function BucketParams(props: {stationId: number}){
  const [bucketParams, setBucketparams] = useState<Record<string, number>>()
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await customFetch(
            `stations/${props.stationId}/bucketParams`,
            "GET"
          )
          if (response.status === 200) {
            setBucketparams(response.message.currentStationParams)
          }
        } catch (error) {
          console.error("Fetch error:", error)
        }
      }
  
      fetchData()
    }, [])
    if(!bucketParams){
      return("No params found")
    }
    const parameters = createParameters(
      ["phLevel", "solutionLvl", "solutionTemperature", "nutrientConcentration"],
      parameterConfig,
      bucketParams,
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