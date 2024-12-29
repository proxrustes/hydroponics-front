"use client";
import { Container, Typography, Box, Stack, ButtonBase } from "@mui/material";
import YardIcon from "@mui/icons-material/Yard";
import { useEffect, useState } from "react";
import { mockStations } from "@/enums/mock_data";
import { ParamsSection } from "@/components/station/ParamsSection";
import { ManualControlSection } from "@/components/station/ManualControlSection";
import { Station } from "@/enums/StationParams";

export default function Page({ params }: { params: Promise<{ id: string; }> }) {

  return (
    <Container maxWidth="xl">
    
    </Container>
  );
}
