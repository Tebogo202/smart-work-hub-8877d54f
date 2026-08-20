import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Wand2 } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import {
  EmptyState,
  ErrorPanel,
  LoadingPanel,
  OutputPanel,
  PrivacyNote,
  ResponsibleAiNotice,
} from "@/components/ai-output";
import { useAiGeneration } from "@/hooks/use-ai-generation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Turn raw meeting notes into a summary, key decisions, action items with owners and deadlines, and follow-ups.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer" },
      {
        property: "og:description",
        content: "Turn meeting notes into clear, actionable information.",
      },
    ],
  }),
  component: MeetingSummarizer,
});

function MeetingSummarizer() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [validation, setValidation] = useState<string | null>(null);
  const { output, setOutput, loading, error, generate, clear } = useAiGeneration("meeting");

  const submit = () => {
    if (!notes.trim()) {
      setValidation("Please enter your meeting notes before summarizing.");
      return;
    }
    setValidation(null);
    void generate({ title, notes });
  };

  return (
    <AppShell>
      <PageHeader
        title="Meeting Notes Summarizer"
        subtitle="Turn meeting notes into clear, actionable information."
      />

      <section aria-label="Meeting notes" className="surface-card space-y-5 p-5 sm:p-6">
        <div className="space-y-2">
          <Label htmlFor="meeting-title">Meeting Title (optional)</Label>
          <Input
            id="meeting-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Example: Weekly project sync"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Meeting Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Paste your meeting notes here..."
            className="min-h-64"
          />
        </div>

        <PrivacyNote />

        {validation ? (
          <p role="alert" className="text-sm font-medium text-destructive">
            {validation}
          </p>
        ) : null}

        <Button onClick={submit} disabled={loading} className="w-full sm:w-auto">
          <Wand2 className="size-4" aria-hidden="true" />
          {loading ? "Summarizing..." : "Summarize Meeting"}
        </Button>
      </section>

      <div className="mt-6 space-y-6">
        {loading ? <LoadingPanel /> : null}
        {!loading && error ? <ErrorPanel message={error} onRetry={() => void generate()} /> : null}
        {!loading && !error && output ? (
          <OutputPanel
            title="Meeting Summary"
            copyLabel="Copy Summary"
            value={output}
            onChange={setOutput}
            onRegenerate={() => void generate()}
            onClear={clear}
            regenerating={loading}
          />
        ) : null}
        {!loading && !error && !output ? (
          <EmptyState
            icon={<FileText className="size-5" aria-hidden="true" />}
            message="No summary yet. Paste your meeting notes above and click Summarize Meeting."
          />
        ) : null}
        <ResponsibleAiNotice />
      </div>
    </AppShell>
  );
}
