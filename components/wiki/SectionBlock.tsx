import type { ComponentType } from "react";
import { Stack, Typography } from "@mui/material";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import { SectionCard } from "./SectionCard";

export function SectionBlock({
  title,
  subtitle,
  items,
  icon: Icon,
}: {
  title: string;
  subtitle: string;
  items: { title: string; description: string; link: string }[];
  icon: ComponentType<SvgIconProps>;
}) {
  return (
    <Stack spacing={4} width="100%">
      <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center">
        <Icon color="primary" sx={{ fontSize: 34 }} />
        <Typography
          variant="h3"
          fontWeight={800}
          color="primary.main"
          textAlign="center"
        >
          {title}
        </Typography>
      </Stack>
      <Typography variant="h6" color="text.secondary" textAlign="center">
        {subtitle}
      </Typography>
      <Stack spacing={3}>
        {items.map((item, idx) => (
          <SectionCard key={idx} {...item} />
        ))}
      </Stack>
    </Stack>
  );
}
