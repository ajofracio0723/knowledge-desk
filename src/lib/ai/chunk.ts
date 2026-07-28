const TARGET_CHARS = 900;
const OVERLAP_CHARS = 150;

export function chunkText(raw: string): string[] {
  const text = raw
    .replace(/\r\n/g, "\n")
    .replace(/\t/g, " ")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (!text) return [];

  const paragraphs = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const chunks: string[] = [];
  let current = "";

  const pushCurrent = () => {
    const trimmed = current.trim();
    if (trimmed) chunks.push(trimmed);
    current = "";
  };

  for (const paragraph of paragraphs) {
    if ((current + "\n\n" + paragraph).length <= TARGET_CHARS) {
      current = current ? `${current}\n\n${paragraph}` : paragraph;
      continue;
    }

    if (current) pushCurrent();

    if (paragraph.length <= TARGET_CHARS) {
      current = paragraph;
      continue;
    }

    // Hard-split long paragraphs by sentence-ish boundaries
    const pieces = paragraph.match(/[^.!?\n]+[.!?]?/g) ?? [paragraph];
    for (const piece of pieces) {
      const next = piece.trim();
      if (!next) continue;
      if ((current + " " + next).trim().length <= TARGET_CHARS) {
        current = current ? `${current} ${next}` : next;
      } else {
        pushCurrent();
        if (next.length > TARGET_CHARS) {
          for (let i = 0; i < next.length; i += TARGET_CHARS - OVERLAP_CHARS) {
            chunks.push(next.slice(i, i + TARGET_CHARS).trim());
          }
          current = "";
        } else {
          current = next;
        }
      }
    }
  }

  pushCurrent();

  // Add light overlap for continuity
  if (chunks.length <= 1) return chunks;

  return chunks.map((chunk, i) => {
    if (i === 0) return chunk;
    const prev = chunks[i - 1];
    const overlap = prev.slice(Math.max(0, prev.length - OVERLAP_CHARS));
    return `${overlap}\n${chunk}`.trim();
  });
}

async function extractPdfText(buffer: Buffer): Promise<string> {
  // unpdf is serverless-friendly (no DOMMatrix / canvas requirement for text)
  const { extractText, getDocumentProxy } = await import("unpdf");
  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const result = await extractText(pdf, { mergePages: true });
  return result.text || "";
}

export async function extractTextFromFile(file: File): Promise<string> {
  const type = file.type || "";
  const name = file.name.toLowerCase();

  if (
    type.startsWith("text/") ||
    name.endsWith(".md") ||
    name.endsWith(".txt") ||
    name.endsWith(".csv") ||
    name.endsWith(".json")
  ) {
    return file.text();
  }

  if (type === "application/pdf" || name.endsWith(".pdf")) {
    const buffer = Buffer.from(await file.arrayBuffer());
    return extractPdfText(buffer);
  }

  throw new Error(
    "Unsupported file type. Upload PDF, Markdown, TXT, CSV, or JSON.",
  );
}
