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
        borderColor: "secondary.main",
        borderWidth: 6,
        borderStyle: "solid",
        borderRadius: 8,
        p: 2,
        backgroundColor: "white",
        ...props.sx,
      }}
    >
      {props.children}
    </Stack>
  );
}
