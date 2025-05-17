import { Box, Grid2, LinearProgress, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Parameter } from "./Parameter";
import { customFetch } from "@/lib/utils/apiUtils";
import { createParameters, parameterConfig } from "@/lib/parameterConfig";

export function ZoneParameters({
  uuid,
  index,
}: {
  uuid: string;
  index: number;
}) {
  const [currentParams, setCurrentParams] = useState<any>(null);
  const [targetParams, setTargetParams] = useState<any>(null);
  const [zoneNorms, setZoneNorms] = useState<
    Record<string, [number, number]> | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [paramsRes, targetRes, normsRes] = await Promise.all([
          customFetch(`station/zone/params?uuid=${uuid}&index=${index}`, "GET"),
          customFetch(`station/zone/config?uuid=${uuid}&index=${index}`, "GET"),
          customFetch(`station/zone/norms?uuid=${uuid}&index=${index}`, "GET"),
        ]);

        if (paramsRes.status === 200) setCurrentParams(paramsRes.message);
        if (targetRes.status === 200) setTargetParams(targetRes.message);
        if (normsRes.status === 200)
          setZoneNorms(normsRes.message.effectiveNorms);
      } catch (error) {
        console.error("❌ Error loading parameters", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [uuid, index]);

  if (loading) {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography>Завантаження параметрів середовища...</Typography>
        <LinearProgress sx={{ mt: 1 }} />
      </Box>
    );
  }

  if (!currentParams) {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ mt: 2 }}>
          Поточні параметри недоступні або не передаються з датчиків.
        </Typography>
      </Box>
    );
  }

  const parameters = createParameters(
    ["airHumidity", "temperature", "substrateHumidity"],
    parameterConfig,
    currentParams,
    zoneNorms,
    targetParams
  );

  return (
    <Grid2 container spacing={2} sx={{ mt: 2 }}>
      {parameters.map((param, i) => (
        <Grid2 size={4} key={i}>
          <Parameter {...param} />
        </Grid2>
      ))}
    </Grid2>
  );
}
