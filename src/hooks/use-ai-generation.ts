import { useCallback, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { generateContent } from "@/lib/ai.functions";

type Mode = "email" | "meeting" | "tasks";

export function useAiGeneration(mode: Mode) {
  const run = useServerFn(generateContent);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastFields = useRef<Record<string, string> | null>(null);

  const generate = useCallback(
    async (fields?: Record<string, string>) => {
      const payload = fields ?? lastFields.current;
      if (!payload) return;
      lastFields.current = payload;
      setLoading(true);
      setError(null);
      try {
        const result = await run({ data: { mode, fields: payload } });
        setOutput(result.text);
      } catch (err) {
        setError(
          err instanceof Error && err.message
            ? err.message
            : "Please check your connection and try again.",
        );
      } finally {
        setLoading(false);
      }
    },
    [mode, run],
  );

  const clear = useCallback(() => {
    setOutput("");
    setError(null);
  }, []);

  return { output, setOutput, loading, error, generate, clear, hasRun: lastFields.current !== null };
}
