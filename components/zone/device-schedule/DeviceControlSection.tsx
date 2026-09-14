"use client";

import { useEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AddIcon from "@mui/icons-material/Add";
import UndoIcon from "@mui/icons-material/Undo";
import { DeviceController } from "./DeviceController";
import { customFetch } from "@/lib/utils/apiUtils";

type Interval = { onTime: string; offTime?: string; volumeMl?: number; device: string };
type SchedulePreset = {
  id: number;
  name: string;
  plant: { id: number; name: string } | null;
  intervals: Interval[];
};

function isValidInterval(item: Interval): boolean {
  if (!item.onTime) return false;
  // PUMP fires once for a volume rather than running for a duration, so it
  // has no offTime to require.
  return item.device === "PUMP" ? !!item.volumeMl : !!item.offTime;
}

export function DeviceControlSection({
  uuid,
  index,
  plantId,
}: {
  uuid: string;
  index: number;
  plantId?: number;
}) {
  const [schedule, setSchedule] = useState<Interval[]>([]);
  const [loading, setLoading] = useState(true);
  // Bumped after every successful save/preset-apply so the DeviceController
  // key changes, forcing a remount that clears their local
  // "selected interval" state.
  const [resetKey, setResetKey] = useState(0);

  const [presets, setPresets] = useState<SchedulePreset[]>([]);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [saveOpen, setSaveOpen] = useState(false);
  const [presetName, setPresetName] = useState("");

  // Undo history for local, unsaved edits (drag, add, delete, preset apply).
  // Continuous edits like a drag call onChange on every pointer move, so
  // snapshots are throttled to one per gesture rather than one per pixel.
  const historyRef = useRef<Interval[][]>([]);
  const lastSnapshotAtRef = useRef(0);
  const [canUndo, setCanUndo] = useState(false);
  const SNAPSHOT_THROTTLE_MS = 400;
  const MAX_HISTORY = 20;

  const pushHistory = (prevSchedule: Interval[], force = false) => {
    const now = Date.now();
    if (!force && now - lastSnapshotAtRef.current < SNAPSHOT_THROTTLE_MS) return;
    historyRef.current = [...historyRef.current, prevSchedule].slice(-MAX_HISTORY);
    lastSnapshotAtRef.current = now;
    setCanUndo(true);
  };

  const handleUndo = () => {
    const prev = historyRef.current.pop();
    if (!prev) return;
    setSchedule(prev);
    setResetKey((key) => key + 1);
    setCanUndo(historyRef.current.length > 0);
  };

  const fetchSchedule = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const response = await customFetch(
        `station/zone/config?uuid=${uuid}&index=${index}`,
        "GET"
      );
      if (response.status === 200) {
        setSchedule(response.message.scheduleIntervals ?? []);
      } else {
        console.error("Failed to load schedule");
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const fetchPresets = async () => {
    try {
      const response = await customFetch(`schedule-presets`, "GET");
      if (response.status === 200) setPresets(response.message);
    } catch (error) {
      console.error("Error fetching schedule presets:", error);
    }
  };

  useEffect(() => {
    fetchSchedule();
    fetchPresets();
    historyRef.current = [];
    setCanUndo(false);
  }, [uuid, index]);

  // The API replaces ALL of a zone's schedule intervals on every save, so
  // saving must always send every device's intervals together — not just
  // the one the user last edited, or the others would be wiped out.
  const updateDeviceSchedule = (device: string, deviceSchedule: Interval[]) => {
    setSchedule((prev) => {
      pushHistory(prev);
      return [...prev.filter((item) => item.device !== device), ...deviceSchedule];
    });
  };

  const handleApplySchedule = async () => {
    const validSchedule = schedule.filter(isValidInterval);
    try {
      const response = await customFetch(`station/zone/config`, "POST", {
        uuid,
        index,
        scheduleIntervals: validSchedule,
      });
      if (response.status === 200) {
        alert("Розклад успішно збережений!");
        await fetchSchedule(true);
        setResetKey((key) => key + 1);
        historyRef.current = [];
        setCanUndo(false);
      } else {
        alert("Не вдалося зберегти розклад");
      }
    } catch (err) {
      console.error("Failed to save schedule:", err);
    }
  };

  const handleApplyPreset = (preset: SchedulePreset) => {
    pushHistory(schedule, true);
    setSchedule(
      preset.intervals.map((interval) => ({
        device: interval.device,
        onTime: interval.onTime,
        offTime: interval.offTime ?? undefined,
        volumeMl: interval.volumeMl ?? undefined,
      }))
    );
    setResetKey((key) => key + 1);
    setMenuAnchor(null);
  };

  const handleSavePreset = async () => {
    const validSchedule = schedule.filter(isValidInterval);
    if (!presetName.trim() || validSchedule.length === 0) {
      alert("Вкажіть назву та хоча б один інтервал");
      return;
    }
    try {
      const response = await customFetch(`schedule-presets`, "POST", {
        name: presetName.trim(),
        plantId,
        intervals: validSchedule,
      });
      if (response.status === 200) {
        setSaveOpen(false);
        setPresetName("");
        fetchPresets();
      } else {
        alert("Не вдалося зберегти пресет");
      }
    } catch (error) {
      console.error("Failed to save schedule preset:", error);
    }
  };

  if (loading) return null;

  return (
    <Stack sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2 }} gap={2}>
      <DeviceController
        key={`LIGHT-${resetKey}`}
        title="Light"
        device="LIGHT"
        schedule={schedule.filter((item) => item.device === "LIGHT")}
        onChange={(deviceSchedule) => updateDeviceSchedule("LIGHT", deviceSchedule)}
      />
      <Divider />
      <DeviceController
        key={`FAN-${resetKey}`}
        title="Fan"
        device="FAN"
        schedule={schedule.filter((item) => item.device === "FAN")}
        onChange={(deviceSchedule) => updateDeviceSchedule("FAN", deviceSchedule)}
      />
      <Divider />
      <DeviceController
        key={`PUMP-${resetKey}`}
        title="Water Pump"
        device="PUMP"
        schedule={schedule.filter((item) => item.device === "PUMP")}
        onChange={(deviceSchedule) => updateDeviceSchedule("PUMP", deviceSchedule)}
      />

      <Stack direction="row" gap={1}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleApplySchedule}
          startIcon={<CheckIcon fontSize="small" />}
        >
          Застосувати розклад
        </Button>
        <Tooltip title="Скасувати останню зміну">
          <span>
            <IconButton
              onClick={handleUndo}
              disabled={!canUndo}
              sx={{ border: "1px solid #cad2c5", borderRadius: 1.5 }}
            >
              <UndoIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Пресети розкладу">
          <IconButton
            onClick={(e) => setMenuAnchor(e.currentTarget)}
            sx={{ border: "1px solid #cad2c5", borderRadius: 1.5 }}
          >
            <BookmarksIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>

      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
        {presets.length === 0 && <MenuItem disabled>Немає збережених пресетів</MenuItem>}
        {presets.map((preset) => (
          <MenuItem key={preset.id} onClick={() => handleApplyPreset(preset)}>
            <ListItemText primary={preset.name} secondary={preset.plant?.name} />
          </MenuItem>
        ))}
        <Divider />
        <MenuItem
          onClick={() => {
            setMenuAnchor(null);
            setSaveOpen(true);
          }}
        >
          <AddIcon fontSize="small" sx={{ mr: 1 }} />
          Зберегти поточний розклад як пресет
        </MenuItem>
      </Menu>

      <Dialog open={saveOpen} onClose={() => setSaveOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Зберегти пресет розкладу</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Назва пресету"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            sx={{ mt: 1 }}
          />
          {plantId && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
              Буде прив&apos;язано до рослини цієї зони
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveOpen(false)}>Скасувати</Button>
          <Button variant="contained" onClick={handleSavePreset}>
            Зберегти
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
