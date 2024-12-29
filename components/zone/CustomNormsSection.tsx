import { useState, useEffect } from "react";
import { Stack, Typography, Switch, FormControlLabel, TextField, Button } from "@mui/material";
import { CustomContainer } from "@/components/common/CustomContainer";
import { ZoneParamNorms } from "@/enums/Params";

interface CustomNormsProps {
  initialParams: ZoneParamNorms;
  onSave?: (params: ZoneParamNorms) => void;
  onReset?: () => void;
}

export function CustomNormsSection({ initialParams, onSave, onReset }: CustomNormsProps) {
  const [isCustom, setIsCustom] = useState(true);
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

  const handleToggle = () => {
      if (isCustom && onReset) {
          onReset(); 
        }
        setIsCustom((prev) => !prev);
  };

  return (
    <CustomContainer>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: 24,
              textAlign: "center",
            }}
          >
            Custom Norms
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={isCustom}
                onChange={handleToggle}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label={isCustom ? "ON" : "OFF"}
          />
        </Stack>

        <Stack spacing={2}>
          {(["temperature", "substrate_humidity", "air_humidity"] as const).map((key) => (
            <Stack key={key} spacing={1}>
              <Typography sx={{ fontWeight: 600 }}>
                {key
                  .replace("_", " ")
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Typography>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Min"
                  size="small"
                  type="number"
                  value={customParams[key]?.[0] || ""}
                  onChange={(e) =>
                    handleParamChange(key, [Number(e.target.value), customParams[key]?.[1] || 0])
                  }
                  fullWidth
                  disabled={!isCustom}
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
                  disabled={!isCustom}
                />
              </Stack>
            </Stack>
          ))}
          <Button variant="contained" color="primary" onClick={handleSave} disabled={!isCustom}>
            Save Custom Norms
          </Button>
        </Stack>
      </Stack>
    </CustomContainer>
  );
}
