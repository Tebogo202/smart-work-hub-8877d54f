import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { ResponsibleAiNotice } from "@/components/ai-output";

export const Route = createFileRoute("/responsible-ai")({
  head: () => ({
    meta: [
      { title: "Responsible AI | AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "How to use AI-generated content responsibly at work: review outputs, protect sensitive data and stay accountable for decisions.",
      },
      { property: "og:title", content: "Responsible AI Guidance" },
      {
        property: "og:description",
        content: "Guidelines for reviewing and safely using AI-generated workplace content.",
      },
    ],
  }),
  component: ResponsibleAi,
});

const POINTS = [
  {
    title: "AI can make mistakes",
    body: "Language models can produce content that sounds confident but is inaccurate, outdated or incomplete.",
  },
  {
    title: "Always review generated content",
    body: "Read every email, summary and plan carefully before sending, sharing or acting on it.",
  },
  {
    title: "Protect sensitive information",
    body: "Avoid entering confidential, personal, financial or company-restricted information into AI input fields.",
  },
  {
    title: "Outputs are suggestions, not verified facts",
    body: "Treat AI results as a first draft. Verify names, dates, figures and commitments against your own records.",
  },
  {
    title: "You remain responsible",
    body: "Decisions and communications made using AI-generated content remain your responsibility as the user.",
  },
];

function ResponsibleAi() {
  return (
    <AppShell>
      <PageHeader
        title="Responsible AI"
        subtitle="Use AI assistance thoughtfully, safely and accountably at work."
      />
      <ResponsibleAiNotice />
      <div className="mt-6 grid gap-4">
        {POINTS.map((point) => (
          <article key={point.title} className="surface-card flex gap-4 p-5">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h2 className="font-display text-base font-semibold">{point.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{point.body}</p>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
