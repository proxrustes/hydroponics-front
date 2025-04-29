"use client";

import {
  Box,
  Container,
  Stack,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import Link from "next/link";

const paramsSections = [
  {
    title: "Параметри зони",
    description:
      "Температура повітря, вологість, вологість субстрату та інші показники, що контролюються в кожній зоні.",
    link: "/wiki/params/zone",
  },
  {
    title: "Параметри поживного розчину",
    description:
      "pH рівень, концентрація поживних речовин, температура розчину та рівень розчину у станції.",
    link: "/wiki/params/bucket",
  },
];

export default function ParamsPage() {
  return (
    <Container sx={{ py: 6 }}>
      <Stack spacing={4}>
        <Typography
          variant="h3"
          fontWeight={800}
          color="primary.main"
          textAlign="center"
        >
          📈 Параметри системи
        </Typography>

        <Typography variant="h6" color="text.secondary" textAlign="center">
          Детальна інформація про основні параметри, які контролюються у
          гідропоніці
        </Typography>

        <Stack spacing={3}>
          {paramsSections.map((section, idx) => (
            <Card key={idx} sx={{ backgroundColor: "secondary.light" }}>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" color="primary.main">
                  {section.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {section.description}
                </Typography>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    size="small"
                    component={Link}
                    href={section.link}
                  >
                    Перейти
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
