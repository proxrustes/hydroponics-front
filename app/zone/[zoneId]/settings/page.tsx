"use client"
import { Container, Typography, Stack, IconButton, Dialog } from "@mui/material"
import { useEffect, useState } from "react"
import { ParamsSection } from "@/components/zone/ParamsSection"
import { DeviceControlSection } from "@/components/zone/DeviceControlSection"
import { CustomContainer } from "@/components/common/CustomContainer"
import { Loader } from "@/components/common/Loader"
import Grid from "@mui/material/Grid2"
import { CustomNormsSection } from "@/components/zone/CustomNormsSection"
import EditIcon from "@mui/icons-material/Edit"
import { EditZonePlant } from "@/components/EditZonePlant"

export default function Page({ params }: { params: { zoneId: string } }) {
  const [zone, setZone] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isEditMode, setEditMode] = useState(false)

  useEffect(() => {
    async function fetchZone() {
      try {
        const res = await fetch(`/api/zone/${params.zoneId}`)
        if (res.ok) {
          const data = await res.json()
          setZone(data.message)
        } else {
          console.error("Failed to fetch zone:", res.status)
        }
      } catch (error) {
        console.error("Fetch error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchZone()
  }, [])

  if (!zone || loading) {
    return <Loader sx={{ mt: "30vh" }} />
  }

  return (
    <Container maxWidth="xl">
      <Stack gap={2}>
        {/* Заголовок + кнопка редактирования */}
        <CustomContainer sx={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography variant="h3" sx={{ fontWeight: 900 }}>
            🪴 {zone.plant.name}
          </Typography>
          <IconButton onClick={() => setEditMode(true)}>
            <EditIcon sx={{ fontSize: 36 }} />
          </IconButton>
        </CustomContainer>

        <Grid container spacing={2}>
          <Grid size={8}>
            <ParamsSection zoneId={zone.id} />
          </Grid>
          <Grid size={4}>
            <CustomNormsSection zoneId={zone.id} onUpdate={() => {}} />
          </Grid>
        </Grid>
        <DeviceControlSection />

        {/* Модальное окно с редактированием растения */}
        <Dialog open={isEditMode} onClose={() => setEditMode(false)}>
          <EditZonePlant
            zoneId={zone.id}
            currentPlantId={zone.plant.id}
            onSuccess={() => {
              setEditMode(false)
              location.reload() // Или setZone({...}) с новым значением
            }}
          />
        </Dialog>
      </Stack>
    </Container>
  )
}
