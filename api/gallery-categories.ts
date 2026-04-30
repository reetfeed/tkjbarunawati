import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "./_db";
import { galleryTable } from "./schema";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const db = getDb();
    const rows = await db.selectDistinct({ category: galleryTable.category }).from(galleryTable);
    res.json(rows.map((r) => r.category));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
