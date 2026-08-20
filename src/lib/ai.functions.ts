import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { runGeneration, runChat } from "./ai.server";

const GenerateInput = z.object({
  mode: z.enum(["email", "meeting", "tasks"]),
  fields: z.record(z.string()),
});

const ChatInput = z.object({
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1) }))
    .min(1)
    .max(40),
});

export const generateContent = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => GenerateInput.parse(input))
  .handler(async ({ data }) => runGeneration(data.mode, data.fields));

export const chatWithAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) => runChat(data.messages));
