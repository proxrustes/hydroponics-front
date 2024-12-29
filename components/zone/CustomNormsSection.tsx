import { useState, useEffect } from "react";
import { Stack, Typography, TextField, Button, IconButton, Tooltip } from "@mui/material";
import { CustomContainer } from "@/components/common/CustomContainer";
import { ZoneParamNorms } from "@/enums/types/Params";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
interface CustomNormsProps {
  initialParams: ZoneParamNorms;
  onSave?: (params: ZoneParamNorms) => void;
}

export function CustomNormsSection({ initialParams, onSave }: CustomNormsProps) {
  const [customParams, setCustomParams] = useState(initialParams);

  useEffect(() => {
    setCustomParams(initialParams);
  }, [initialParams]);

  const handleParamChange = (key: keyof typeof customParams, value: [number, number]) => {
    setCustomParams((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(customParams);
    }
    alert(`Custom norms saved: ${JSON.stringify(customParams)}`);
  };

  return (
    <CustomContainer>
        <Stack spacing={2}>
          {(["air_humidity", "temperature", "substrate_humidity"] as const).map((key) => (
            <Stack key={key} spacing={1}>
              <Typography sx={{ fontWeight: 600 }}>
                {key
                  .replace("_", " ")
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  label="Min"
                  size="small"
                  type="number"
                  value={customParams[key]?.[0] || ""}
                  onChange={(e) =>
                    handleParamChange(key, [Number(e.target.value), customParams[key]?.[1] || 0])
                  }
                  fullWidth
                />
                <TextField
                  label="Max"
                  size="small"
                  type="number"
                  value={customParams[key]?.[1] || ""}
                  onChange={(e) =>
                    handleParamChange(key, [customParams[key]?.[0] || 0, Number(e.target.value)])
                  }
                  fullWidth
                />
                <Tooltip title="Reset to Default">
                  <IconButton><RestartAltIcon/></IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          ))}
          <Button variant="contained" color="primary" onClick={handleSave}>
            Apply
          </Button>
        </Stack>
    </CustomContainer>
  );
}
