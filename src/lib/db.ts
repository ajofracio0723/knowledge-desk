import fs from "node:fs";
import path from "node:path";
import { createClient, type Client } from "@libsql/client";

const DATA_DIR = path.join(process.cwd(), ".data");
const UPLOADS_DIR = path.join(DATA_DIR, "uploads");

let client: Client | null = null;
let schemaReady: Promise<void> | null = null;

export function getDataDir() {
  return DATA_DIR;
}

export function getUploadsDir() {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  return UPLOADS_DIR;
}

export function isTursoConfigured() {
  return Boolean(process.env.TURSO_DATABASE_URL);
}

function createDbClient() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (url) {
    return createClient({ url, authToken });
  }

  // Local fallback for development without Turso
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const localPath = path.join(DATA_DIR, "knowledge-desk.db");
  return createClient({ url: `file:${localPath}` });
}

export async function getDb() {
  if (!client) {
    client = createDbClient();
  }

  if (!schemaReady) {
    schemaReady = ensureSchema(client);
  }
  await schemaReady;

  return client;
}

async function ensureSchema(db: Client) {
  await db.executeMultiple(`
    create table if not exists users (
      id text primary key,
      email text not null unique,
      password_hash text not null,
      created_at text not null default (datetime('now'))
    );

    create table if not exists documents (
      id text primary key,
      user_id text not null references users(id) on delete cascade,
      title text not null,
      file_name text not null,
      file_type text not null,
      storage_path text,
      status text not null default 'processing'
        check (status in ('processing', 'ready', 'error')),
      error_message text,
      chunk_count integer not null default 0,
      created_at text not null default (datetime('now'))
    );

    create table if not exists chunks (
      id text primary key,
      document_id text not null references documents(id) on delete cascade,
      user_id text not null references users(id) on delete cascade,
      content text not null,
      chunk_index integer not null,
      embedding text not null,
      created_at text not null default (datetime('now'))
    );

    create index if not exists documents_user_id_idx on documents(user_id);
    create index if not exists chunks_document_id_idx on chunks(document_id);
    create index if not exists chunks_user_id_idx on chunks(user_id);
  `);
}

export type DbUser = {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
};

export type DbDocument = {
  id: string;
  user_id: string;
  title: string;
  file_name: string;
  file_type: string;
  storage_path: string | null;
  status: "processing" | "ready" | "error";
  error_message: string | null;
  chunk_count: number;
  created_at: string;
};

export type DbChunk = {
  id: string;
  document_id: string;
  user_id: string;
  content: string;
  chunk_index: number;
  embedding: string;
  created_at: string;
};

export function mapDocument(row: Record<string, unknown>): DbDocument {
  return {
    id: String(row.id),
    user_id: String(row.user_id),
    title: String(row.title),
    file_name: String(row.file_name),
    file_type: String(row.file_type),
    storage_path: (row.storage_path as string | null) ?? null,
    status: row.status as DbDocument["status"],
    error_message: (row.error_message as string | null) ?? null,
    chunk_count: Number(row.chunk_count ?? 0),
    created_at: String(row.created_at),
  };
}
