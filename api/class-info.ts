import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "./_db.js";
import { membersTable } from "./schema/index.js";
import { sql } from "drizzle-orm";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const db = getDb();
    const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(membersTable);
    res.json({
      className: "XII TKJ",
      year: "2023/2026",
      motto: "Bersama kita ukir kenangan, bersama kita raih impian.",
      memberCount: count ?? 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
