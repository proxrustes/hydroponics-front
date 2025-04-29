"use client";

import { FeaturesList } from "@/components/landing-page/FeaturesList";
import { Stack, Container, Typography } from "@mui/material";
export default function Home() {
  return (
    <Container maxWidth="xl">
      <Stack gap={24}>
        <Stack direction="row" gap={4}>
          <Stack
            alignItems="left"
            flex={1}
            gap={2}
            sx={{
              justifyContent: "center",
              textAlign: "center",
              color: "white",
              fontWeight: 800,
              fontSize: 22,
              backgroundColor: "secondary.light",
              borderRadius: 12,
              px: 8,
              mt: 4,
              py: 12,
              borderRight: "24px solid red",
              borderBottom: "24px solid red",
              borderColor: "primary.dark",
            }}
          >
            <Typography
              sx={{
                color: "primary.main",
                fontWeight: 800,
                fontSize: 92,
                lineHeight: 0.8,
              }}
            >
              From ROOTS to FRUITS, perfected
            </Typography>
          </Stack>
        </Stack>
        <FeaturesList />
      </Stack>
    </Container>
  );
}
