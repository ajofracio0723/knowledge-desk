# Knowledge Desk

**Ask your documents. Get answers with citations.**

Portfolio RAG app with **Turso** (deploy-ready cloud SQLite) and a **local SQLite fallback** for development. Uses free Gemini for embeddings + chat.

---

## Why Turso?

Supabase free projects can pause when idle. Turso is cloud SQLite that stays available for demos and works on Vercel.

| Mode | Database | When |
|------|----------|------|
| Local (no Turso keys) | `.data/knowledge-desk.db` | Quick laptop demos |
| Deploy / shared | Turso cloud | Vercel / public URL |

---

## Stack

| Layer | Choice |
|--------|--------|
| App | Next.js 16 |
| DB | Turso / libSQL (`@libsql/client`) |
| Auth | Cookie sessions (jose + bcrypt) |
| AI | Gemini embeddings + chat |

---

## Setup

```bash
npm install
cp .env.example .env.local
```

### 1. Gemini (required for upload + chat)

1. [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Set `GEMINI_API_KEY` in `.env.local`

### 2. Turso (required for deploy)

1. Sign up free at [turso.tech](https://turso.tech)
2. Install CLI (optional): `curl -sSfL https://get.tur.so/install.sh | bash`
3. Create a DB:

```bash
turso db create knowledge-desk
turso db show knowledge-desk --url
turso db tokens create knowledge-desk
```

4. Put URL + token in `.env.local` as `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`
5. On Vercel, add the same env vars (+ `GEMINI_API_KEY` + `AUTH_SECRET`)

Without Turso keys, the app still runs on a local file DB.

```bash
npm run dev
```

---

## Deploy checklist (Vercel)

1. Push repo to GitHub  
2. Import project in Vercel  
3. Set env vars: `GEMINI_API_KEY`, `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `AUTH_SECRET`  
4. Deploy  

Data lives in Turso (not on the Vercel filesystem).

---

## Sample question

Upload [`sample-docs/refund-policy.md`](./sample-docs/refund-policy.md) and ask:

> What’s the refund window for accessories?
