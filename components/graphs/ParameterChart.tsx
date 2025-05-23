"use client";
import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import { customFetch } from "@/lib/utils/apiUtils";
import { Alert } from "@mui/material";

export interface ZoneLogDto {
  id: number;
  zoneId: number;
  recordedAt: string;
  temperature: number;
  airHumidity: number;
  substrateHumidity: number;
  isLightOn?: boolean;
}

export interface ZoneLogLocal {
  id: number;
  zoneId: number;
  recordedAt: Date;
  temperature: number;
  airHumidity: number;
  substrateHumidity: number;
  isLightOn?: boolean;
}

export default function ParameterChart(props: {
  uuid: string;
  index: number;
  paramKey: keyof ZoneLogLocal;
  yAxisLabel: string;
}) {
  const [logs, setLogs] = useState<ZoneLogLocal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLogs() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await customFetch(
          `station/zone/logs?uuid=${props.uuid}&index=${props.index}`,
          "GET"
        );
        if (res.status === 200) {
          const rawLogs: ZoneLogDto[] = res.message;
          const mappedLogs: ZoneLogLocal[] = rawLogs.map((item) => ({
            ...item,
            recordedAt: new Date(item.recordedAt),
          }));
          setLogs(mappedLogs);
        } else {
          setError(`Failed to load logs: ${res.message}`);
        }
      } catch (err: any) {
        console.error("Error fetching logs:", err);
        setError(err.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    }
    fetchLogs();
  }, [props.uuid, props.index]);

  if (isLoading) return <div>Loading logs...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  if (logs.length === 0) {
    return <Alert severity="warning">No logs found for this period.</Alert>;
  }

  return (
    <LineChart
      dataset={logs as any[]}
      xAxis={[
        {
          dataKey: "recordedAt",
          scaleType: "time",
          label: "Recorded Time",
        },
      ]}
      yAxis={[
        {
          id: "mainAxis",
          label: props.yAxisLabel,
        },
      ]}
      series={[
        {
          id: props.paramKey,
          dataKey: props.paramKey,
          label: props.yAxisLabel,
          yAxisKey: "mainAxis",
          area: true,
          color: "pink",
        },
      ]}
      height={300}
      margin={{ top: 50, right: 80, bottom: 50, left: 50 }}
    />
  );
}
