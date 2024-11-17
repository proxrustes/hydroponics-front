"use client";

import { useState } from "react";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { PlantCard } from "@/components/plants/PlantCard";
import { Plant, PlantGroup } from "@/enums/Plant";
import Grid from "@mui/material/Grid2";
import { initialPlantGroups } from "@/enums/mock_data";

export default function PlantsPage() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h6" sx={{ mb: 4}}>
        Бібліотека рослин
      </Typography>

      {initialPlantGroups.map((group, index) => (
        <GroupSection key={index} group={group} />
      ))}

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Add New Plant
      </Typography>
    </Container>
  );
}

function GroupSection(props: { group: PlantGroup }) {
  return (
    <Stack sx={{ mb:8 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, backgroundColor:"primary.main", color:"white", pl:1 }}>
        {props.group.title}
      </Typography>
      <Grid container spacing={2} sx={{mt:2}}>
        {props.group.plants.map((x) => (
          <PlantCard key={x.name} plant={x} />
        ))}
      </Grid>
    </Stack>
  );
}
