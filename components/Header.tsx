import { Container, Stack, Typography } from "@mui/material";

export function Header() {
  return (
    <Container maxWidth="xl" sx={{ mb: 2 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ fontWeight: 800 }}>HydroStations</Typography>
        <Typography>AKA</Typography>
      </Stack>
    </Container>
  );
}
