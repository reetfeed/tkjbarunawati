import { pgTable, text, serial } from "drizzle-orm/pg-core";

export const membersTable = pgTable("members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  photoUrl: text("photo_url"),
  quote: text("quote"),
  bio: text("bio"),
  ambition: text("ambition"),
  bestMemory: text("best_memory"),
  additionalPhotos: text("additional_photos").array(),
});

export type Member = typeof membersTable.$inferSelect;
