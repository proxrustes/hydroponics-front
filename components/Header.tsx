import { Container, IconButton, Stack, Typography } from "@mui/material";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
export function Header() {
  return (
    <Container maxWidth="xl" sx={{ mb: 2, pt:1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <IconButton href="/" sx={{ml: -2}}>    <InvertColorsIcon sx={{fontSize:38, color:"primary.main"}}/></IconButton>
      
          <Typography sx={{ fontWeight: 800, fontSize:24 }}>HydroStations</Typography>
        </Stack>
        <Typography sx={{ fontWeight: 800 }}>AKA</Typography>
      </Stack>
    </Container>
  );
}
