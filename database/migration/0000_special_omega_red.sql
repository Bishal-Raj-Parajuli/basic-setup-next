CREATE TYPE "public"."user_status" AS ENUM('PENDING', 'VERIFIED');--> statement-breakpoint
CREATE TYPE "public"."user_type" AS ENUM('USER', 'AMDIN');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"user_type" "user_type" DEFAULT 'USER',
	"user_status" "user_status" DEFAULT 'PENDING',
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
