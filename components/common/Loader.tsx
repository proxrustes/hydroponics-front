import { Stack, CircularProgress, Typography, SxProps } from "@mui/material";

export function Loader(props: {sx?: SxProps}){
    return <Stack sx={{alignItems:"center", ...props.sx}} gap={2}>
    <CircularProgress size={80}/>
    <Typography sx={{fontWeight: 600, color:"secondary.main"}}>Loading...</Typography>
    </Stack>
}