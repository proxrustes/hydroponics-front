"use client"
import { useState, useEffect } from "react"
import { Stack } from "@mui/material"
import { CustomContainer } from "../common/CustomContainer"
import { SemiCircleProgress } from "../common/SemiCircleProgress"
import { createParameters, parameterConfig } from "@/lib/parameterConfig"
import { customFetch } from "@/lib/apiUtils"

type RangeTuple = [number, number]

interface ZoneNorms {
  // min/max для каждого параметра
  temperature: RangeTuple
  airHumidity: RangeTuple
  substrateHumidity: RangeTuple
  // при необходимости добавьте остальные: phLevel, ...
}

interface CurrentParams {
  // то, что приходит с /zone/[id]/currentParams
  temperature: number
  airHumidity: number
  substrateHumidity: number
  // ...
}

interface Plant {
  name: string
  // ... при необходимости
}

interface ZoneFullInfo {
  id: number
  name: string
  plant?: Plant
  // ...
}

/**
 * Компонент, который по zoneId подгружает:
 * - информацию о зоне (Zone)
 * - текущие параметры (currentParams)
 * - нормы (effectiveNorms)
 * и рисует SemiCircleProgress по "temperature", "airHumidity", "substrateHumidity".
 */
export function ParamsSection({ zoneId }: { zoneId: number }) {
  const [zone, setZone] = useState<ZoneFullInfo | null>(null)
  const [currentParams, setCurrentParams] = useState<Record<string, number> | null>(null)
  const [zoneNorms, setZoneNorms] = useState<Record<string, [number, number]> | null>(null)

  useEffect(() => {
    // 1. Грузим общую инфу о зоне
    const fetchZone = async () => {
      try {
        const res = await customFetch(`zone/${zoneId}`, "GET")
        if (res.status === 200) {
          setZone(res.message)
        }
      } catch (err) {
        console.error("Failed to fetch zone info:", err)
      }
    }

    // 2. Грузим "текущие параметры" (из логов)
    const fetchCurrentParams = async () => {
      try {
        const res = await customFetch(`zone/${zoneId}/currentParams`, "GET")
        if (res.status === 200) {
          setCurrentParams(res.message)
        }
      } catch (err) {
        console.error("Failed to fetch current params:", err)
      }
    }

    // 3. Грузим "эффективные" нормы
    const fetchNorms = async () => {
      try {
        // Предполагаем, что /zone/[id]/norms возвращает:
        // {
        //   "status": 200,
        //   "message": {
        //     "zoneId": 4,
        //     "zoneName": "Зона для Томатів",
        //     "effectiveNorms": {
        //       "temperature": [20, 28],
        //       "airHumidity": [65, 80],
        //       ...
        //     }
        //   }
        // }
        const res = await customFetch(`zone/${zoneId}/norms`, "GET")
        if (res.status === 200 && res.message?.effectiveNorms) {
          setZoneNorms(res.message.effectiveNorms)
        }
      } catch (err) {
        console.error("Failed to fetch norms:", err)
      }
    }

    fetchZone()
    fetchCurrentParams()
    fetchNorms()
  }, [zoneId])

  // Пока что-то не загрузилось — показываем лоадер
  if (!zone || !currentParams || !zoneNorms) {
    return <div>Loading...</div>
  }

  // Подготовка данных для отрисовки
  // "params" = фактические показатели
  // "norms" = [min, max] диапазоны
  const parameters = createParameters(
    ["airHumidity", "temperature", "substrateHumidity"],
    parameterConfig,
    currentParams,   // фактические значения
    zoneNorms        // нормы (type ZoneNorms)
  )

  return (
    <CustomContainer>
      <Stack direction="row" justifyContent="space-around">
        {parameters.map((param) => (
          <SemiCircleProgress param={param} key={param.name} />
        ))}
      </Stack>
    </CustomContainer>
  )
}
