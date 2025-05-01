import { Stack, Typography } from "@mui/material";
import { SectionCard } from "./SectionCard";

export function SectionBlock({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: { title: string; description: string; link: string }[];
}) {
  return (
    <Stack spacing={4} width="100%">
      <Typography
        variant="h3"
        fontWeight={800}
        color="primary.main"
        textAlign="center"
      >
        {title}
      </Typography>
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
