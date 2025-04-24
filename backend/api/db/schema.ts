
import {InferInsertModel, InferSelectModel, sql} from 'drizzle-orm'
import {foreignKey, index, integer, numeric, pgTableCreator, text, timestamp, unique, varchar} from 'drizzle-orm/pg-core'
import {z} from 'zod';

// Create table helper
export const createTable = pgTableCreator((name) => `forum_${name}`);

// Users table
export type User = InferSelectModel<typeof users>;
export type UserInsert = InferInsertModel<typeof users>;

export const users = createTable(
    'users', {
      id: text('id').primaryKey(),
      username: varchar('username', {length: 50}).notNull().unique(),
      email: varchar('email', {length: 256}).notNull().unique(),
      createdAt: timestamp('created_at', {withTimezone: true})
                     .default(sql`CURRENT_TIMESTAMP`)
                     .notNull(),
    },
    (user) => ({
      indexes: [
        index('username_idx').on(user.username),
        index('email_idx').on(user.email),
      ],
    }));

export const UserSchema = z.object({
  id: z.string(),
  username: z.string().max(50),
  email: z.string().max(256),
  createdAt: z.date(),
});

// Courses table
export type Course = InferSelectModel<typeof courses>;
export type CourseInsert = InferInsertModel<typeof courses>;

export const courses = createTable(
    'courses', {
      id: varchar('id', {length: 50}).default('00000').primaryKey().notNull(),
      titleEn: varchar('title_en', {length: 256}).notNull(),
      titleHe: varchar('title_he', {length: 256}).notNull(),
      descriptionEn: text('description_en').notNull(),
      descriptionHe: text('description_he').notNull(),
      createdAt: timestamp('created_at', {withTimezone: true, mode: 'string'})
                     .default(sql`CURRENT_TIMESTAMP`)
                     .notNull(),
      level: varchar('level', {length: 50}).notNull(),
      creditPoints: integer('credit_points').notNull(),
      gradeAverage:
          numeric('grade_average', {precision: 5, scale: 2}).default('0'),
      examDifficulty:
          numeric('exam_difficulty', {precision: 3, scale: 2}).default('0'),
      assignmentDifficulty:
          numeric('assignment_difficulty', {precision: 3, scale: 2})
              .default('0'),
      interestLevel:
          numeric('interest_level', {precision: 3, scale: 2}).default('0'),
      overallScore:
          numeric('overall_score', {precision: 5, scale: 2}).default('0'),
      departmentHe: varchar('department_he', {length: 256}),
      departmentEn: varchar('department_en', {length: 256}),
      topicsHe: varchar('topics_he', {length: 256}).array().default(['RAY']),
      topicsEn: varchar('topics_en', {length: 256}).array().default(['RAY']),
      prerequisitesHe: text('prerequisites_he').notNull(),
      prerequisitesEn: text('prerequisites_en').notNull(),
    },
    (course) => ({
      indexes: [
        index('course_department_en_idx').on(course.departmentEn),
        index('course_department_he_idx').on(course.departmentHe),
        index('course_number_idx').on(course.id),
        index('course_title_en_idx').on(course.titleEn),
        index('course_title_he_idx').on(course.titleHe),
      ],
    }));

export const CourseSchema = z.object({
  id: z.string().max(50).default('00000'),
  titleEn: z.string().max(256),
  titleHe: z.string().max(256),
  descriptionEn: z.string(),
  descriptionHe: z.string(),
  createdAt: z.date(),
  level: z.string().max(50),
  creditPoints: z.number().int(),
  gradeAverage: z.number().multipleOf(0.01).default(0),
  examDifficulty: z.number().multipleOf(0.01).default(0),
  assignmentDifficulty: z.number().multipleOf(0.01).default(0),
  interestLevel: z.number().multipleOf(0.01).default(0),
  overallScore: z.number().multipleOf(0.01).default(0),
  departmentHe: z.string().max(256).optional(),
  departmentEn: z.string().max(256).optional(),
  topicsHe: z.array(z.string().max(256)).default(['RAY']),
  topicsEn: z.array(z.string().max(256)).default(['RAY']),
  prerequisitesHe: z.string(),
  prerequisitesEn: z.string(),
});

// Course Ratings table
export type CourseRating = InferSelectModel<typeof courseRatings>;
export type CourseRatingInsert = InferInsertModel<typeof courseRatings>;

export const courseRatings = createTable(
    'course_ratings', {
      courseId: varchar('course_id', {length: 50}).notNull(),
      userId: text('user_id').notNull(),
      grade: numeric('grade', {precision: 5, scale: 2}).notNull(),
      examDifficulty:
          numeric('exam_difficulty', {precision: 3, scale: 2}).notNull(),
      examComment: text('exam_comment').default(''),
      assignmentDifficulty:
          numeric('assignment_difficulty', {precision: 3, scale: 2}).notNull(),
      assignmentComment: text('assignment_comment').default(''),
      interestLevel:
          numeric('interest_level', {precision: 3, scale: 2}).notNull(),
      interestComment: text('interest_comment').default(''),
      overallScore:
          numeric('overall_score', {precision: 3, scale: 2}).notNull(),
      overallComment: text('overall_comment').default(''),
      createdAt: timestamp('created_at', {withTimezone: true, mode: 'string'})
                     .default(sql`CURRENT_TIMESTAMP`)
                     .notNull(),
    },
    (rating) => ({
      foreignKeys: [
        foreignKey({
          columns: [rating.courseId],
          foreignColumns: [courses.id],
          name: 'forum_course_ratings_course_id_forum_courses_id_fk'
        }),
        foreignKey({
          columns: [rating.userId],
          foreignColumns: [users.id],
          name: 'forum_course_ratings_user_id_forum_users_id_fk'
        }),
      ],
      indexes: [
        index('course_id_idx').on(rating.courseId),
        index('user_id_idx').on(rating.userId),
      ],
      uniqueConstraints: [
        unique('unique_course_user_ranking').on(rating.courseId, rating.userId),
      ],
    }));

export const CourseRatingSchema = z.object({
  courseId: z.string().max(50),
  userId: z.string(),
  grade: z.number().multipleOf(0.01).min(0).max(100),
  examDifficulty: z.number().multipleOf(0.01).min(0).max(10),
  examComment: z.string().default(''),
  assignmentDifficulty: z.number().multipleOf(0.01).min(0).max(10),
  assignmentComment: z.string().default(''),
  interestLevel: z.number().multipleOf(0.01).min(0).max(10),
  interestComment: z.string().default(''),
  overallScore: z.number().multipleOf(0.01).min(0).max(10),
  overallComment: z.string().default(''),
  createdAt: z.date().default(() => new Date())
});

// Export a combined schema object for convenience
export const schema = {
  users,
  courses,
  courseRatings
};