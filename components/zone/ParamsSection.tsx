import { Zone } from "@/enums/types/Zone";
import { Stack } from "@mui/material";
import { CustomContainer } from "../common/CustomContainer";
import { SemiCircleProgress } from "../common/SemiCircleProgress";
import { createParameters, parameterConfig } from "@/lib/parameterConfig";

export function ParamsSection(props: { zone: Zone }) {
  const norms = props.zone.plant.norm;
  const parameters = createParameters(
    ["airHumidity", "temperature", "substrateHumidity"],
    parameterConfig,
    props.zone.params,
    norms
  );

  return (
    <CustomContainer>
      <Stack direction="row" justifyContent="space-around">
        {parameters.map((param) => {
          return (
            <SemiCircleProgress param={param} key={param.name} />
          );
        })}
      </Stack>
    </CustomContainer>
  );
}
