import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import CaseStudy from "@/components/CaseStudy";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  const data = caseStudies[slug];

  if (!project) return {};

  return {
    title: data?.seoTitle ?? `${project.title} Case Study | Jinju Park`,
    description: data?.seoDescription ?? project.subtitle,
    openGraph: {
      title: data?.seoTitle ?? `${project.title} Case Study | Jinju Park`,
      description: data?.seoDescription ?? project.subtitle,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();
  return <CaseStudy project={project} />;
}
