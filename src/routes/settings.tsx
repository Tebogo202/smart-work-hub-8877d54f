import { createFileRoute, Link } from "@tanstack/react-router";
import { Moon, Sun, ShieldCheck, ArrowRight } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { usePreferences } from "@/hooks/use-preferences";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings | AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Choose light or dark appearance and set your default AI email tone and response length.",
      },
      { property: "og:title", content: "Settings" },
      {
        property: "og:description",
        content: "Appearance and AI preferences for your workplace assistant.",
      },
    ],
  }),
  component: SettingsPage;
});

function SettingsPage() {
  const { preferences, update } = usePreferences();

  return (
    <AppShell>
      <PageHeader title="Settings" subtitle="Personalize the assistant to match how you work." />

      <div className="space-y-6">
        <section aria-label="Appearance" className="surface-card p-5 sm:p-6">
          <h2 className="font-display text-base font-semibold">Appearance</h2>
          <p className="mt-1 text-sm text-muted-foreground">Choose how the interface looks.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              variant={preferences.theme === "light" ? "default" : "outline"}
              onClick={() => update({ theme: "light" })}
              aria-pressed={preferences.theme === "light"}
            >
              <Sun className="size-4" aria-hidden="true" /> Light mode
            </Button>
            <Button
              variant={preferences.theme === "dark" ? "default" : "outline"}
              onClick={() => update({ theme: "dark" })}
              aria-pressed={preferences.theme === "dark"}
            >
              <Moon className="size-4" aria-hidden="true" /> Dark mode
            </Button>
          </div>
        </section>

        <section aria-label="AI preferences" className="surface-card p-5 sm:p-6">
          <h2 className="font-display text-base font-semibold">AI Preferences</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Defaults applied when you open the Email Generator.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="default-tone">Default email tone</Label>
              <Select value={preferences.tone} onValueChange={(tone) => update({ tone })}>
                <SelectTrigger id="default-tone" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Formal", "Friendly", "Persuasive", "Professional", "Apologetic"].map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="default-length">Default response length</Label>
              <Select value={preferences.length} onValueChange={(length) => update({ length })}>
                <SelectTrigger id="default-length" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Short", "Medium", "Detailed"].map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section aria-label="Responsible AI" className="surface-card p-5 sm:p-6">
          <h2 className="font-display flex items-center gap-2 text-base font-semibold">
            <ShieldCheck className="size-4.5 text-primary" aria-hidden="true" /> Responsible AI
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Read how to review AI output and protect sensitive workplace information.
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/responsible-ai">
              Responsible AI guidance <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </section>
      </div>
    </AppShell>
  );
}
