"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Box, Container, Divider, Paper, Typography } from "@mui/material";

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
        const res = await fetch(`/content/wiki/${section}/${filename}.md`);
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
        <Typography variant="h2" fontWeight="bold" mb={8} textAlign="center">
          {title}
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Box sx={{ fontFamily: "Gill Sans, Arial, sans-serif" }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 {...props} style={{ textAlign: "center", padding: 40 }} />
              ),
              hr: ({ node, ...props }) => (
                <hr {...props} style={{ margin: 40 }} />
              ),
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  style={{ color: "#50786e", textDecoration: "underline" }}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  style={{ paddingLeft: "1.5em", marginBottom: "1em" }}
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li style={{ marginBottom: "0.5em" }} {...props} />
              ),
              code: ({ node, ...props }) => (
                <code
                  style={{
                    background: "#f5f5f5",
                    padding: "2px 4px",
                    borderRadius: "4px",
                  }}
                  {...props}
                />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  style={{
                    borderLeft: "4px solid #ccc",
                    margin: "1em 0",
                    padding: "0.5em 1em",
                    color: "#666",
                    fontStyle: "italic",
                  }}
                  {...props}
                />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </Box>
      </Paper>
    </Container>
  );
}
