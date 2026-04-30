import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./api/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
