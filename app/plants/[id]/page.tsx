"use client";
import { Container, Typography, Box, Stack, ButtonBase } from "@mui/material";
import YardIcon from "@mui/icons-material/Yard";
import { useEffect, useState } from "react";
import { mockStations } from "@/enums/mock_data";
import { ParamsSection } from "@/components/zone/ParamsSection";
import { ManualControlSection } from "@/components/zone/ManualControlSection";
import { Station } from "@/enums/StationParams";

export default function Page({ params }: { params: Promise<{ id: string; }> }) {

  return (
    <Container maxWidth="xl">
    
    </Container>
  );
}
