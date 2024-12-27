"use client"

import { FeatureCard } from "@/components/FeatureCard";
import { Stack, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest"

export default function Home() {
  return (
    <Container maxWidth="xl">
      <Stack 
      alignItems="center"
      sx={{ backgroundColor: "primary.main", width: "100%", height: 210, mb: -4, borderRadius: 46 }}>
        <Typography sx={{color:"secondary.main", fontWeight: 800, mt: 6, fontSize: 42}}>HydroStations</Typography>
        <Typography sx={{color:"secondary.main", fontWeight: 600,fontSize: 22}}>From roots to fruits, perfected</Typography>
        </Stack>
      <Grid container spacing={4} >
        <Grid size={4}>
            <FeatureCard title={"Мої станції"} contents={""} icon={undefined} url={"/station"} />
        </Grid>
        <Grid size={4}>
            <FeatureCard title={"Бібліотека рослин"} contents={""}
          icon={<SettingsSuggestIcon sx={{ fontSize: 24 }} />} url={"/"} />
        </Grid>
        <Grid size={4}>
            <FeatureCard title={"Вікі"} contents={""} icon={undefined} url={"/"} />
        </Grid>
      </Grid>

    </Container>
  );
}
