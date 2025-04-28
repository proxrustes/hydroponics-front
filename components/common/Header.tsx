import {
  Breadcrumbs,
  Container,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import NavMenu from "./NavMenu";
export function Header() {
  return (
    <Container maxWidth="xl" sx={{ mb: 2, pt: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center">
          <IconButton href="/" sx={{ ml: -2 }}>
            <InvertColorsIcon sx={{ fontSize: 38, color: "primary.dark" }} />
          </IconButton>

          <Typography
            sx={{ fontWeight: 800, fontSize: 24, color: "primary.dark" }}
          >
            HydroStations
          </Typography>
        </Stack>
        <NavMenu />
      </Stack>
    </Container>
  );
}
