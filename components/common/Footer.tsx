import { Stack, Typography } from "@mui/material";

export function Footer(){
    return(
        <Stack sx={{backgroundColor:"primary.dark", color:"white", height: "9vh", textAlign:"center", justifyContent:"center", mt:"1vh"}}>
            <Typography>Anastasiia Kudriavtseva</Typography>
            <Typography>all rights reserved || 2024</Typography>
        </Stack>
    )
}