import { Paper, Typography } from "@mui/material";

export function Article(props: { title: string; children: any }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 800 }}>
        {props.title}
      </Typography>
      {props.children}
    </Paper>
  );
}
