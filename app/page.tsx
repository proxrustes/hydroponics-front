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
          orientation={"left"}
          title={"Nurtients"}
          description={
            "Optimal plant health starts with perfect nutrition. Deliver the right balance of minerals and elements to maximize growth and yields."
          }
          quote={"Feed the roots, and the leaves will follow."}
        />

        <InfoCard
          orientation={"right"}
          title={"Controls"}
          description={
            "Automation and precision are key. Monitor and adjust environmental conditions to create the perfect habitat for plants to thrive"
          }
          quote={"Master the environment, master the harvest."}
        />
        <InfoCard
          orientation={"left"}
          title={"Monitoring"}
          description={
            "Continuous monitoring ensures early detection of problems and maintains optimal conditions. Stay a step ahead at all times."
          }
          quote={"What gets measured, gets improved."}
        />
      </Stack>
    </Container>
  );
}
