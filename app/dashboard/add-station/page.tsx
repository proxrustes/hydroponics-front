"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export default function AddStationPage() {
  const [name, setName] = useState("");
  const [uuid, setUuid] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name || !uuid) {
      alert("Заповніть всі поля");
      return;
    }

    const res = await fetch("/api/stations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, uuid }),
    });

    const result = await res.json();
    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert("❌ " + (result?.error ?? "Помилка при створенні станції"));
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Додати нову станцію
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Назва"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="UUID"
            value={uuid}
            onChange={(e) => setUuid(e.target.value)}
            fullWidth
            required
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Додати
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
