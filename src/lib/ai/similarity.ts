export function cosineSimilarity(a: number[], b: number[]) {
  if (a.length !== b.length || a.length === 0) return 0;

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export type RankedChunk = {
  id: string;
  document_id: string;
  content: string;
  chunk_index: number;
  similarity: number;
  document_title: string;
};

export function rankChunksBySimilarity(params: {
  queryEmbedding: number[];
  chunks: {
    id: string;
    document_id: string;
    content: string;
    chunk_index: number;
    embedding: number[];
    document_title: string;
  }[];
  matchCount?: number;
  matchThreshold?: number;
}): RankedChunk[] {
  const matchCount = params.matchCount ?? 6;
  const matchThreshold = params.matchThreshold ?? 0.45;

  return params.chunks
    .map((chunk) => ({
      id: chunk.id,
      document_id: chunk.document_id,
      content: chunk.content,
      chunk_index: chunk.chunk_index,
      document_title: chunk.document_title,
      similarity: cosineSimilarity(params.queryEmbedding, chunk.embedding),
    }))
    .filter((chunk) => chunk.similarity >= matchThreshold)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, matchCount);
}
