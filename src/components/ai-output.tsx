import { useState, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check, RefreshCw, Pencil, Trash2, Eye, Loader2, AlertTriangle, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function PrivacyNote() {
  return (
    <p className="flex items-start gap-2 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
      <ShieldAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
      Do not enter confidential company information, passwords, financial information or other
      sensitive personal data.
    </p>
  );
}

export function ResponsibleAiNotice() {
  return (
    <aside
      aria-label="Responsible AI notice"
      className="rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm"
    >
      <p className="font-display font-semibold">Responsible AI Notice</p>
      <p className="mt-1 text-muted-foreground">
        AI-generated content may contain mistakes or inaccurate information. Always review and
        verify AI-generated content before using it for important workplace communications,
        decisions or actions.
      </p>
    </aside>
  );
}

export function LoadingPanel({ label = "AI is thinking..." }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="surface-card animate-fade-rise flex flex-col items-center gap-3 p-10 text-center"
    >
      <Loader2 className="size-7 animate-spin text-primary" aria-hidden="true" />
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xs text-muted-foreground">This usually takes a few seconds.</p>
    </div>
  );
}

export function ErrorPanel({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div role="alert" className="surface-card animate-fade-rise border-destructive/40 p-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 size-5 text-destructive" aria-hidden="true" />
        <div>
          <p className="font-medium">Something went wrong while generating your response.</p>
          <p className="mt-1 text-sm text-muted-foreground">{message}</p>
          <Button className="mt-4" variant="outline" onClick={onRetry}>
            <RefreshCw className="size-4" aria-hidden="true" /> Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}

export function EmptyState({ icon, message }: { icon: ReactNode; message: string }) {
  return (
    <div className="surface-card flex flex-col items-center gap-3 border-dashed p-10 text-center">
      <span className="grid size-11 place-items-center rounded-xl bg-muted text-muted-foreground">
        {icon}
      </span>
      <p className="max-w-sm text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

type OutputPanelProps = {
  title: string;
  value: string;
  onChange: (value: string) => void;
  onRegenerate: () => void;
  onClear: () => void;
  regenerating?: boolean;
  copyLabel?: string;
};

export function OutputPanel({
  title,
  value,
  onChange,
  onRegenerate,
  onClear,
  regenerating,
  copyLabel = "Copy",
}: OutputPanelProps) {
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy. Please select the text and copy manually.");
    }
  };

  return (
    <section aria-label={title} className="surface-card animate-fade-rise overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <h2 className="font-display text-base font-semibold">{title}</h2>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={copy}>
            {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
            {copyLabel}
          </Button>
          <Button size="sm" variant="outline" onClick={onRegenerate} disabled={regenerating}>
            <RefreshCw className={regenerating ? "size-4 animate-spin" : "size-4"} aria-hidden="true" />
            Regenerate
          </Button>
          <Button size="sm" variant="outline" onClick={() => setEditing((v) => !v)}>
            {editing ? <Eye className="size-4" aria-hidden="true" /> : <Pencil className="size-4" aria-hidden="true" />}
            {editing ? "Preview" : "Edit"}
          </Button>
          <Button size="sm" variant="ghost" onClick={onClear}>
            <Trash2 className="size-4" aria-hidden="true" /> Clear
          </Button>
        </div>
      </div>

      <div className="p-5">
        {editing ? (
          <Textarea
            aria-label={`Edit ${title}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[420px] font-mono text-sm"
          />
        ) : (
          <div className="prose-ai max-w-none text-sm break-words">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
          </div>
        )}
      </div>
    </section>
  );
}
