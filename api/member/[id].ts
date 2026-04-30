import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "../_db";
import { membersTable } from "../schema";
import { eq } from "drizzle-orm";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { id: rawId } = req.query;
    const id = parseInt(Array.isArray(rawId) ? rawId[0] : rawId || "", 10);

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const db = getDb();
    const [member] = await db.select().from(membersTable).where(eq(membersTable.id, id));

    if (!member) {
      res.status(404).json({ error: "Member not found" });
      return;
    }

    res.json({
      id: member.id,
      name: member.name,
      role: member.role,
      photoUrl: member.photoUrl ?? undefined,
      quote: member.quote ?? undefined,
      bio: member.bio ?? undefined,
      ambition: member.ambition ?? undefined,
      bestMemory: member.bestMemory ?? undefined,
      additionalPhotos: member.additionalPhotos ?? [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
