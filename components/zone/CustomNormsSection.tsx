import { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { CustomContainer } from "@/components/common/CustomContainer";
import { customFetch } from "@/lib/utils/apiUtils";

type RangeTuple = [number, number];

export interface ZoneParamNorms {
  airHumidity: RangeTuple;
  temperature: RangeTuple;
  substrateHumidity: RangeTuple;
}

interface CustomNormsSectionProps {
  uuid: string;
  index: string;
  onUpdate?: () => void;
}

export function CustomNormsSection({
  uuid,
  index,
  onUpdate,
}: CustomNormsSectionProps) {
  const [customParams, setCustomParams] = useState<ZoneParamNorms | null>(null);
  useEffect(() => {
    const fetchNorms = async () => {
      try {
        const response = await customFetch(
          `station/zone/norms?uuid=${uuid}&index=${index}`,
          "GET"
        );
        if (response.status === 200 && response.message?.effectiveNorms) {
          setCustomParams(response.message.effectiveNorms);
        }
      } catch (error) {
        console.error("Failed to fetch norms:", error);
      }
    };
    fetchNorms();
  }, [uuid, index]);

  if (!customParams) {
    return <LinearProgress />;
  }

  const handleParamChange = (
    key: keyof ZoneParamNorms,
    value: [number, number]
  ) => {
    setCustomParams((prev) => {
      if (!prev) return prev;
      return { ...prev, [key]: value };
    });
  };

  const handleReset = (key: keyof ZoneParamNorms) => {
    setCustomParams((prev) => {
      if (!prev) return prev;
      return { ...prev, [key]: [0, 0] };
    });
  };

  // 3. Нажатие на Apply → PUT запрос
  const handleSave = async () => {
    try {
      const response = await customFetch(
        `station/zone/norms?uuid=${uuid}&index=${index}`,
        "PUT",
        customParams
      );
      if (response.status === 200) {
        alert("Custom norms saved successfully");
        onUpdate?.();
      } else {
        alert("Failed to save norms");
      }
    } catch (error) {
      console.error("Failed to save norms:", error);
      alert("Error occurred while saving norms");
    }
  };

  return (
    <CustomContainer>
      <Stack spacing={2}>
        {(["airHumidity", "temperature", "substrateHumidity"] as const).map(
          (key) => (
            <Stack key={key} spacing={1}>
              <Typography sx={{ fontWeight: 600 }}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  label="Min"
                  size="small"
                  type="number"
                  value={customParams[key][0]}
                  onChange={(e) =>
                    handleParamChange(key, [
                      Number(e.target.value),
                      customParams[key][1],
                    ])
                  }
                  fullWidth
                />
                <TextField
                  label="Max"
                  size="small"
                  type="number"
                  value={customParams[key][1]}
                  onChange={(e) =>
                    handleParamChange(key, [
                      customParams[key][0],
                      Number(e.target.value),
                    ])
                  }
                  fullWidth
                />
                <Tooltip title="Reset to Default">
                  <IconButton onClick={() => handleReset(key)}>
                    <RestartAltIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          )
        )}
        <Button variant="contained" color="primary" onClick={handleSave}>
          Apply
        </Button>
      </Stack>
    </CustomContainer>
  );
}
