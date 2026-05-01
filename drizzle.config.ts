import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./api/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    // Gunakan DIRECT_URL (port 5432) untuk migrations/push
    // Gunakan DATABASE_URL (port 6543) untuk runtime
    url: process.env.DIRECT_URL || process.env.DATABASE_URL!,
  },
});
