import { defineConfig } from "drizzle-kit";
import { config } from "./lib/config";
export default defineConfig({
  out: "./database/migration",
  schema: "./database/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: config.env.databaseUrl,
  },
});
