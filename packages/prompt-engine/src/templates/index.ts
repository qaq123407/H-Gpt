export type PromptTemplate = {
  id: string;
  content: string;
  variables: string[];
};

export const systemAssistantTemplate: PromptTemplate = {
  id: "system-assistant",
  content: "You are a helpful assistant for {{productName}}.",
  variables: ["productName"]
};
