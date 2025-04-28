import { Box, Stack, Typography } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";

export function InfoCard(props: {
  orientation: "left" | "right";
  title: string;
  description: string;
  quote: string;
}) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <AppleIcon
        sx={{
          position: "absolute",
          color: "secondary.main",
          zIndex: 0,
          fontSize: 124,
        }}
      />
      <Stack sx={{ zIndex: 10, justifyContent: "center" }}>
        <Typography variant="h3">{props.title}</Typography>
        <Typography>{props.description}</Typography>
      </Stack>
      <Stack
        sx={{
          borderWidth: 4,
          borderStyle: "solid",
          borderColor: "primary.light",
          borderRadius: 8,
          width: 700,
          height: 200,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography textAlign="center">{props.quote}</Typography>
      </Stack>
    </Stack>
  );
}
