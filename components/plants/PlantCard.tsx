import { Plant } from "@/enums/Plant";
import { Card, CardContent, Typography, Box, Grid2, ButtonBase } from "@mui/material";

export function PlantCard(props: { plant: Plant }) {
  return (
    <Grid2
      size={3}
      sx={{
        borderColor: "primary.main",
        borderWidth: 4,
        borderStyle: "solid",
        borderRadius: 8,
      }}
    >
      <ButtonBase href={`/plants/${props.plant.id}`}>
        <Typography variant="h5">{props.plant.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {props.plant.description}
        </Typography>
      </ButtonBase>
    </Grid2>
  );
}
