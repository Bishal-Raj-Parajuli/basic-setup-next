import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const USER_TYPE_ENUM = pgEnum("user_type", ["USER", "AMDIN"]);
export const USER_STATUS = pgEnum("user_status", ["PENDING", "VERIFIED"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().unique().notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  userType: USER_TYPE_ENUM("user_type").default("USER"),
  status: USER_STATUS("user_status").default("PENDING"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
