import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";

type Interval = { onTime: string; offTime?: string; volumeMl?: number; device: string };
type DragMode = "start" | "end" | "move";

const DEVICE_ICONS: Record<string, typeof LightbulbOutlinedIcon> = {
  LIGHT: LightbulbOutlinedIcon,
  FAN: AirOutlinedIcon,
  PUMP: WaterDropOutlinedIcon,
};

const MINUTES_IN_DAY = 24 * 60;
const SNAP_MINUTES = 5;
const MIN_DURATION_MINUTES = 5;
const TICKS = [0, 6, 12, 18, 24];
const DEFAULT_VOLUME_ML = 200;

function timeToMinutes(time: string): number {
  const [h, m] = (time || "").split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return 0;
  return h * 60 + m;
}

function minutesToTime(minutes: number): string {
  const clamped = Math.max(0, Math.min(MINUTES_IN_DAY - 1, Math.round(minutes)));
  const h = Math.floor(clamped / 60);
  const m = clamped % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function snap(minutes: number): number {
  return Math.round(minutes / SNAP_MINUTES) * SNAP_MINUTES;
}

export function DeviceController({
  title,
  device,
  schedule,
  onChange,
}: {
  title: string;
  device: string;
  schedule: Interval[];
  onChange: (schedule: Interval[]) => void;
}) {
  // PUMP fires once at a time for a set volume, rather than running for a
  // start->end duration like LIGHT/FAN — it gets a single draggable marker
  // instead of a resizable block.
  const isPump = device === "PUMP";

  const [selected, setSelected] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    index: number;
    mode: DragMode;
    startX: number;
    origOn: number;
    origOff: number;
  } | null>(null);

  // The pointer listeners below are registered once; these refs let them
  // always see the latest schedule/onChange without re-binding on every
  // keystroke or drag update.
  const scheduleRef = useRef(schedule);
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    scheduleRef.current = schedule;
    onChangeRef.current = onChange;
  });

  // Drag to reposition/resize intervals directly on the timeline.
  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      const drag = dragRef.current;
      const track = trackRef.current;
      if (!drag || !track) return;
      const rect = track.getBoundingClientRect();
      const deltaMinutes = ((e.clientX - drag.startX) / rect.width) * MINUTES_IN_DAY;
      const current = scheduleRef.current;
      const item = current[drag.index];
      if (!item) return;
      const next = [...current];

      if (isPump) {
        const newOn = Math.max(0, Math.min(MINUTES_IN_DAY - 1, snap(drag.origOn + deltaMinutes)));
        next[drag.index] = { ...item, onTime: minutesToTime(newOn) };
      } else if (drag.mode === "move") {
        const duration = drag.origOff - drag.origOn;
        const newOn = Math.max(
          0,
          Math.min(MINUTES_IN_DAY - duration, snap(drag.origOn + deltaMinutes))
        );
        next[drag.index] = {
          ...item,
          onTime: minutesToTime(newOn),
          offTime: minutesToTime(newOn + duration),
        };
      } else if (drag.mode === "start") {
        const newOn = Math.max(
          0,
          Math.min(drag.origOff - MIN_DURATION_MINUTES, snap(drag.origOn + deltaMinutes))
        );
        next[drag.index] = { ...item, onTime: minutesToTime(newOn) };
      } else {
        const newOff = Math.max(
          drag.origOn + MIN_DURATION_MINUTES,
          Math.min(MINUTES_IN_DAY, snap(drag.origOff + deltaMinutes))
        );
        next[drag.index] = { ...item, offTime: minutesToTime(newOff) };
      }
      onChangeRef.current(next);
    };

    const handleUp = () => {
      dragRef.current = null;
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [isPump]);

  const startDrag = (e: ReactPointerEvent, idx: number, mode: DragMode) => {
    e.stopPropagation();
    setSelected(idx);
    const item = schedule[idx];
    dragRef.current = {
      index: idx,
      mode,
      startX: e.clientX,
      origOn: timeToMinutes(item.onTime || "00:00"),
      origOff: timeToMinutes(item.offTime || item.onTime || "00:00"),
    };
  };

  const handleAddInterval = () => {
    onChange([
      ...schedule,
      isPump
        ? { onTime: "08:00", volumeMl: DEFAULT_VOLUME_ML, device }
        : { onTime: "08:00", offTime: "09:00", device },
    ]);
    setSelected(schedule.length);
  };

  const handleDelete = (idx: number) => {
    onChange(schedule.filter((_, i) => i !== idx));
    setSelected(null);
  };

  const handleFieldChange = (idx: number, patch: Partial<Interval>) => {
    const next = [...schedule];
    next[idx] = { ...next[idx], ...patch };
    onChange(next);
  };

  const DeviceIcon = DEVICE_ICONS[device];

  return (
    <Stack gap={1}>
      <Stack direction="row" alignItems="center" gap={1}>
        {DeviceIcon && <DeviceIcon fontSize="small" sx={{ color: "primary.main" }} />}
        <Typography variant="subtitle1" sx={{ fontWeight: 700, flex: 1 }}>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {schedule.length} {schedule.length === 1 ? "інтервал" : "інтервалів"}
        </Typography>
      </Stack>

      <Box sx={{ position: "relative", height: 14 }}>
        {TICKS.map((h) => (
          <Typography
            key={h}
            variant="caption"
            sx={{
              position: "absolute",
              left: `${(h / 24) * 100}%`,
              transform: h === 24 ? "translateX(-100%)" : h === 0 ? "none" : "translateX(-50%)",
              color: "text.secondary",
              fontSize: 10,
            }}
          >
            {String(h).padStart(2, "0")}
          </Typography>
        ))}
      </Box>

      <Box
        ref={trackRef}
        onClick={() => setSelected(null)}
        sx={{
          position: "relative",
          height: 32,
          borderRadius: 1,
          bgcolor: "#f5f8f4",
          backgroundImage: "linear-gradient(to right, #e2e6e1 1px, transparent 1px)",
          backgroundSize: "25% 100%",
        }}
      >
        {schedule.map((item, idx) => {
          const isSelected = selected === idx;

          if (isPump) {
            const on = timeToMinutes(item.onTime || "00:00");
            const left = (on / MINUTES_IN_DAY) * 100;
            return (
              <Box
                key={idx}
                title={`${item.onTime} · ${item.volumeMl ?? 0} мл`}
                onPointerDown={(e) => startDrag(e, idx, "move")}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(idx);
                }}
                sx={{
                  position: "absolute",
                  top: 3,
                  bottom: 3,
                  left: `${left}%`,
                  width: 6,
                  transform: "translateX(-50%)",
                  bgcolor: isSelected ? "primary.main" : "#cfe3d4",
                  border: "1.5px solid",
                  borderColor: "primary.main",
                  borderRadius: 3,
                  cursor: "grab",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "#fff",
                    border: "2px solid",
                    borderColor: "primary.main",
                  }}
                />
              </Box>
            );
          }

          const on = timeToMinutes(item.onTime || "00:00");
          const off = timeToMinutes(item.offTime || "00:00");
          const left = (on / MINUTES_IN_DAY) * 100;
          const width = Math.max(((off - on) / MINUTES_IN_DAY) * 100, 0.6);
          return (
            <Box
              key={idx}
              onPointerDown={(e) => startDrag(e, idx, "move")}
              onClick={(e) => {
                e.stopPropagation();
                setSelected(idx);
              }}
              sx={{
                position: "absolute",
                top: 3,
                bottom: 3,
                left: `${left}%`,
                width: `${width}%`,
                bgcolor: isSelected ? "primary.main" : "#cfe3d4",
                border: "1.5px solid",
                borderColor: "primary.main",
                borderRadius: 1,
                cursor: "grab",
              }}
            >
              <Box
                onPointerDown={(e) => startDrag(e, idx, "start")}
                sx={{
                  position: "absolute",
                  left: -5,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: "#fff",
                  border: "2px solid",
                  borderColor: "primary.main",
                  cursor: "ew-resize",
                }}
              />
              <Box
                onPointerDown={(e) => startDrag(e, idx, "end")}
                sx={{
                  position: "absolute",
                  right: -5,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: "#fff",
                  border: "2px solid",
                  borderColor: "primary.main",
                  cursor: "ew-resize",
                }}
              />
            </Box>
          );
        })}
      </Box>

      {selected !== null && schedule[selected] && (
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={{ bgcolor: "#eef3ec", borderRadius: 1, px: 1, py: 0.5 }}
        >
          <TextField
            variant="outlined"
            size="small"
            type="time"
            value={schedule[selected].onTime || ""}
            onChange={(e) => handleFieldChange(selected, { onTime: e.target.value })}
            sx={{
              width: 100,
              bgcolor: "#fff",
              "& .MuiOutlinedInput-root": { borderRadius: 1 },
            }}
          />
          {isPump ? (
            <>
              <TextField
                variant="outlined"
                size="small"
                type="number"
                value={schedule[selected].volumeMl ?? ""}
                onChange={(e) =>
                  handleFieldChange(selected, { volumeMl: Number(e.target.value) })
                }
                slotProps={{ input: { endAdornment: "мл" } }}
                sx={{
                  width: 110,
                  bgcolor: "#fff",
                  "& .MuiOutlinedInput-root": { borderRadius: 1 },
                }}
              />
            </>
          ) : (
            <>
              <Typography color="text.secondary">→</Typography>
              <TextField
                variant="outlined"
                size="small"
                type="time"
                value={schedule[selected].offTime || ""}
                onChange={(e) => handleFieldChange(selected, { offTime: e.target.value })}
                sx={{
                  width: 100,
                  bgcolor: "#fff",
                  "& .MuiOutlinedInput-root": { borderRadius: 1 },
                }}
              />
            </>
          )}
          <IconButton size="small" onClick={() => handleDelete(selected)} sx={{ ml: "auto" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
      )}

      <Button
        variant="outlined"
        size="small"
        fullWidth
        onClick={handleAddInterval}
        startIcon={<AddIcon fontSize="small" />}
        sx={{ minWidth: { md: 0 }, px: { xs: 1.5, md: 1 }, fontSize: 12 }}
      >
        <Box component="span" sx={{ display: { xs: "inline", md: "none", lg: "inline" } }}>
          Додати інтервал
        </Box>
      </Button>
    </Stack>
  );
}
