// Make sure to install the 'postgres' package
import { config } from "@/lib/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(config.env.databaseUrl);
const db = drizzle({ client: queryClient });

export default db;
