-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "forum_users" (
	"id" text PRIMARY KEY NOT NULL,
	"username" varchar(50) NOT NULL,
	"email" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "forum_users_username_unique" UNIQUE("username"),
	CONSTRAINT "forum_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "forum_course_ratings" (
	"course_id" varchar(50) NOT NULL,
	"user_id" text NOT NULL,
	"grade" numeric(5, 2) NOT NULL,
	"exam_difficulty" numeric(3, 2) NOT NULL,
	"exam_comment" text DEFAULT '',
	"assignment_difficulty" numeric(3, 2) NOT NULL,
	"assignment_comment" text DEFAULT '',
	"interest_level" numeric(3, 2) NOT NULL,
	"interest_comment" text DEFAULT '',
	"overall_score" numeric(3, 2) NOT NULL,
	"overall_comment" text DEFAULT '',
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "unique_course_user_ranking" UNIQUE("course_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "forum_courses" (
	"id" varchar(50) PRIMARY KEY DEFAULT '00000' NOT NULL,
	"title_en" varchar(256) NOT NULL,
	"title_he" varchar(256) NOT NULL,
	"description_en" text NOT NULL,
	"description_he" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"level" varchar(50) NOT NULL,
	"credit_points" integer NOT NULL,
	"grade_average" numeric(5, 2) DEFAULT '0',
	"exam_difficulty" numeric(3, 2) DEFAULT '0',
	"assignment_difficulty" numeric(3, 2) DEFAULT '0',
	"interest_level" numeric(3, 2) DEFAULT '0',
	"overall_score" numeric(5, 2) DEFAULT '0',
	"department_he" varchar(256),
	"department_en" varchar(256),
	"topics_he" varchar(256)[] DEFAULT '{"RAY"}',
	"topics_en" varchar(256)[] DEFAULT '{"RAY"}',
	"prerequisites_he" text NOT NULL,
	"prerequisites_en" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "forum_course_ratings" ADD CONSTRAINT "forum_course_ratings_course_id_forum_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."forum_courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forum_course_ratings" ADD CONSTRAINT "forum_course_ratings_user_id_forum_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."forum_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "email_idx" ON "forum_users" USING btree ("email" text_ops);--> statement-breakpoint
CREATE INDEX "username_idx" ON "forum_users" USING btree ("username" text_ops);--> statement-breakpoint
CREATE INDEX "course_id_idx" ON "forum_course_ratings" USING btree ("course_id" text_ops);--> statement-breakpoint
CREATE INDEX "user_id_idx" ON "forum_course_ratings" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "course_department_en_idx" ON "forum_courses" USING btree ("department_en" text_ops);--> statement-breakpoint
CREATE INDEX "course_department_he_idx" ON "forum_courses" USING btree ("department_he" text_ops);--> statement-breakpoint
CREATE INDEX "course_number_idx" ON "forum_courses" USING btree ("id" text_ops);--> statement-breakpoint
CREATE INDEX "course_title_en_idx" ON "forum_courses" USING btree ("title_en" text_ops);--> statement-breakpoint
CREATE INDEX "course_title_he_idx" ON "forum_courses" USING btree ("title_he" text_ops);
*/