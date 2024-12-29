"use client";

import { useState } from "react";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { PlantCard } from "@/components/plants/PlantCard";
import { Plant, PlantGroup } from "@/enums/types/Plant";
import Grid from "@mui/material/Grid2";
import { CustomContainer } from "@/components/common/CustomContainer";
import { initialPlantGroups } from "@/lib/mock_data";

export default function PlantsPage() {
  return (
    <Container maxWidth="xl">

      {initialPlantGroups.map((group, index) => (
        <GroupSection key={index} group={group} />
      ))}

    </Container>
  );
}

function GroupSection(props: { group: PlantGroup }) {
  return (
    <CustomContainer sx={{ mb:4 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, pl:1 }}>
        {props.group.title}
      </Typography>
      <Grid container spacing={2} sx={{mt:2}}>
        {props.group.plants.map((x) => (
          <PlantCard key={x.name} plant={x} />
        ))}
      </Grid>
    </CustomContainer>
  );
}
