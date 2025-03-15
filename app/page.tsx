"use client"

import { FeatureCard } from "@/components/common/FeatureCard";
import { StationsSection } from "@/components/station/StationsSeciton";
import { Stack, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function Home() {
  return (
    <Container maxWidth="xl">
      <Stack 
      alignItems="center"
      sx={{ backgroundColor: "primary.main", width: "100%", height: 210, mb: -5, borderRadius: 46 }}>
        <Typography sx={{color:"secondary.main", fontWeight: 800, mt: 6, fontSize: 42}}>HydroStations</Typography>
        <Typography sx={{color:"secondary.main", fontWeight: 600,fontSize: 22}}>From roots to fruits, perfected</Typography>
        </Stack>
    
      <StationsSection/>


    </Container>
  );
}
