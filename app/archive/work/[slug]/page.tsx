import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/archive2025/projects";
import { caseStudies } from "@/data/archive2025/caseStudies";
import CaseStudy from "@/components/archive2025/CaseStudy2025";

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
    robots: { index: false, follow: false },
  };
}

export default async function ArchiveCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();
  return <CaseStudy project={project} />;
}
