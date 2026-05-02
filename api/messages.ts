import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "./_db.js";
import { messagesTable } from "./schema/index.js";
import { desc } from "drizzle-orm";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const db = getDb();

    if (req.method === "GET") {
      const msgs = await db.select().from(messagesTable).orderBy(desc(messagesTable.createdAt));
      res.json(
        msgs.map((m) => ({
          id: m.id,
          authorName: m.authorName,
          content: m.content,
          createdAt: m.createdAt.toISOString(),
        }))
      );
      return;
    }

    if (req.method === "POST") {
      const { authorName, content } = req.body || {};

      if (!authorName || !content) {
        res.status(400).json({ error: "authorName and content are required" });
        return;
      }

      const [msg] = await db
        .insert(messagesTable)
        .values({ authorName, content })
        .returning();

      res.status(201).json({
        id: msg.id,
        authorName: msg.authorName,
        content: msg.content,
        createdAt: msg.createdAt.toISOString(),
      });
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
