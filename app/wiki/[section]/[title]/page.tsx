"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { MarkdownArticle } from "@/components/wiki/MarkdownArticle";

export default function WikiArticlePage() {
  const params = useParams();

  const section =
    typeof params.section === "string" ? params.section : params.section?.[0];
  const title =
    typeof params.title === "string" ? params.title : params.title?.[0];

  if (!section || !title) return notFound();

  return (
    <MarkdownArticle
      section={section}
      filename={title}
      title={decodeURIComponent(title.replaceAll("-", " "))}
    />
  );
}
