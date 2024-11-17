import { Container, Typography } from "@mui/material"

const MOCK_DATA =  {
    name: "Station 2",
    plant: "Lettuce",
    params: {
      ph_level: 5.8,
      temperature: 20.0,
      humidity: 55,
      light_intensity: 650,
      nutrient_concentration: 1.2
    }
  }

  export default async function Page({
    params,
  }: {
    params: Promise<{ id: string }>
  }){
    return(
        <Container maxWidth="xl">
            <Typography>{MOCK_DATA.name}</Typography>
            <Typography variant="h3" sx={{fontWeight: 900}}>{MOCK_DATA.plant}</Typography>
        </Container>
    )
}