"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";
import { customFetch } from "@/lib/utils/apiUtils";
import { CustomContainer } from "./common/CustomContainer";

interface Plant {
  id: number;
  name: string;
}

interface EditZonePlantProps {
  uuid: string;
  index: number;
  currentPlantId?: number;
  onSuccess?: () => void;
}

export function EditZonePlant({
  uuid,
  index,
  currentPlantId,
  onSuccess,
}: EditZonePlantProps) {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<number | "">(
    currentPlantId ?? ""
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchPlants() {
      try {
        const res = await customFetch("plants", "GET");
        if (res.status === 200) {
          const rawGroups = res.message;
          const allPlants = rawGroups.flatMap((group: any) =>
            group.plants.map((p: any) => ({
              id: p.id,
              name: p.name,
            }))
          );
          setPlants(allPlants);
        }
      } catch (error) {
        console.error("Failed to load plants:", error);
      }
    }
    fetchPlants();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await customFetch(
        `station/zone?uuid=${uuid}&index=${index}`,
        "PUT",
        {
          plantId: selectedPlant || null,
        }
      );

      if (res.status === 200) {
        alert("Рослину оновлено успішно!");
        onSuccess?.();
      } else {
        alert("Не вдалося оновити рослину");
      }
    } catch (error) {
      console.error("Error updating plant:", error);
      alert("Помилка при оновленні рослини");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <CustomContainer>
      <Stack spacing={2}>
        <Typography variant="h6">Оберіть рослину для зони</Typography>

        <FormControl fullWidth>
          <InputLabel id="plant-select-label">Рослина</InputLabel>
          <Select
            labelId="plant-select-label"
            value={selectedPlant}
            onChange={(e) =>
              setSelectedPlant(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
            fullWidth
          >
            <MenuItem value="">— Без рослини —</MenuItem>
            {plants.map((plant) => (
              <MenuItem key={plant.id} value={plant.id}>
                {plant.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Збереження..." : "Зберегти"}
        </Button>
      </Stack>
    </CustomContainer>
  );
}
