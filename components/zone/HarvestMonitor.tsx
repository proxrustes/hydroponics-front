"use client";

import {
  Box,
  Typography,
  Stack,
  Chip,
  Divider,
  Button,
  ButtonGroup,
} from "@mui/material";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

export function HarvestMonitor() {
  const [status, setStatus] = useState<"idle" | "active" | "stopped">("idle");

  const handleStart = () => {
    setStatus("active");
    console.log("🔄 Маніпулятор запущено");
    // TODO: fetch("/api/station/zone/harvest/start")
  };

  const handleStop = () => {
    setStatus("stopped");
    console.log("🛑 Маніпулятор зупинено");
    // TODO: fetch("/api/station/zone/harvest/stop")
  };

  const dummy = {
    stageStats: {
      unripe: 8,
      semiRipe: 5,
      ripe: 3,
    },
    harvestedToday: 7,
  };

  return (
    <Box sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6">
        <PrecisionManufacturingIcon sx={{ mr: 1 }} />
        Блок збирання врожаю
      </Typography>
      <Stack direction="row" gap={4} mt={2}>
        <Stack flex={1}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body1">Статус маніпулятора:</Typography>
              <Chip
                label={status === "active" ? "Активний" : "Очікує"}
                color={status === "active" ? "success" : "default"}
                icon={<PrecisionManufacturingIcon />}
                sx={{
                  animation:
                    status === "active" ? "pulse 1.5s infinite" : "none",
                  "@keyframes pulse": {
                    "0%": { opacity: 1 },
                    "50%": { opacity: 0.5 },
                    "100%": { opacity: 1 },
                  },
                }}
              />
            </Stack>
            <ButtonGroup variant="contained">
              <Button
                color="success"
                startIcon={<PlayArrowIcon />}
                disabled={status === "active"}
                onClick={handleStart}
              >
                Старт
              </Button>
              <Button
                color="error"
                startIcon={<StopIcon />}
                disabled={status === "stopped"}
                onClick={handleStop}
              >
                Стоп
              </Button>
            </ButtonGroup>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" sx={{ mb: 1 }}>
            Розподіл стадій росту:
          </Typography>
          <Stack spacing={2} sx={{ mb: 2 }}>
            <Chip
              icon={<HourglassBottomIcon />}
              label={`Незрілі: ${dummy.stageStats.unripe}`}
              color="default"
            />
            <Chip
              icon={<AgricultureIcon />}
              label={`Середня стиглість: ${dummy.stageStats.semiRipe}`}
              color="warning"
            />
            <Chip
              icon={<CheckCircleIcon />}
              label={`Стиглі: ${dummy.stageStats.ripe}`}
              color="success"
            />
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Наступне завдання:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Зона 3 – рослина #14 – тип: Салат | Статус: стигла
            </Typography>
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Останні події:
              </Typography>
              <Typography
                variant="body1"
                color="success.main"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <CheckCircleIcon fontSize="small" /> 13:24 – Зрізано рослину #12 (зона 3)
              </Typography>
              <Typography
                variant="body1"
                color="warning.main"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <WarningAmberOutlinedIcon fontSize="small" /> 13:21 – Помилка позиціонування
                (зона 2)
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Всього зібрано: <b>{dummy.harvestedToday} / 20 шт.</b>
            </Typography>
          </Box>
        </Stack>
        <Box
          sx={{
            flex: 1,
            width: "100%",
            height: 460,
            backgroundColor: "#eee",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#999",
            fontStyle: "italic",
          }}
        >
          Камера: зображення буде доступне пізніше
        </Box>
      </Stack>
    </Box>
  );
}
