import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

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

export const insertMemberSchema = createInsertSchema(membersTable).omit({ id: true });
export type InsertMember = z.infer<typeof insertMemberSchema>;
export type Member = typeof membersTable.$inferSelect;
