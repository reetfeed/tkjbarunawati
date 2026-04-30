import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "./_db";
import { membersTable } from "./schema";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const db = getDb();
    const members = await db.select().from(membersTable).orderBy(membersTable.name);
    res.json(
      members.map((m) => ({
        id: m.id,
        name: m.name,
        role: m.role,
        photoUrl: m.photoUrl ?? undefined,
        quote: m.quote ?? undefined,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
