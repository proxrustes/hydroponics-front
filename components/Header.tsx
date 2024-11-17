import {
  Breadcrumbs,
  Container,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
export function Header() {
  return (
    <Container maxWidth="xl" sx={{ mb: 2, pt: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton href="/" sx={{ ml: -2 }}>
            <InvertColorsIcon sx={{ fontSize: 38, color: "primary.main" }} />
          </IconButton>

          <Typography sx={{ fontWeight: 800, fontSize: 24, color: "secondary.main" }}>
            HydroStations
          </Typography>
        </Stack>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/plants">
            Бібліотека Рослин
          </Link>
          <Link underline="hover" color="inherit" href="/station">
            Мої Станції
          </Link>
        </Breadcrumbs>
      </Stack>
    </Container>
  );
}
