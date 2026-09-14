"use client";

import { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { customFetch } from "@/lib/utils/apiUtils";
import { Loader } from "@/components/common/Loader";
import { parameterConfig } from "@/lib/parameterConfig";

const KEYS = ["temperature", "airHumidity", "substrateHumidity"] as const;
type ParamKey = (typeof KEYS)[number];

// Fixed display scales for the comparison bars — percentages are naturally
// 0-100, temperature gets a typical greenhouse range with headroom above
// and below the norm band.
const SCALES: Record<ParamKey, [number, number]> = {
  temperature: [0, 40],
  airHumidity: [0, 100],
  substrateHumidity: [0, 100],
};

function toPercent(value: number, [min, max]: [number, number]): number {
  if (max === min) return 0;
  return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
}

export function ZoneParamsComparison({ uuid, index }: { uuid: string; index: number }) {
  const [current, setCurrent] = useState<Record<string, number> | null>(null);
  const [target, setTarget] = useState<Record<string, number> | null>(null);
  const [norms, setNorms] = useState<Record<string, [number, number]> | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [paramsRes, configRes, normsRes] = await Promise.all([
          customFetch(`station/zone/params?uuid=${uuid}&index=${index}`, "GET"),
          customFetch(`station/zone/config?uuid=${uuid}&index=${index}`, "GET"),
          customFetch(`station/zone/norms?uuid=${uuid}&index=${index}`, "GET"),
        ]);

        const currentParams = paramsRes.status === 200 ? paramsRes.message : null;
        setCurrent(currentParams);

        const targetParams = configRes.status === 200 ? configRes.message.targetParams : null;
        if (targetParams) {
          setTarget(targetParams);
        } else if (currentParams) {
          setTarget({
            temperature: currentParams.temperature,
            airHumidity: currentParams.airHumidity,
            substrateHumidity: currentParams.substrateHumidity,
          });
        }

        if (normsRes.status === 200) {
          setNorms(normsRes.message.effectiveNorms ?? undefined);
        }
      } catch (error) {
        console.error("❌ Помилка завантаження параметрів:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [uuid, index]);

  const handleChange = (key: ParamKey, value: number) => {
    setTarget((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleSave = async () => {
    if (!target) return;
    try {
      const response = await customFetch(
        `station/zone/config?uuid=${uuid}&index=${index}`,
        "POST",
        { uuid, index: Number(index), params: target }
      );
      if (response.status === 200) {
        alert("Цільові параметри збережено");
      } else {
        alert("Не вдалося зберегти цільові параметри");
      }
    } catch (error) {
      console.error("Failed to save target params:", error);
      alert("Сталася помилка при збереженні");
    }
  };

  if (loading || !current || !target) {
    return (
      <Box sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2 }}>
        <Loader sx={{ my: 4 }} />
      </Box>
    );
  }

  return (
    <Stack gap={2.5} sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2 }}>
      {KEYS.map((key) => {
        const config = parameterConfig[key];
        const scale = SCALES[key];
        const norm = norms?.[key];
        const curVal: number | undefined = current[key];
        const tgtVal: number | undefined = target[key];
        const curPct = curVal !== undefined ? toPercent(curVal, scale) : 0;
        const tgtPct = tgtVal !== undefined ? toPercent(tgtVal, scale) : 0;
        const normLeft = norm ? toPercent(norm[0], scale) : null;
        const normWidth = norm ? toPercent(norm[1], scale) - (normLeft ?? 0) : null;

        const Icon = config.icon;

        return (
          <Box key={key}>
            <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1 }}>
              <Stack direction="row" alignItems="center" gap={0.5} sx={{ flex: 1 }}>
                <Icon fontSize="small" sx={{ color: "primary.main" }} />
                <Typography sx={{ fontSize: 13, fontWeight: 700 }}>{config.name}</Typography>
              </Stack>
              {norm && (
                <Typography variant="caption" color="text.secondary">
                  {norm[0]}–{norm[1]}
                  {config.valueFormatter}
                </Typography>
              )}
            </Stack>

            {[0, 1].map((row) => (
              <Box
                key={row}
                sx={{
                  position: "relative",
                  height: 16,
                  borderRadius: 1,
                  bgcolor: "#f5f8f4",
                  mb: row === 0 ? 0.75 : 1,
                  overflow: "hidden",
                }}
              >
                {normWidth !== null && normLeft !== null && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: `${normLeft}%`,
                      width: `${normWidth}%`,
                      bgcolor: "#e3ede6",
                    }}
                  />
                )}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: `${row === 0 ? curPct : tgtPct}%`,
                    bgcolor: row === 0 ? "#b9c9bd" : "primary.main",
                    borderRadius: 1,
                  }}
                />
              </Box>
            ))}

            <Stack direction="row" alignItems="center" gap={1.5}>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <Box sx={{ width: 9, height: 9, borderRadius: 0.5, bgcolor: "#b9c9bd" }} />
                <Typography variant="caption" color="text.secondary">
                  Зараз {curVal !== undefined ? `${curVal}${config.valueFormatter}` : "немає даних"}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <Box sx={{ width: 9, height: 9, borderRadius: 0.5, bgcolor: "primary.main" }} />
                <Typography variant="caption" color="text.secondary">
                  Ціль
                </Typography>
              </Stack>
              <TextField
                type="number"
                size="small"
                variant="outlined"
                value={tgtVal ?? ""}
                onChange={(e) => handleChange(key, Number(e.target.value))}
                sx={{ width: 84, ml: "auto", "& input": { py: 0.5, textAlign: "center" } }}
              />
            </Stack>
          </Box>
        );
      })}

      <Button variant="contained" onClick={handleSave}>
        Зберегти цілі
      </Button>
    </Stack>
  );
}
