import { Theme } from "@emotion/react";
import { SxProps, Stack } from "@mui/material";

export function CustomContainer(props: {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}) {
  return (
    <Stack
      gap={1}
      sx={{
        p: 2,
        backgroundColor: "white",
        ...props.sx,
      }}
    >
      {props.children}
    </Stack>
  );
}
