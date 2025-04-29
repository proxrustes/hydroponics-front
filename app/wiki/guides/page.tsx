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

const guides = [
  {
    title: "Як налаштувати освітлення",
    description:
      "Основні правила виставлення інтенсивності світла та тривалості освітлення для різних рослин.",
    link: "/wiki/guides/lighting",
  },
  {
    title: "Контроль рівня pH",
    description:
      "Як правильно вимірювати та регулювати pH у гідропонній системі.",
    link: "/wiki/guides/ph-control",
  },
  {
    title: "Оптимізація поживного розчину",
    description:
      "Короткий гайд по налаштуванню концентрації добрив для різних культур.",
    link: "/wiki/guides/nutrients",
  },
];

export default function GuidesPage() {
  return (
    <Container sx={{ py: 6 }}>
      <Stack spacing={4}>
        <Typography
          variant="h3"
          fontWeight={800}
          color="primary.main"
          textAlign="center"
        >
          🛠️ Гайди і поради
        </Typography>

        <Typography variant="h6" color="text.secondary" textAlign="center">
          Практичні інструкції для покращення роботи вашої гідропонної системи
        </Typography>

        <Stack spacing={3}>
          {guides.map((guide, idx) => (
            <Card key={idx} sx={{ backgroundColor: "secondary.light" }}>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" color="primary.main">
                  {guide.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {guide.description}
                </Typography>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    size="small"
                    component={Link}
                    href={guide.link}
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
