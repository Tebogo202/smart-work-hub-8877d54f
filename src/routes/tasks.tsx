import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarCheck, Wand2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "AI Task Planner | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Turn a list of tasks into a prioritized, time-blocked work plan that respects your available working hours.",
      },
      { property: "og:title", content: "AI Task Planner" },
      {
        property: "og:description",
        content: "Turn your tasks into an organized and prioritized work plan.",
      },
    ],
  }),
  component: TaskPlanner,
});

const PLACEHOLDER = `Finish monthly report
Reply to client emails
Prepare presentation
Attend team meeting
Review project proposal`;

function TaskPlanner() {
  const [tasks, setTasks] = useState("");
  const [period, setPeriod] = useState("Today");
  const [hours, setHours] = useState("");
  const [preference, setPreference] = useState("Balanced");
  const [validation, setValidation] = useState<string | null>(null);
  const { output, setOutput, loading, error, generate, clear } = useAiGeneration("tasks");

  const submit = () => {
    if (!tasks.trim()) {
      setValidation("Please enter at least one task before creating your plan.");
      return;
    }
    setValidation(null);
    void generate({ tasks, period, hours, preference });
  };

  return (
    <AppShell>
      <PageHeader
        title="AI Task Planner"
        subtitle="Turn your tasks into an organized and prioritized work plan."
      />

      <section aria-label="Task details" className="surface-card space-y-5 p-5 sm:p-6">
        <div className="space-y-2">
          <Label htmlFor="tasks">Tasks</Label>
          <Textarea
            id="tasks"
            value={tasks}
            onChange={(e) => setTasks(e.target.value)}
            placeholder={PLACEHOLDER}
            className="min-h-40"
            aria-describedby="tasks-help"
          />
          <p id="tasks-help" className="text-xs text-muted-foreground">
            Enter one task per line.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="period">Planning Period</Label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger id="period" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Today">Today</SelectItem>
                <SelectItem value="This Week">This Week</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hours">Available Working Hours</Label>
            <Input
              id="hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="Example: 08:00 - 17:00"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="preference">Priority Preference</Label>
            <Select value={preference} onValueChange={setPreference}>
              <SelectTrigger id="preference" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Balanced">Balanced</SelectItem>
                <SelectItem value="Urgent First">Urgent First</SelectItem>
                <SelectItem value="Important First">Important First</SelectItem>
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
          {loading ? "Planning..." : "Create My Plan"}
        </Button>
      </section>

      <div className="mt-6 space-y-6">
        {loading ? <LoadingPanel label="AI is building your plan..." /> : null}
        {!loading && error ? <ErrorPanel message={error} onRetry={() => void generate()} /> : null}
        {!loading && !error && output ? (
          <OutputPanel
            title="Your Work Plan"
            value={output}
            onChange={setOutput}
            onRegenerate={() => void generate()}
            onClear={clear}
            regenerating={loading}
          />
        ) : null}
        {!loading && !error && !output ? (
          <EmptyState
            icon={<CalendarCheck className="size-5" aria-hidden="true" />}
            message="No plan created yet. Add your tasks above and click Create My Plan."
          />
        ) : null}
        <ResponsibleAiNotice />
      </div>
    </AppShell>
  );
}
