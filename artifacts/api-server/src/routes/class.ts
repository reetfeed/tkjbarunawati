import { Router, type IRouter } from "express";
import { db, membersTable } from "@workspace/db";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/class-info", async (req, res): Promise<void> => {
  const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(membersTable);
  res.json({
    className: "XII IPA 2",
    year: "2024/2025",
    motto: "Bersama kita ukir kenangan, bersama kita raih impian.",
    memberCount: count ?? 0,
  });
});

export default router;
