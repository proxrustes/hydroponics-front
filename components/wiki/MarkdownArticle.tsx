"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container, Divider, Paper, Typography } from "@mui/material";

export function MarkdownArticle({
  section,
  filename,
  title,
}: {
  section: string;
  filename: string;
  title: string;
}) {
  const [content, setContent] = useState("# Завантаження...");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`/wiki/${section}/${filename}.md`);
        if (!res.ok) throw new Error("404");
        const text = await res.text();
        setContent(text);
      } catch (e) {
        setContent("# Помилка\nНе вдалося завантажити статтю.");
      }
    };

    fetchContent();
  }, [section, filename]);

  return (
    <Container maxWidth="xl">
      <Paper sx={{ p: 6 }}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          {title}
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </Paper>
    </Container>
  );
}
