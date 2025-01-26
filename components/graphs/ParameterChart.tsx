"use client"
import React, { useEffect, useState } from "react"
import { LineChart } from "@mui/x-charts"
import { customFetch } from "@/lib/apiUtils"
import { CustomContainer } from "@/components/common/CustomContainer"
import { Container, Typography } from "@mui/material"

export interface ZoneLogDto {
    id: number
    zoneId: number
    recordedAt: string
    temperature: number
    airHumidity: number
    substrateHumidity: number
    isLightOn?: boolean
}

export interface ZoneLogLocal {
    id: number
    zoneId: number
    recordedAt: Date
    temperature: number
    airHumidity: number
    substrateHumidity: number
    isLightOn?: boolean
}


export default function ParameterChart(props: {
    zoneId: string, paramKey: keyof ZoneLogLocal 
    yAxisLabel: string
    chartTitle?: string
}) {
    const [logs, setLogs] = useState<ZoneLogLocal[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    
    useEffect(() => {
        async function fetchLogs() {
            setIsLoading(true)
            setError(null)
            try {
                const res = await customFetch(`zone/${props.zoneId}/logs`, "GET")
                if (res.status === 200) {
                    const rawLogs: ZoneLogDto[] = res.message
                    const mappedLogs: ZoneLogLocal[] = rawLogs.map(item => ({
                        ...item,
                        recordedAt: new Date(item.recordedAt)
                    }))
                    setLogs(mappedLogs)
                } else {
                    setError(`Failed to load logs: ${res.message}`)
                }
            } catch (err: any) {
                console.error("Error fetching logs:", err)
                setError(err.message || "Unknown error")
            } finally {
                setIsLoading(false)
            }
        }
        fetchLogs()
    }, [])

    if (isLoading) return <div>Loading logs...</div>
    if (error) return <div style={{ color: "red" }}>{error}</div>

    if (logs.length === 0) {
        return (
            <div>
                <div>No logs found for this period.</div>
            </div>
        )
    }

    return (
        <Container maxWidth="xl">
            <CustomContainer>
                <Typography>Zone Dashboard </Typography>
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
                        },
                      ]}
                    height={400}
                    margin={{ top: 50, right: 80, bottom: 50, left: 50 }}
                />
            </CustomContainer>
        </Container>

    )
}
