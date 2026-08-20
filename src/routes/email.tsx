import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Wand2 } from "lucide-react";
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
import { usePreferences } from "@/hooks/use-preferences";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Generate clear, professional workplace emails from a purpose, key points, tone and length in seconds.",
      },
      { property: "og:title", content: "Smart Email Generator" },
      {
        property: "og:description",
        content: "Create clear and professional workplace emails with AI.",
      },
    ],
  }),
  component: EmailGenerator,
});

const TONES = ["Formal", "Friendly", "Persuasive", "Professional", "Apologetic"];
const LENGTHS = ["Short", "Medium", "Detailed"];

function EmailGenerator() {
  const { preferences } = usePreferences();
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [tone, setTone] = useState(preferences.tone);
  const [length, setLength] = useState(preferences.length);
  const [validation, setValidation] = useState<string | null>(null);

  const { output, setOutput, loading, error, generate, clear } = useAiGeneration("email");

  const submit = () => {
    if (!purpose.trim()) {
      setValidation("Please describe the purpose of your email before generating.");
      return;
    }
    setValidation(null);
    void generate({ purpose, recipient, keyPoints, tone, length });
  };

  return (
    <AppShell>
      <PageHeader
        title="Smart Email Generator"
        subtitle="Create clear and professional workplace emails with AI."
      />

      <section aria-label="Email details" className="surface-card space-y-5 p-5 sm:p-6">
        <div className="space-y-2">
          <Label htmlFor="purpose">Email Purpose</Label>
          <Textarea
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Example: I need to request a meeting with my manager to discuss my project progress."
            className="min-h-24"
            aria-describedby="purpose-help"
          />
          <p id="purpose-help" className="text-xs text-muted-foreground">
            Explain what the email is about.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient (optional)</Label>
          <Input
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Example: Manager, HR Manager, Client"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="keyPoints">Key Points</Label>
          <Textarea
            id="keyPoints"
            value={keyPoints}
            onChange={(e) => setKeyPoints(e.target.value)}
            placeholder="Enter the important information that must be included."
            className="min-h-24"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger id="tone" className="w-full">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                {TONES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="length">Length</Label>
            <Select value={length} onValueChange={setLength}>
              <SelectTrigger id="length" className="w-full">
                <SelectValue placeholder="Select length" />
              </SelectTrigger>
              <SelectContent>
                {LENGTHS.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <PrivacyNote />

        {validation ? (
          <p role="alert" className="text-sm font-medium text-destructive">
            {validation}
          </p>
        ) : null}

        <Button onClick={submit} disabled={loading} className="w-full sm:w-auto">
          <Wand2 className="size-4" aria-hidden="true" />
          {loading ? "Generating..." : "Generate Email"}
        </Button>
      </section>

      <div className="mt-6 space-y-6">
        {loading ? <LoadingPanel /> : null}
        {!loading && error ? <ErrorPanel message={error} onRetry={() => void generate()} /> : null}
        {!loading && !error && output ? (
          <OutputPanel
            title="Generated Email"
            value={output}
            onChange={setOutput}
            onRegenerate={() => void generate()}
            onClear={clear}
            regenerating={loading}
          />
        ) : null}
        {!loading && !error && !output ? (
          <EmptyState
            icon={<Mail className="size-5" aria-hidden="true" />}
            message="No email generated yet. Enter your email details above and click Generate Email."
          />
        ) : null}
        <ResponsibleAiNotice />
      </div>
    </AppShell>
  );
}
