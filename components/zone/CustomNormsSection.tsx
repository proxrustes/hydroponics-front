import { useState, useEffect } from "react"
import {
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
  Tooltip
} from "@mui/material"
import RestartAltIcon from "@mui/icons-material/RestartAlt"
import { CustomContainer } from "@/components/common/CustomContainer"
import { customFetch } from "@/lib/apiUtils"

// Тип (min, max)
type RangeTuple = [number, number]

// Ожидаемая структура (пример):
export interface ZoneParamNorms {
  airHumidity: RangeTuple
  temperature: RangeTuple
  substrateHumidity: RangeTuple
  // ... добавьте остальные поля, если нужно
}

interface CustomNormsSectionProps {
  zoneId: number
  // Доп колбэк, который вызываем после успешного сохранения
  onUpdate?: () => void
}

export function CustomNormsSection({ zoneId, onUpdate }: CustomNormsSectionProps) {
  const [customParams, setCustomParams] = useState<ZoneParamNorms | null>(null)

  // 1. Подгружаем «эффективные нормы» с сервера
  useEffect(() => {
    const fetchNorms = async () => {
      try {
        // GET /api/zone/[zoneId]/norms
        const response = await customFetch(`zone/${zoneId}/norms`, "GET")
        if (response.status === 200 && response.message?.effectiveNorms) {
          // Пример: response.message.effectiveNorms = { temperature: [20, 28], airHumidity: [60, 80], ... }
          setCustomParams(response.message.effectiveNorms)
        }
      } catch (error) {
        console.error("Failed to fetch norms:", error)
      }
    }
    fetchNorms()
  }, [zoneId])

  // 2. Пока не загрузили нормы — показываем "Loading..."
  if (!customParams) {
    return <div>Loading norms...</div>
  }

  // Функция изменения диапазона (min, max)
  const handleParamChange = (key: keyof ZoneParamNorms, value: [number, number]) => {
    setCustomParams((prev) => {
      if (!prev) return prev
      return { ...prev, [key]: value }
    })
  }

  // Сбросить поле к [0, 0] (или вообще не вызывать update, зависит от логики)
  const handleReset = (key: keyof ZoneParamNorms) => {
    setCustomParams((prev) => {
      if (!prev) return prev
      // Или можно вообще удалить поле, если хотите "сброс" → null
      return { ...prev, [key]: [0, 0] }
    })
  }

  // 3. Нажатие на Apply → PUT запрос
  const handleSave = async () => {
    try {
      const response = await customFetch(`zone/${zoneId}/norms`, "PUT", customParams)
      if (response.status === 200) {
        alert("Custom norms saved successfully")
        // Вызываем onUpdate, чтобы родитель смог перегрузить данные
        onUpdate?.()
      } else {
        alert("Failed to save norms")
      }
    } catch (error) {
      console.error("Failed to save norms:", error)
      alert("Error occurred while saving norms")
    }
  }

  // 4. JSX
  return (
    <CustomContainer>
      <Stack spacing={2}>
        {(["airHumidity", "temperature", "substrateHumidity"] as const).map((key) => (
          <Stack key={key} spacing={1}>
            <Typography sx={{ fontWeight: 600 }}>
              {/* Преобразуем key в читаемый вид */}
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                label="Min"
                size="small"
                type="number"
                value={customParams[key][0]}
                onChange={(e) =>
                  handleParamChange(key, [Number(e.target.value), customParams[key][1]])
                }
                fullWidth
              />
              <TextField
                label="Max"
                size="small"
                type="number"
                value={customParams[key][1]}
                onChange={(e) =>
                  handleParamChange(key, [customParams[key][0], Number(e.target.value)])
                }
                fullWidth
              />
              <Tooltip title="Reset to Default">
                <IconButton onClick={() => handleReset(key)}>
                  <RestartAltIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        ))}
        <Button variant="contained" color="primary" onClick={handleSave}>
          Apply
        </Button>
      </Stack>
    </CustomContainer>
  )
}
