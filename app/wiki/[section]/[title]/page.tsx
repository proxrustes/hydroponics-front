import { MarkdownArticle } from "@/components/wiki/MarkdownArticle";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    section: string;
    title: string;
  };
}

export default function WikiArticlePage({ params }: PageProps) {
  const { section, title } = params;

  if (!section || !title) return notFound();

  return (
    <MarkdownArticle
      section={section}
      filename={title}
      title={decodeURIComponent(title.replaceAll("-", " "))}
    />
  );
}
