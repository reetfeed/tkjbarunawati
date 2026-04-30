import { pgTable, text, serial } from "drizzle-orm/pg-core";

export const timelineTable = pgTable("timeline", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
});

export type Timeline = typeof timelineTable.$inferSelect;
