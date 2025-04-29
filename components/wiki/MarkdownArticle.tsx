import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container, Divider, Paper, Typography } from "@mui/material";

export async function MarkdownArticle({
  section,
  filename,
  title,
}: {
  section: string;
  filename: string;
  title: string;
}) {
  const filePath = path.join(
    process.cwd(),
    "content",
    "wiki",
    section,
    `${filename}.md`
  );
  let fileContent = "";

  try {
    fileContent = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.log(error);
    fileContent = "# Помилка\nНе вдалося завантажити статтю.";
  }

  return (
    <Container maxWidth="xl">
      <Paper sx={{ p: 6 }}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          {title}
        </Typography>
        <Divider />
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{fileContent}</ReactMarkdown>
      </Paper>
    </Container>
  );
}
