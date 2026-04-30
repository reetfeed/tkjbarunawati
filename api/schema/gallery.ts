import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";

export const galleryTable = pgTable("gallery", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
  category: text("category").notNull(),
  takenAt: text("taken_at"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Gallery = typeof galleryTable.$inferSelect;
