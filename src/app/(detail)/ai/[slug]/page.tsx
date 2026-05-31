import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";

import { SectionHeading } from "@/components/shared/section-heading";

import { aiTopics, getAiTopic } from "@/lib/data/ai-topics";

export function generateStaticParams() {
  return aiTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getAiTopic(slug);
  if (!topic) return {};
  return {
    title: topic.title,
    description: topic.summary,
    alternates: { canonical: `/ai/${slug}` },
    openGraph: { title: topic.title, description: topic.summary, url: `/ai/${slug}` },
  };
}

export default async function AiTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getAiTopic(slug);
  if (!topic) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading title={topic.title} align="left" />
      <p className="text-muted-foreground mt-4 max-w-3xl">{topic.intro}</p>

      <div className="border-border mt-12 border-t">
        {topic.sections.map((section, index) => (
          <div key={section.heading} className="border-border border-b py-8">
            <div className="flex gap-6">
              <span className="text-gradient font-mono text-sm font-bold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-lg font-medium">{section.heading}</h2>
                <p className="text-muted-foreground mt-2 max-w-3xl">{section.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <Link href="/ai" className={buttonVariants({ variant: "outline" })}>
          ← AI 活用ハブに戻る
        </Link>
      </div>
    </div>
  );
}
