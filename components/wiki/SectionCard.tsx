import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import Link from "next/link";

export function SectionCard({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) {
  return (
    <Card sx={{ backgroundColor: "secondary.light", flex: 1 }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" color="primary.main">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {description}
        </Typography>
        <Box mt={2}>
          <Button variant="contained" size="small" component={Link} href={link}>
            Перейти
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
