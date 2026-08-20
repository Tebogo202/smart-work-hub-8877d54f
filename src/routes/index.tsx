import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, CalendarCheck, Sparkles, Lightbulb, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ResponsibleAiNotice } from "@/components/ai-output";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant | Dashboard" },
      {
        name: "description",
        content:
          "Write professional emails, summarize meeting notes, plan tasks and chat with an AI workplace assistant — all in one dashboard.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "Work smarter. Communicate better. Get more done with AI.",
      },
    ],
  }),
  component: Dashboard,
});

const FEATURES = [
  {
    to: "/email" as const,
    icon: Mail,
    title: "Smart Email Generator",
    description: "Create professional workplace emails in seconds.",
    action: "Open Email Generator",
  },
  {
    to: "/meetings" as const,
    icon: FileText,
    title: "Meeting Notes Summarizer",
    description: "Turn long meeting notes into clear summaries and action items.",
    action: "Summarize Notes",
  },
  {
    to: "/tasks" as const,
    icon: CalendarCheck,
    title: "AI Task Planner",
    description: "Prioritize tasks and create an organized work plan.",
    action: "Plan My Tasks",
  },
  {
    to: "/assistant" as const,
    icon: Sparkles,
    title: "AI Workplace Assistant",
    description: "Ask AI for workplace productivity and communication help.",
    action: "Chat with AI",
  },
];

const TIPS = [
  "Group similar tasks together and handle them in one focused block to reduce context switching.",
  "Write the decision and the owner directly into your meeting notes — it makes follow-up effortless.",
  "Start your day with the single task that would make the rest of the day feel lighter.",
];

function Dashboard() {
  return (
    <AppShell>
      <section className="hero-gradient surface-card mb-8 p-6 sm:p-9">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
          Workplace AI Suite
        </p>
        <h1 className="font-display mt-3 text-2xl font-semibold sm:text-4xl">
          AI Workplace Productivity Assistant
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Work smarter. Communicate better. Get more done with AI.
        </p>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
          Welcome back. Choose a tool below to draft an email, turn messy meeting notes into action
          items, build a realistic daily plan, or ask the assistant anything about your workday.
        </p>
      </section>

      <section aria-label="Productivity tools" className="grid gap-4 sm:grid-cols-2">
        {FEATURES.map(({ to, icon: Icon, title, description, action }) => (
          <article
            key={to}
            className="surface-card group flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h2 className="font-display mt-4 text-lg font-semibold">{title}</h2>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{description}</p>
            <Button asChild className="mt-5 w-full sm:w-auto">
              <Link to={to}>
                {action}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </article>
        ))}
      </section>

      <section aria-label="Productivity tips" className="surface-card mt-8 p-6">
        <h2 className="font-display flex items-center gap-2 text-base font-semibold">
          <Lightbulb className="size-4.5 text-primary" aria-hidden="true" />
          Productivity Tips
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {TIPS.map((tip) => (
            <li key={tip} className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8">
        <ResponsibleAiNotice />
      </div>
    </AppShell>
  );
}
