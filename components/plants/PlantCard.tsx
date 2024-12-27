import { Plant } from "@/enums/Plant";
import {
  Typography,
  Grid2,
  Stack,
  IconButton,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
export function PlantCard(props: { plant: Plant }) {
  return (
    <Grid2
      size={3}
      sx={{
        backgroundColor:  "primary.light",
        borderRadius: 8,
        px: 2,
        py: 1,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">{props.plant.name}</Typography>
        <IconButton color="secondary" href={`plants/${props.plant.id}`}>
          <OpenInNewIcon />
        </IconButton>
      </Stack>
    </Grid2>
  );
}
