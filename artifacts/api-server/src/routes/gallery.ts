import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, galleryTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/gallery", async (req, res): Promise<void> => {
  const category = req.query.category as string | undefined;
  const photos = category
    ? await db.select().from(galleryTable).where(eq(galleryTable.category, category)).orderBy(galleryTable.createdAt)
    : await db.select().from(galleryTable).orderBy(galleryTable.createdAt);

  res.json(photos.map((p) => ({
    id: p.id,
    imageUrl: p.imageUrl,
    caption: p.caption ?? undefined,
    category: p.category,
    takenAt: p.takenAt ?? undefined,
  })));
});

router.get("/gallery/categories", async (_req, res): Promise<void> => {
  const rows = await db.selectDistinct({ category: galleryTable.category }).from(galleryTable);
  res.json(rows.map((r) => r.category));
});

export default router;
