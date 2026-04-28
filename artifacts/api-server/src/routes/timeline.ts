import { Router, type IRouter } from "express";
import { db, timelineTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/timeline", async (_req, res): Promise<void> => {
  const events = await db.select().from(timelineTable).orderBy(timelineTable.id);
  res.json(events.map((e) => ({
    id: e.id,
    date: e.date,
    title: e.title,
    description: e.description,
    imageUrl: e.imageUrl ?? undefined,
  })));
});

export default router;
