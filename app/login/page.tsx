"use client";

import {
  Box,
  Button,
  Container,
  Tab,
  Tabs,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/services/authService";

export default function LoginPage() {
  const [tab, setTab] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleChange = (_: any, newValue: number) => {
    setTab(newValue);
  };

  const handleAuthClick = async () => {
    let res;

    if (tab === 0) {
      res = await authService.login(email, password);
      if (res.token) {
        router.push("/");
      }
    } else {
      res = await authService.register(name, email, password, "USER");
      if (res.token) {
        router.push("/wiki/guides/how-to-start");
      }
    }

    if (!res.token) {
      alert("❌ Ошибка: " + (res.error ?? "неизвестная"));
      router.push("/user/login");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        sx={{
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Tabs value={tab} onChange={handleChange} centered>
          <Tab label="LOG IN" />
          <Tab label="REGISTER" />
        </Tabs>

        <Box
          component="form"
          sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography variant="h5" align="center">
            {tab === 0 ? "Nice to see you again :D" : "Hello!"}
          </Typography>

          {tab === 1 && (
            <>
              <TextField
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
              />
            </>
          )}

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />

          <Button
            onClick={handleAuthClick}
            variant="contained"
            color="primary"
            fullWidth
          >
            {tab === 0 ? "Log in" : "Create Account"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
