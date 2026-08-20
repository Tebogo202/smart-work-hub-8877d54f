import { callGateway, type ChatMessage } from "./ai-gateway.server";
import { SYSTEM_PROMPTS, CHAT_SYSTEM_PROMPT, buildUserPrompt, type AiMode } from "./prompts";

export async function runGeneration(mode: AiMode, fields: Record<string, string>) {
  const text = await callGateway([
    { role: "system", content: SYSTEM_PROMPTS[mode] },
    { role: "user", content: buildUserPrompt(mode, fields) },
  ]);
  return { text };
}

export async function runChat(messages: Array<{ role: "user" | "assistant"; content: string }>) {
  const payload: ChatMessage[] = [{ role: "system", content: CHAT_SYSTEM_PROMPT }, ...messages];
  const text = await callGateway(payload);
  return { text };
}
