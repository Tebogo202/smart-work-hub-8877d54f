import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Send, Sparkles, User, Loader2, RefreshCw, Copy } from "lucide-react";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/app-shell";
import { PrivacyNote, ResponsibleAiNotice } from "@/components/ai-output";
import { chatWithAssistant } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Workplace Assistant | Chat" },
      {
        name: "description",
        content:
          "Chat with an AI assistant about workplace productivity, professional communication, meeting prep and task organization.",
      },
      { property: "og:title", content: "AI Workplace Assistant" },
      {
        property: "og:description",
        content: "Your AI assistant for everyday workplace productivity.",
      },
    ],
  }),
  component: Assistant,
});

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Help me write a professional email.",
  "How can I prioritize my tasks?",
  "Help me prepare for a meeting.",
  "How can I communicate with a difficult customer?",
];

function Assistant() {
  const send = useServerFn(chatWithAssistant);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  const ask = async (text: string, history?: Message[]) => {
    const base = history ?? messages;
    const next: Message[] = [...base, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);
    try {
      const result = await send({ data: { messages: next } });
      setMessages([...next, { role: "assistant", content: result.text }]);
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const retry = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    const history = messages.slice(0, messages.lastIndexOf(lastUser));
    void ask(lastUser.content, history);
  };

  const submit = () => {
    if (!input.trim()) {
      toast.error("Please enter a question before sending.");
      return;
    }
    void ask(input.trim());
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Could not copy. Please select the text and copy manually.");
    }
  };

  return (
    <AppShell>
      <PageHeader
        title="AI Workplace Assistant"
        subtitle="Your AI assistant for everyday workplace productivity."
      />

      <section aria-label="Conversation" className="surface-card flex flex-col overflow-hidden">
        <div className="min-h-[340px] flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
          {messages.length === 0 && !loading ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center">
              <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Sparkles className="size-5" aria-hidden="true" />
              </span>
              <p className="max-w-sm text-sm text-muted-foreground">
                No messages yet. Ask a question below or pick a suggested prompt to get started.
              </p>
            </div>
          ) : null}

          {messages.map((m, i) => (
            <article
              key={i}
              className={
                m.role === "user"
                  ? "animate-fade-rise ml-auto flex max-w-[85%] gap-3"
                  : "animate-fade-rise flex max-w-[92%] gap-3"
              }
            >
              <span
                className={
                  m.role === "user"
                    ? "order-2 grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground"
                    : "grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground"
                }
                aria-hidden="true"
              >
                {m.role === "user" ? <User className="size-4" /> : <Sparkles className="size-4" />}
              </span>
              <div
                className={
                  m.role === "user"
                    ? "rounded-xl bg-secondary px-4 py-3 text-sm text-secondary-foreground"
                    : "group rounded-xl border border-border bg-card px-4 py-3"
                }
              >
                <span className="sr-only">{m.role === "user" ? "You said:" : "Assistant said:"}</span>
                {m.role === "user" ? (
                  <p className="break-words whitespace-pre-wrap">{m.content}</p>
                ) : (
                  <>
                    <div className="prose-ai max-w-none text-sm break-words">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                    </div>
                    <button
                      type="button"
                      onClick={() => void copy(m.content)}
                      className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Copy className="size-3.5" aria-hidden="true" /> Copy
                    </button>
                  </>
                )}
              </div>
            </article>
          ))}

          {loading ? (
            <div role="status" aria-live="polite" className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin text-primary" aria-hidden="true" />
              AI is thinking...
            </div>
          ) : null}

          {error ? (
            <div role="alert" className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm">
              <p className="font-medium">Something went wrong while generating your response.</p>
              <p className="mt-1 text-muted-foreground">{error}</p>
              <Button size="sm" variant="outline" className="mt-3" onClick={retry}>
                <RefreshCw className="size-4" aria-hidden="true" /> Try Again
              </Button>
            </div>
          ) : null}

          <div ref={endRef} />
        </div>

        <div className="space-y-3 border-t border-border bg-muted/40 p-4 sm:p-5">
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                disabled={loading}
                onClick={() => void ask(s)}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-end gap-2">
            <Textarea
              aria-label="Message the AI assistant"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit();
                }
              }}
              placeholder="Ask about emails, meetings, priorities or workplace communication..."
              className="max-h-40 min-h-12 flex-1 resize-none bg-card"
            />
            <Button onClick={submit} disabled={loading} aria-label="Send message" className="h-12">
              {loading ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="size-4" aria-hidden="true" />
              )}
              <span className="hidden sm:inline">Send</span>
            </Button>
          </div>

          <PrivacyNote />
        </div>
      </section>

      <div className="mt-6">
        <ResponsibleAiNotice />
      </div>
    </AppShell>
  );
}
