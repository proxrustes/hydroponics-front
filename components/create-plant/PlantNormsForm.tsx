"use client";
import { TextField, Grid2, Typography } from "@mui/material";

interface NormsFormProps {
  norms: any;
  setNorms: (data: any) => void;
}

export default function PlantNormsForm({ norms, setNorms }: NormsFormProps) {
  const handleChange = (key: string, value: string) => {
    setNorms({ ...norms, [key]: parseFloat(value) || 0 });
  };

  const fields = [
    ["temperatureMin", "Мінімальна температура"],
    ["temperatureMax", "Максимальна температура"],
    ["airHumidityMin", "Мінімальна вологість повітря"],
    ["airHumidityMax", "Максимальна вологість повітря"],
    ["substrateHumidityMin", "Мінімальна вологість субстрату"],
    ["substrateHumidityMax", "Максимальна вологість субстрату"],
    ["phLevelMin", "Мінімальний рівень pH"],
    ["phLevelMax", "Максимальний рівень pH"],
    ["nutrientConcentrationMin", "Мін. концентрація поживних речовин"],
    ["nutrientConcentrationMax", "Макс. концентрація поживних речовин"],
    ["solutionTemperatureMin", "Мін. температура розчину"],
    ["solutionTemperatureMax", "Макс. температура розчину"],
    ["solutionLvlMin", "Мінімальний рівень розчину"],
    ["solutionLvlMax", "Максимальний рівень розчину"],
    ["lightIntensityMin", "Мін. інтенсивність освітлення"],
    ["lightIntensityMax", "Макс. інтенсивність освітлення"],
  ];

  return (
    <>
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Норми для рослини
      </Typography>
      <Grid2 container spacing={2}>
        {fields.map(([key, label]) => (
          <Grid2 size={6} key={key}>
            <TextField
              type="number"
              label={label}
              size="small"
              fullWidth
              value={norms[key] || ""}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}
