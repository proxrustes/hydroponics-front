import { normalParams } from "@/enums/StationParams";
import { Container, Typography, Box, LinearProgress, Stack } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const station = {
  name: "Station 2",
  plant: "Lettuce",
  params: {
    ph_level: 1.8,
    temperature: 40.0,
    humidity: 55,
    light_intensity: 650,
    nutrient_concentration: 1.2,
  },
};

export default function Page({ params }: { params: { id: string } }) {
  const norms = normalParams[station.plant];
  const parameters = [
    {
      name: "Humidity",
      value: station.params.humidity,
      norm: norms.humidity
    },
    {
      name: "Light Intensity",
      value: station.params.light_intensity,
      norm: norms.light_intensity
    },
    {
      name: "pH Level",
      value: station.params.ph_level,
      norm: norms.ph_level
    },
    {
      name: "Temperature",
      value: station.params.temperature,
      norm: norms.temperature
    },
    {
      name: "Nutrient Concentration",
      value: station.params.nutrient_concentration,
      norm: norms.nutrient_concentration
    }
  ];

  return (
    <Container maxWidth="xl">
      <Typography>{station.name}</Typography>
      <Typography variant="h3" sx={{ fontWeight: 900 }}>
        {station.plant}
      </Typography>

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
            <Typography sx={{ fontWeight: 600 }}>  {param.name}</Typography>
            {isOutOfRange && (
                  <ErrorOutlineIcon
                    sx={{
                      color: "red"
                    }}
                  />
                )}
            </Stack>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">{min}</Typography>
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
              <Typography variant="body2" color="text.secondary">{max}</Typography>
            </Box>
            <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
              Current Value: {value}
            </Typography>
          </Box>
        );
      })}
    </Container>
  );
}
