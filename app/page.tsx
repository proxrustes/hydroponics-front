"use client";

import { InfoCard } from "@/components/common/data-display/InfoCard";
import { Stack, Container, Typography, Box } from "@mui/material";
export default function Home() {
  return (
    <Container maxWidth="xl">
      <Stack gap={12}>
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
        <InfoCard
          orientation={"right"}
          title={"Supplements"}
          description={
            "Prevention is better than cure. Bugs never had it so bad."
          }
          quote={"Prepare. Prevent. Protect."}
        />
        <InfoCard
          orientation={"left"}
          title={"Supplements"}
          description={
            "Prevention is better than cure. Bugs never had it so bad."
          }
          quote={"Prepare. Prevent. Protect."}
        />
        <InfoCard
          orientation={"right"}
          title={"Supplements"}
          description={
            "Prevention is better than cure. Bugs never had it so bad."
          }
          quote={"Prepare. Prevent. Protect."}
        />
        <InfoCard
          orientation={"left"}
          title={"Supplements"}
          description={
            "Prevention is better than cure. Bugs never had it so bad."
          }
          quote={"Prepare. Prevent. Protect."}
        />
      </Stack>
    </Container>
  );
}
