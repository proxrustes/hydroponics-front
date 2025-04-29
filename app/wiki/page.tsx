"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function Wiki() {
  return (
    <Container sx={{ py: 6 }}>
      <Stack spacing={4} alignItems="center">
        <Typography variant="h3" fontWeight={800} color="primary.main">
          📚 Wiki
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary">
          Тут зібрана інформація про рослини, параметри станцій та інші важливі
          теми.
        </Typography>

        <Stack direction="row" spacing={3} mt={4}>
          <Button
            component={Link}
            href="/wiki/params"
            variant="contained"
            color="primary"
            size="large"
          >
            Параметри станцій
          </Button>

          <Button
            component={Link}
            href="/wiki/plants"
            variant="contained"
            color="secondary"
            size="large"
          >
            Бібліотека рослин
          </Button>

          <Button
            component={Link}
            href="/wiki/guides"
            variant="outlined"
            color="primary"
            size="large"
          >
            Гайди і поради
          </Button>
        </Stack>

        <Box mt={6}>
          <Typography variant="subtitle1" color="text.secondary">
            Нові теми будуть додаватися з оновленнями!
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
}
