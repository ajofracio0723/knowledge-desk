import { GoogleGenerativeAI } from "@google/generative-ai";

function getApiKey() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }
  return apiKey;
}

function getClient() {
  return new GoogleGenerativeAI(getApiKey());
}

export function getChatModelName() {
  // gemini-2.5-flash is blocked for many new API keys; flash-latest stays current
  return process.env.GEMINI_CHAT_MODEL || "gemini-flash-latest";
}

export function getEmbeddingModelName() {
  // text-embedding-004 is retired on many keys; gemini-embedding-001 is current
  return process.env.GEMINI_EMBEDDING_MODEL || "gemini-embedding-001";
}

export function getEmbeddingDimensions() {
  // Gemini embedding models default to 3072; 768 keeps storage lighter for demos
  const raw = process.env.GEMINI_EMBEDDING_DIMENSIONS;
  const parsed = raw ? Number(raw) : 768;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 768;
}

export async function embedText(text: string): Promise<number[]> {
  const apiKey = getApiKey();
  const model = getEmbeddingModelName();
  const outputDimensionality = getEmbeddingDimensions();
  const cleaned = text.replace(/\s+/g, " ").trim();

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:embedContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: `models/${model}`,
        content: { parts: [{ text: cleaned }] },
        outputDimensionality,
      }),
    },
  );

  const json = (await response.json()) as {
    embedding?: { values?: number[] };
    error?: { message?: string };
  };

  if (!response.ok) {
    throw new Error(json.error?.message || `Embedding failed (${response.status})`);
  }

  const values = json.embedding?.values;
  if (!values?.length) {
    throw new Error("Embedding response was empty");
  }

  return values;
}

export async function embedTexts(texts: string[]): Promise<number[][]> {
  const embeddings: number[][] = [];
  // Free tier is happier with sequential / small batches
  for (const text of texts) {
    embeddings.push(await embedText(text));
  }
  return embeddings;
}

export async function generateGroundedAnswer(params: {
  question: string;
  contextBlocks: { title: string; content: string; index: number }[];
}) {
  const client = getClient();
  const model = client.getGenerativeModel({
    model: getChatModelName(),
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 4096,
    },
  });

  const context = params.contextBlocks
    .map(
      (block, i) =>
        `[Source ${i + 1}] ${block.title} (chunk ${block.index + 1})\n${block.content}`,
    )
    .join("\n\n");

  const prompt = `You are Knowledge Desk, an assistant that answers ONLY from the provided sources.

Rules:
- Give a complete, useful answer. Cover the important details from the sources.
- Use short paragraphs or bullet points when that makes the answer clearer.
- Finish your thoughts. Do not stop mid-sentence or mid-list.
- Cite sources inline like [Source 1], [Source 2].
- If the sources do not contain enough information, say what is missing and answer only what the sources support.
- Do not invent facts outside the sources.

SOURCES:
${context || "(no sources retrieved)"}

QUESTION:
${params.question}

ANSWER:`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  if (!text) {
    throw new Error("The model returned an empty answer. Try asking again.");
  }
  return text;
}
