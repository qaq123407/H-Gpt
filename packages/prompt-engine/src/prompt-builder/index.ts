import type { PromptTemplate } from "../templates";

export function buildPrompt(template: PromptTemplate, values: Record<string, string>) {
  return template.variables.reduce((content, key) => {
    return content.replaceAll(`{{${key}}}`, values[key] ?? "");
  }, template.content);
}
