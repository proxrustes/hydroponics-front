"use client";
import { useState, useEffect } from "react";
import { LinearProgress, Stack } from "@mui/material";
import { CustomContainer } from "../common/CustomContainer";
import { SemiCircleProgress } from "../common/SemiCircleProgress";
import { createParameters, parameterConfig } from "@/lib/parameterConfig";
import { customFetch } from "@/lib/utils/apiUtils";

interface Plant {
  name: string;
}

interface ZoneFullInfo {
  id: number;
  name: string;
  plant?: Plant;
}

export function ParamsSection({ zoneId }: { zoneId: number }) {
  const [zone, setZone] = useState<ZoneFullInfo | null>(null);
  const [currentParams, setCurrentParams] = useState<Record<
    string,
    number
  > | null>(null);
  const [zoneNorms, setZoneNorms] = useState<Record<
    string,
    [number, number]
  > | null>(null);

  useEffect(() => {
    // 1. Грузим общую инфу о зоне
    const fetchZone = async () => {
      try {
        const res = await customFetch(`zone/${zoneId}`, "GET");
        if (res.status === 200) {
          setZone(res.message);
        }
      } catch (err) {
        console.error("Failed to fetch zone info:", err);
      }
    };

    // 2. Грузим "текущие параметры" (из логов)
    const fetchCurrentParams = async () => {
      try {
        const res = await customFetch(`zone/${zoneId}/params`, "GET");
        if (res.status === 200) {
          setCurrentParams(res.message);
        }
      } catch (err) {
        console.error("Failed to fetch current params:", err);
      }
    };

    // 3. Грузим "эффективные" нормы
    const fetchNorms = async () => {
      try {
        const res = await customFetch(`zone/${zoneId}/norms`, "GET");
        if (res.status === 200 && res.message?.effectiveNorms) {
          setZoneNorms(res.message.effectiveNorms);
        }
      } catch (err) {
        console.error("Failed to fetch norms:", err);
      }
    };

    fetchZone();
    fetchCurrentParams();
    fetchNorms();
  }, [zoneId]);

  if (!zone || !currentParams || !zoneNorms) {
    return <LinearProgress />;
  }

  const parameters = createParameters(
    ["airHumidity", "temperature", "substrateHumidity"],
    parameterConfig,
    currentParams,
    zoneNorms
  );

  return (
    <CustomContainer>
      <Stack direction="row" justifyContent="space-around">
        {parameters.map((param) => (
          <SemiCircleProgress param={param} key={param.name} />
        ))}
      </Stack>
    </CustomContainer>
  );
}
