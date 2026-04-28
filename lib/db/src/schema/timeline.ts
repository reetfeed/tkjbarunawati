import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const timelineTable = pgTable("timeline", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
});

export const insertTimelineSchema = createInsertSchema(timelineTable).omit({ id: true });
export type InsertTimeline = z.infer<typeof insertTimelineSchema>;
export type Timeline = typeof timelineTable.$inferSelect;
