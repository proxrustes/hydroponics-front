"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Stack,
  Divider,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { customFetch } from "@/lib/utils/apiUtils";
import { authService } from "@/lib/services/authService"; // где есть getCurrentUser()

export default function PlantLibraryPage() {
  const [groups, setGroups] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    plantGroupId: "",
  });

  const currentUser = authService.getCurrentUser();
  const isAdmin = currentUser?.role === "ADMIN";

  useEffect(() => {
    async function fetchGroups() {
      const res = await customFetch("plants", "GET");
      if (res.status === 200) setGroups(res.message);
    }
    fetchGroups();
  }, []);

  const handleSubmit = async () => {
    const res = await customFetch("plants", "POST", formState);
    if (res.status === 200) {
      setShowForm(false);
      setFormState({ name: "", description: "", plantGroupId: "" });
      const updated = await customFetch("plants", "GET");
      setGroups(updated.message);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Бібліотека рослин
      </Typography>
      {isAdmin && (
        <Stack mt={4} gap={2}>
          {!showForm ? (
            <Button variant="contained" onClick={() => setShowForm(true)}>
              Додати рослину
            </Button>
          ) : (
            <Button onClick={() => setShowForm(false)}>Скасувати</Button>
          )}

          {showForm && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" mb={2}>
                Нова рослина
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Назва"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                />
                <TextField
                  label="Опис"
                  multiline
                  minRows={3}
                  value={formState.description}
                  onChange={(e) =>
                    setFormState({ ...formState, description: e.target.value })
                  }
                />
                <TextField
                  select
                  label="Група"
                  value={formState.plantGroupId}
                  onChange={(e) =>
                    setFormState({ ...formState, plantGroupId: e.target.value })
                  }
                >
                  {groups.map((g) => (
                    <MenuItem key={g.id} value={g.id}>
                      {g.name}
                    </MenuItem>
                  ))}
                </TextField>

                <Stack direction="row" spacing={2}>
                  <Button variant="contained" onClick={handleSubmit}>
                    Зберегти
                  </Button>
                  <Button onClick={() => setShowForm(false)}>Скасувати</Button>
                </Stack>
              </Stack>
            </Paper>
          )}
        </Stack>
      )}
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
