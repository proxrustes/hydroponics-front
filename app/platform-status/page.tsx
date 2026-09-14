"use client";

import { useEffect, useState } from "react";
import { Alert, Box, Chip, Container, Stack, Typography } from "@mui/material";

type SystemStatusResponse = {
  database: string;
  components: { component: string; status: string; updatedAt: string }[];
};

const PLATFORM_API_URL =
  process.env.NEXT_PUBLIC_PLATFORM_API_URL ?? "http://localhost:8000";

export default function PlatformStatusPage() {
  const [data, setData] = useState<SystemStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${PLATFORM_API_URL}/api/system/status`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message ?? "Не вдалося з'єднатися з backend"));
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Stack gap={3}>
        <Typography variant="h5" fontWeight={700}>
          Autonomous Hydroponics Platform — status
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Reads {PLATFORM_API_URL}/api/system/status — proves the frontend can
          reach the Python (FastAPI) backend, and that the backend can read
          real rows out of PostgreSQL.
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        {data && (
          <Box>
            <Alert severity="success" sx={{ mb: 2 }}>
              Backend reachable — database: {data.database}
            </Alert>
            <Stack gap={1}>
              {data.components.map((c) => (
                <Stack
                  key={c.component}
                  direction="row"
                  alignItems="center"
                  gap={1.5}
                  sx={{ border: "1px solid #eee", borderRadius: 1, p: 1.5 }}
                >
                  <Typography sx={{ flex: 1, fontWeight: 600 }}>{c.component}</Typography>
                  <Chip
                    label={c.status}
                    color={c.status === "online" ? "success" : "default"}
                    size="small"
                  />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(c.updatedAt).toLocaleString()}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        )}
      </Stack>
    </Container>
  );
}
