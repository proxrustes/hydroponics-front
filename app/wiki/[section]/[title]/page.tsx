import { MarkdownArticle } from "@/components/wiki/MarkdownArticle";

interface PageProps {
  params: {
    section: string;
    title: string;
  };
}

export default function WikiArticlePage({ params }: PageProps) {
  const { section, title } = params;

  return (
    <MarkdownArticle
      section={section}
      filename={title}
      title={decodeURIComponent(title.replaceAll("-", " "))}
    />
  );
}
