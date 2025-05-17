import {
  Stack,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  LinearProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { CustomContainer } from "@/components/common/CustomContainer";
import { customFetch } from "@/lib/utils/apiUtils";

interface ZoneTargetParams {
  airHumidity: number;
  temperature: number;
  substrateHumidity: number;
}

interface CustomTargetSectionProps {
  uuid: string;
  index: string;
  onUpdate?: () => void;
}

export function CustomTargetSection({
  uuid,
  index,
  onUpdate,
}: CustomTargetSectionProps) {
  const [targetParams, setTargetParams] = useState<ZoneTargetParams | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [targetRes, currentRes] = await Promise.all([
          customFetch(`station/zone/config?uuid=${uuid}&index=${index}`, "GET"),
          customFetch(`station/zone/params?uuid=${uuid}&index=${index}`, "GET"),
        ]);

        const current = currentRes.status === 200 ? currentRes.message : null;
        const target = targetRes.status === 200 ? targetRes.message : null;

        // Якщо є збережені target → використовуємо їх
        if (target) {
          setTargetParams(target);
        } else if (current) {
          // Інакше — ініціалізуємо target з поточних
          setTargetParams({
            airHumidity: current.airHumidity,
            temperature: current.temperature,
            substrateHumidity: current.substrateHumidity,
          });
        }
      } catch (error) {
        console.error("❌ Failed to fetch params:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uuid, index]);

  const handleChange = (
    key: keyof ZoneTargetParams,
    value: number | boolean
  ) => {
    setTargetParams((prev) => {
      if (!prev) return prev;
      return { ...prev, [key]: value };
    });
  };

  const handleSave = async () => {
    if (!targetParams) return;

    try {
      const response = await customFetch(
        `station/zone/config?uuid=${uuid}&index=${index}`,
        "POST",
        {
          uuid,
          index: Number(index),
          params: targetParams,
        }
      );

      if (response.status === 200) {
        alert("Target parameters saved successfully");
        onUpdate?.();
      } else {
        alert("Failed to save target parameters");
      }
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Error occurred while saving");
    }
  };

  if (loading || !targetParams) {
    return (
      <Stack spacing={2}>
        <Typography>Завантаження цільових параметрів...</Typography>
        <LinearProgress />
      </Stack>
    );
  }

  return (
    <CustomContainer>
      <Stack spacing={2}>
        <TextField
          label="Температура"
          type="number"
          value={targetParams.temperature}
          onChange={(e) => handleChange("temperature", Number(e.target.value))}
          fullWidth
        />
        <TextField
          label="Вологість повітря"
          type="number"
          value={targetParams.airHumidity}
          onChange={(e) => handleChange("airHumidity", Number(e.target.value))}
          fullWidth
        />
        <TextField
          label="Вологість субстрату"
          type="number"
          value={targetParams.substrateHumidity}
          onChange={(e) =>
            handleChange("substrateHumidity", Number(e.target.value))
          }
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Зберегти
        </Button>
      </Stack>
    </CustomContainer>
  );
}
