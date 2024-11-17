import { Plant } from "@/enums/Plant";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid2,
  ButtonBase,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
export function PlantCard(props: { plant: Plant }) {
  return (
    <Grid2
      size={3}
      sx={{
        backgroundColor:  "primary.dark",
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
