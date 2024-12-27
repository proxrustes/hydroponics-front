import { Station, Zone } from "@/enums/StationParams";
import { Box, Stack, Typography, LinearProgress } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { CustomContainer } from "../CustomContainer";
export function ParamsSection(props: { zone: Zone }) {
  const norms = props.zone.plant.norm;
  const parameters = [
    {
      name: "Air Humidity",
      value: props.zone.params.air_humidity,
      norm: norms.air_humidity,
    },
    {
      name: "Substrate Humidity",
      value: props.zone.params.substrate_humidity,
      norm: norms.substrate_humidity,
    },
    {
      name: "Temperature",
      value: props.zone.params.temperature,
      norm: norms.temperature,
    },
  ];
  return (
    <CustomContainer>
      {parameters.map((param) => {
        const min = param.norm[0];
        const max = param.norm[1];
        const value = param.value;

        let progress = ((value - min) / (max - min)) * 100;
        let isOutOfRange = value < min || value > max;

        if (value > max) {
          progress = 100;
        } else if (value < min) {
          progress = 0;
        }

        return (
          <Box key={param.name} sx={{ mt: 2 }}>
            <Stack direction="row" gap={1}>
              <Typography sx={{ fontWeight: 600}}> {param.name}</Typography>
              {isOutOfRange && (
                <ErrorOutlineIcon
                  sx={{
                    color: "red",
                  }}
                />
              )}
            </Stack>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body2" color="primary.dark" fontWeight={600}>
                {min}
              </Typography>
              <Box width="100%" mx={2} position="relative">
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 24,
                    borderRadius: 5,
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: isOutOfRange ? "red" : "primary.dark",
                    },
                  }}
                />
              </Box>
              <Typography variant="body2" color="primary.dark" fontWeight={600}>
                {max}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ textAlign: "center", mt: 1}}>
              Current Value: {value}
            </Typography>
          </Box>
        );
      })}
    </CustomContainer>
  );
}
