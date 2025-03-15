"use client"
import React, { useEffect, useState } from "react"
import { Button, MenuItem, Select, Stack, Typography } from "@mui/material"
import { customFetch } from "@/lib/apiUtils"
import { CustomContainer } from "./common/CustomContainer"

// Типы
interface Plant {
    id: number
    name: string
}

interface EditZonePlantProps {
    zoneId: number
    currentPlantId: number
    onSuccess?: () => void // Колбэк для обновления родительского компонента
}

export function EditZonePlant({ zoneId, currentPlantId, onSuccess }: EditZonePlantProps) {
    const [plants, setPlants] = useState<Plant[]>([])
    const [selectedPlant, setSelectedPlant] = useState<number>(currentPlantId)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        async function fetchPlants() {
            try {
                const res = await customFetch("plants", "GET") 
                if (res.status === 200) {
                    const rawGroups = res.message

                    const allPlants = rawGroups.flatMap((group: any) =>
                        group.plants.map((p: any) => ({
                            id: p.id,
                            name: p.name,
                        }))
                    )
                    setPlants(allPlants)

                }
            } catch (error) {
                console.error("Failed to load plants:", error)
            }
        }
        fetchPlants()
    }, [])

    const handleSave = async () => {
        setIsSaving(true)
        try {
            const res = await customFetch(`zone/${zoneId}/plant`, "PUT", { plantId: selectedPlant })
            if (res.status === 200) {
                alert("Plant updated successfully!")
                onSuccess?.() 
            } else {
                alert("Failed to update plant")
            }
        } catch (error) {
            console.error("Error updating plant:", error)
            alert("Error updating plant")
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <CustomContainer>
            <Stack spacing={2}>
                <Typography variant="h6">Change Assigned Plant</Typography>
                <Select
                    value={selectedPlant}
                    onChange={(e) => setSelectedPlant(Number(e.target.value))}
                    fullWidth
                >
                    {plants.map((plant) => (
                        <MenuItem key={plant.id} value={plant.id}>
                            {plant.name}
                        </MenuItem>
                    ))}
                </Select>
                <Button variant="contained" color="primary" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save"}
                </Button>
            </Stack>
        </CustomContainer>
    )
}
