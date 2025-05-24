import Grid from "@mui/material/Grid2";
import { Parameter } from "../zone/Parameter";
import { createParameters, parameterConfig } from "@/lib/parameterConfig";
import { customFetch } from "@/lib/utils/apiUtils";
import { useState, useEffect } from "react";
import { LinearProgress } from "@mui/material";

type Parameter = {
  name: string;
  value: number;
  norm: [number, number];
  valueFormatter?: string;
  icon: string;
};

export function BucketParams(props: { uuid: string }) {
  const [bucketParams, setBucketparams] = useState<Record<string, number>>();
  console.log(bucketParams);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch(
          `station/bucket/params?uuid=${props.uuid}`,
          "GET"
        );
        console.log("response", response, response.status === 200);
        if (response.status === 200) {
          console.log("200");
          setBucketparams(response.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);
  if (!bucketParams) {
    console.log("hui");
    return <LinearProgress />;
  }
  const parameters = createParameters(
    ["phLevel", "solutionLvl", "solutionTemperature", "nutrientConcentration"],
    parameterConfig,
    bucketParams,
    [0, 100]
  );

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
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
    </Grid>
  );
}
