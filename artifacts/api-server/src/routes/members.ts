import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, membersTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/members", async (_req, res): Promise<void> => {
  const members = await db.select().from(membersTable).orderBy(membersTable.name);
  res.json(members.map((m) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    photoUrl: m.photoUrl ?? undefined,
    quote: m.quote ?? undefined,
  })));
});

router.get("/members/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

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
});

export default router;
