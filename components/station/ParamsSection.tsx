import { normalParams, Station } from "@/enums/StationParams";
import { Box, Stack, Typography, LinearProgress } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export function ParamsSection(props: { station: Station }) {
  const norms = normalParams[props.station.plant];
  const parameters = [
    {
      name: "Humidity",
      value: props.station.params.humidity,
      norm: norms.humidity,
    },
    {
      name: "Light Intensity",
      value: props.station.params.light_intensity,
      norm: norms.light_intensity,
    },
    {
      name: "pH Level",
      value: props.station.params.ph_level,
      norm: norms.ph_level,
    },
    {
      name: "Temperature",
      value: props.station.params.temperature,
      norm: norms.temperature,
    },
    {
      name: "Nutrient Concentration",
      value: props.station.params.nutrient_concentration,
      norm: norms.nutrient_concentration,
    },
  ];
  return (
    <Stack
      sx={{
        borderColor: "primary.main",
        borderWidth: 4,
        borderStyle: "solid",
        py: 2,
        px: 4,
        borderRadius: 8,
      }}
    >
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
              <Typography sx={{ fontWeight: 600 }}> {param.name}</Typography>
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
              <Typography variant="body2" color="text.secondary">
                {min}
              </Typography>
              <Box width="100%" mx={2} position="relative">
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: isOutOfRange ? "red" : "primary.main",
                    },
                  }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {max}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
              Current Value: {value}
            </Typography>
          </Box>
        );
      })}
    </Stack>
  );
}
