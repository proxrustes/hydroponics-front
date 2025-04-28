import { Stack, Typography } from "@mui/material";

export function InfoCard(props: {
  orientation: "left" | "right";
  title: string;
  description: string;
  quote: string;
  icon: React.ElementType;
}) {
  const Icon = props.icon;
  return (
    <Stack direction="row" justifyContent="space-between" gap={12}>
      {props.orientation === "left" && (
        <Stack flex={1}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Icon sx={{ color: "primary.light", fontSize: 42 }} />
            <Typography
              sx={{
                fontWeight: 800,
                color: "primary.main",
                fontSize: 42,
                textAlign: "right",
              }}
            >
              {props.title}
            </Typography>
          </Stack>
          <Typography sx={{ color: "primary.main", fontSize: 24 }}>
            {props.description}
          </Typography>
        </Stack>
      )}

      <Stack
        sx={{
          backgroundColor: "secondary.light",
          borderRadius: 8,
          height: 200,
          flex: 1,
          width: 700,
          textOverflow: "unset",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        <Typography
          textAlign="center"
          sx={{ fontWeight: 800, color: "primary.main", fontSize: 24 }}
        >
          {props.quote}
        </Typography>
      </Stack>
      {props.orientation === "right" && (
        <Stack flex={1}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <Icon sx={{ color: "primary.light", fontSize: 42 }} />
            <Typography
              sx={{
                fontWeight: 800,
                color: "primary.main",
                fontSize: 42,
                textAlign: "right",
              }}
            >
              {props.title}
            </Typography>
          </Stack>

          <Typography
            sx={{ textAlign: "right", color: "primary.main", fontSize: 24 }}
          >
            {props.description}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
