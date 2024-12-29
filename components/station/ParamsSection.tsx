import { Zone } from "@/enums/StationParams";
import { Stack} from "@mui/material";
import { CustomContainer } from "../common/CustomContainer";
import { SemiCircleProgress } from "./SemiCircleProgress";
import { parameterConfig } from "@/enums/parameterConfig";
import { ParameterProps } from "@/enums/Params";
export function ParamsSection(props: { zone: Zone }) {
  const norms = props.zone.plant.norm;
  const parameters: ParameterProps[] = ([
    "air_humidity",
    "temperature",
    "substrate_humidity",
  ] as const).map((key) => ({
    ...parameterConfig[key],
    value: props.zone.params[key],
    norm: norms[key],
  }));
 
  
  return (
    <CustomContainer>
      <Stack direction="row" justifyContent="space-around">
        {parameters.map((param) => {
        
          return (
            <SemiCircleProgress param={param} key={param.name}/>
          );
        })}
      </Stack>

    </CustomContainer>
  );
}
