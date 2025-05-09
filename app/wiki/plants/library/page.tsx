"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import { customFetch } from "@/lib/utils/apiUtils";
import { authService } from "@/lib/services/authService";

export default function PlantLibraryPage() {
  const [groups, setGroups] = useState<any[]>([]);
  const currentUser = authService.getCurrentUser();
  const isAdmin = currentUser?.role === "ADMIN";

  useEffect(() => {
    async function fetchGroups() {
      const res = await customFetch("plants", "GET");
      if (res.status === 200) setGroups(res.message);
    }
    fetchGroups();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">Бібліотека рослин</Typography>
        {isAdmin && (
          <Button variant="contained" size="small" href="plants/create">
            Додати рослину
          </Button>
        )}
      </Stack>

      {groups.map((group) => (
        <Paper key={group.id} sx={{ p: 3, my: 2 }}>
          <Typography variant="h6" color="primary">
            {group.name}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Stack spacing={2}>
            {group.plants.map((plant: any) => (
              <Paper key={plant.id} variant="outlined" sx={{ p: 2 }}>
                <Typography fontWeight={600}>{plant.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {plant.description}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </Paper>
      ))}
    </Container>
  );
}
