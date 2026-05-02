import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

export function getDb() {
  // Supabase + Vercel integration uses POSTGRES_URL, not DATABASE_URL
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL or POSTGRES_URL environment variable is required");
  }
  const client = postgres(connectionString, { prepare: false });
  return drizzle(client, { schema });
}
