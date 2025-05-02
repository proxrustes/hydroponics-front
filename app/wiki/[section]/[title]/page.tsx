"use client";

import { MarkdownArticle } from "@/components/wiki/MarkdownArticle";
import { useParams } from "next/navigation";

export default async function WikiArticlePage() {
  const { section, title } = useParams();

  if (!section || typeof section !== "string") {
    return <div>section</div>;
  }
  if (!title || typeof title !== "string") {
    return <div>title</div>;
  }

  return (
    <MarkdownArticle
      section={section}
      filename={title}
      title={decodeURIComponent(title.replaceAll("-", " "))}
    />
  );
}
