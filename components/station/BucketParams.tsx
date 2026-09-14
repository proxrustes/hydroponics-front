import Grid from "@mui/material/Grid2";
import { parameterConfig } from "@/lib/parameterConfig";
import { customFetch } from "@/lib/utils/apiUtils";
import { useState, useEffect } from "react";
import { LinearProgress } from "@mui/material";
import { ParameterRow } from "../zone/Parameter";

export function BucketParams(props: { uuid: string }) {
  const [bucketParams, setBucketparams] = useState<Record<string, number>>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch(
          `station/bucket/params?uuid=${props.uuid}`,
          "GET"
        );
        if (response.status === 200) {
          setBucketparams(response.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);
  if (!bucketParams) {
    return <LinearProgress />;
  }

  const BUCKET_PARAM_KEYS = [
    "phLevel",
    "solutionLvl",
    "solutionTemperature",
    "nutrientConcentration",
  ] as const;

  // Show every known bucket parameter, even ones the API hasn't reported
  // a value for yet, instead of silently dropping them.
  const parameters = BUCKET_PARAM_KEYS.map((key) => ({
    ...parameterConfig[key],
    value: bucketParams[key],
    norm: [0, 100] as [number, number],
  }));

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {parameters.map((param, index) => (
        <Grid size={6} key={index}>
          <ParameterRow
            name={param.name}
            value={param.value}
            norm={param.norm}
            icon={param.icon}
            valueFormatter={param.valueFormatter}
          />
        </Grid>
      ))}
    </Grid>
  );
}
