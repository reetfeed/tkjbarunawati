import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "./_db.js";
import { timelineTable } from "./schema/index.js";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const db = getDb();
    const events = await db.select().from(timelineTable).orderBy(timelineTable.id);
    res.json(
      events.map((e) => ({
        id: e.id,
        date: e.date,
        title: e.title,
        description: e.description,
        imageUrl: e.imageUrl ?? undefined,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
