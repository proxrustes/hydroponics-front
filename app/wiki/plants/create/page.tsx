// app/(admin)/plants/new/page.tsx

"use client";
import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Stack,
  Typography,
  MenuItem,
} from "@mui/material";
import { customFetch } from "@/lib/utils/apiUtils";
import PlantNormsForm from "@/components/create-plant/PlantNormsForm";

export default function NewPlantPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [groupId, setGroupId] = useState<number | "new">("new");
  const [newGroupName, setNewGroupName] = useState("");
  const [norms, setNorms] = useState({});

  const [groups, setGroups] = useState<{ id: number; name: string }[]>([]);

  // Підгрузити групи (можна покращити окремим useEffect)

  const handleSubmit = async () => {
    const payload = {
      name,
      description,
      groupId: groupId === "new" ? undefined : groupId,
      newGroupName: groupId === "new" ? newGroupName : undefined,
      norms,
    };

    const res = await customFetch("admin/plants", "POST", payload);

    if (res.status === 200) {
      alert("✅ Рослину додано!");
      // Можливо, зробити редирект
    } else {
      alert("❌ Помилка при додаванні рослини");
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" mb={4}>
        Додати нову рослину
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Назва рослини"
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
        />

        <TextField
          label="Опис"
          value={description}
          size="small"
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
        />

        <TextField
          select
          label="Група рослин"
          value={groupId}
          size="small"
          onChange={(e) =>
            setGroupId(
              e.target.value === "new" ? "new" : Number(e.target.value)
            )
          }
          fullWidth
        >
          {groups.map((group) => (
            <MenuItem key={group.id} value={group.id}>
              {group.name}
            </MenuItem>
          ))}
          <MenuItem value="new">Нова група...</MenuItem>
        </TextField>

        {groupId === "new" && (
          <TextField
            label="Нова група рослин"
            size="small"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            fullWidth
            required
          />
        )}

        <PlantNormsForm norms={norms} setNorms={setNorms} />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Додати рослину
        </Button>
      </Stack>
    </Container>
  );
}
