"use client";

import { useEffect, useRef, useState } from "react";
import {
  FileText,
  LoaderCircle,
  SendHorizontal,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";
import type { ChatMessage, KnowledgeDocument } from "@/lib/types";
import { cn, formatBytes } from "@/lib/utils";

export function DeskApp({
  initialDocuments,
  userEmail,
}: {
  initialDocuments: KnowledgeDocument[];
  userEmail: string;
}) {
  const [documents, setDocuments] =
    useState<KnowledgeDocument[]>(initialDocuments);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Upload a PDF or text file, then ask a question. I’ll answer from your documents and show citations.",
    },
  ]);
  const [question, setQuestion] = useState("");
  const [uploading, setUploading] = useState(false);
  const [asking, setAsking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, asking]);

  async function refreshDocuments() {
    const res = await fetch("/api/documents");
    if (!res.ok) return;
    const data = await res.json();
    setDocuments(data.documents ?? []);
  }

  async function onUpload(file: File) {
    setError(null);
    setUploading(true);

    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/documents", {
      method: "POST",
      body: form,
    });

    const data = await res.json().catch(() => ({}));
    setUploading(false);

    if (!res.ok) {
      setError(data.error || "Upload failed");
      return;
    }

    await refreshDocuments();
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `Indexed “${data.document.title}” into ${data.document.chunk_count} chunks. Ask me anything about it.`,
      },
    ]);
  }

  async function onDelete(id: string) {
    setError(null);
    const res = await fetch(`/api/documents/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Delete failed");
      return;
    }
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  }

  async function onAsk(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed || asking) return;

    setError(null);
    setQuestion("");
    setAsking(true);
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: trimmed },
    ]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: trimmed }),
    });

    const data = await res.json().catch(() => ({}));
    setAsking(false);

    if (!res.ok) {
      setError(data.error || "Chat failed");
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "I couldn’t answer that just now. Check your Gemini key and that at least one document is ready.",
        },
      ]);
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.answer,
        citations: data.citations,
      },
    ]);
  }

  const readyCount = documents.filter((d) => d.status === "ready").length;

  return (
    <div className="mx-auto grid min-h-[calc(100vh-4.5rem)] w-full max-w-7xl gap-4 px-4 pb-6 pt-2 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-6">
      <aside className="flex flex-col rounded-2xl border border-line/80 bg-white/70 p-4 shadow-[0_20px_60px_-40px_rgba(11,18,32,0.45)] backdrop-blur">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.18em] text-ink/45">
            Library
          </p>
          <h2 className="mt-1 font-[family-name:var(--font-fraunces)] text-2xl text-ink">
            Your documents
          </h2>
          <p className="mt-1 text-sm text-ink/55">
            {readyCount} ready · signed in as {userEmail}
          </p>
        </div>

        <input
          ref={fileRef}
          type="file"
          className="hidden"
          accept=".pdf,.txt,.md,.csv,.json,text/plain,application/pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void onUpload(file);
            e.target.value = "";
          }}
        />

        <button
          type="button"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className="mb-4 flex items-center justify-center gap-2 rounded-xl border border-dashed border-teal/40 bg-teal/5 px-3 py-3 text-sm font-semibold text-teal-deep transition hover:bg-teal/10 disabled:opacity-60"
        >
          {uploading ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Upload className="size-4" />
          )}
          {uploading ? "Indexing…" : "Upload PDF / text"}
        </button>

        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
          {documents.length === 0 ? (
            <div className="rounded-xl border border-line bg-mist/60 px-3 py-4 text-sm text-ink/60">
              No documents yet. Try a short product FAQ or README.
            </div>
          ) : (
            documents.map((doc) => (
              <div
                key={doc.id}
                className="group rounded-xl border border-line bg-white px-3 py-3"
              >
                <div className="flex items-start gap-2">
                  <FileText className="mt-0.5 size-4 shrink-0 text-teal" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">
                      {doc.title}
                    </p>
                    <p className="mt-0.5 text-xs text-ink/50">
                      {doc.status === "ready"
                        ? `${doc.chunk_count} chunks`
                        : doc.status}
                      {doc.error_message ? ` · ${doc.error_message}` : ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => void onDelete(doc.id)}
                    className="rounded-lg p-1.5 text-ink/35 transition hover:bg-danger/5 hover:text-danger"
                    aria-label={`Delete ${doc.title}`}
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>

      <section className="flex min-h-[70vh] flex-col rounded-2xl border border-line/80 bg-white/75 shadow-[0_24px_70px_-45px_rgba(11,18,32,0.5)] backdrop-blur lg:min-h-0">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3 sm:px-5">
          <Sparkles className="size-4 text-amber" />
          <div>
            <h1 className="font-[family-name:var(--font-fraunces)] text-lg text-ink">
              Desk chat
            </h1>
            <p className="text-xs text-ink/50">
              Grounded answers with source citations
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-3xl animate-rise",
                message.role === "user" ? "ml-auto" : "mr-auto",
              )}
            >
              <div
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  message.role === "user"
                    ? "bg-ink text-paper"
                    : "border border-line bg-mist/70 text-ink",
                )}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>

              {message.citations && message.citations.length > 0 && (
                <div className="mt-2 space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/40">
                    Sources
                  </p>
                  {message.citations.map((citation, index) => (
                    <details
                      key={`${message.id}-${citation.documentId}-${citation.chunkIndex}-${index}`}
                      className="rounded-xl border border-amber/20 bg-amber/5 px-3 py-2"
                    >
                      <summary className="cursor-pointer text-xs font-medium text-amber">
                        [{index + 1}] {citation.documentTitle} · chunk{" "}
                        {citation.chunkIndex + 1} ·{" "}
                        {Math.round(citation.similarity * 100)}% match
                      </summary>
                      <p className="mt-2 text-xs leading-relaxed text-ink/70">
                        {citation.content}
                      </p>
                    </details>
                  ))}
                </div>
              )}
            </div>
          ))}

          {asking && (
            <div className="mr-auto flex items-center gap-1.5 rounded-2xl border border-line bg-mist/70 px-4 py-3">
              <span className="typing-dot size-1.5 rounded-full bg-ink/50" />
              <span className="typing-dot size-1.5 rounded-full bg-ink/50" />
              <span className="typing-dot size-1.5 rounded-full bg-ink/50" />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {error && (
          <p className="mx-4 mb-2 rounded-xl border border-danger/20 bg-danger/5 px-3 py-2 text-sm text-danger sm:mx-5">
            {error}
          </p>
        )}

        <form
          onSubmit={onAsk}
          className="border-t border-line p-3 sm:p-4"
        >
          <div className="flex items-end gap-2 rounded-2xl border border-line bg-white p-2 shadow-sm focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/15">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={2}
              placeholder={
                readyCount
                  ? "Ask about your documents…"
                  : "Upload a document first, then ask…"
              }
              className="max-h-40 min-h-[52px] flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void onAsk(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={asking || !question.trim()}
              className="inline-flex size-11 items-center justify-center rounded-xl bg-ink text-paper transition hover:bg-teal-deep disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send"
            >
              <SendHorizontal className="size-4" />
            </button>
          </div>
          <p className="mt-2 px-1 text-[11px] text-ink/40">
            Tip: keep demo files under {formatBytes(8 * 1024 * 1024)}. Free Gemini
            + Supabase quotas apply.
          </p>
        </form>
      </section>
    </div>
  );
}
