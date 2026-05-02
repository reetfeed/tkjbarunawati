import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "./_db.js";
import { galleryTable } from "./schema/index.js";
import { eq } from "drizzle-orm";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const db = getDb();
    const category = req.query.category as string | undefined;

    const photos = category
      ? await db.select().from(galleryTable).where(eq(galleryTable.category, category)).orderBy(galleryTable.createdAt)
      : await db.select().from(galleryTable).orderBy(galleryTable.createdAt);

    res.json(
      photos.map((p) => ({
        id: p.id,
        imageUrl: p.imageUrl,
        caption: p.caption ?? undefined,
        category: p.category,
        takenAt: p.takenAt ?? undefined,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
