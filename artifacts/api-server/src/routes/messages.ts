import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { db, messagesTable } from "@workspace/db";
import { CreateMessageBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/messages", async (_req, res): Promise<void> => {
  const msgs = await db.select().from(messagesTable).orderBy(desc(messagesTable.createdAt));
  res.json(msgs.map((m) => ({
    id: m.id,
    authorName: m.authorName,
    content: m.content,
    createdAt: m.createdAt.toISOString(),
  })));
});

router.post("/messages", async (req, res): Promise<void> => {
  const parsed = CreateMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [msg] = await db.insert(messagesTable).values({
    authorName: parsed.data.authorName,
    content: parsed.data.content,
  }).returning();

  res.status(201).json({
    id: msg.id,
    authorName: msg.authorName,
    content: msg.content,
    createdAt: msg.createdAt.toISOString(),
  });
});

export default router;
