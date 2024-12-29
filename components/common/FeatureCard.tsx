"use client"
import { ButtonBase, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export function FeatureCard(props: { title: string; contents: any; url: string }) {
  const router = useRouter()
    return (
      
      <ButtonBase sx={{width:"100%"}} href={props.url}>   <Paper
        elevation={4}
        sx={{
          backgroundColor: "primary.dark",
          color: "secondary.main",
          borderRadius: 16,
          p: 2,
          height: "100%",
          borderColor:"secondary.main",
          borderWidth: 4,
          borderStyle: "solid",
          width:"100%"
        }}
      >
        <Stack
          alignItems="center"
          sx={{ height: "100%", width: "100%" }}
          justifyContent="center"
        >
              <Typography variant="h4" sx={{ lineHeight: 1, fontWeight: 800 }}>
                {props.title}
              </Typography>
              {props.contents}
        </Stack>
      </Paper></ButtonBase>
   
    )
  }
  