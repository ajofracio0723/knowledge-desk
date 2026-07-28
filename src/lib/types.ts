export type DocumentStatus = "processing" | "ready" | "error";

export type KnowledgeDocument = {
  id: string;
  title: string;
  file_name: string;
  file_type: string;
  status: DocumentStatus;
  error_message: string | null;
  chunk_count: number;
  created_at: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};
