import {InferInsertModel, InferSelectModel, sql} from 'drizzle-orm';
import {decimal, index, integer, text, timestamp, varchar} from 'drizzle-orm/pg-core';
import {z} from 'zod';

import {createTable} from './tableCreator';

export type Course = InferSelectModel<typeof courses>;
export type CourseInsert = InferInsertModel<typeof courses>;

export const courses = createTable(
    'courses', {
      id: varchar('id', {length: 50}).primaryKey().notNull().default('00000'),
      titleHe: varchar('title_he', {length: 256}).notNull(),
      titleEn: varchar('title_en', {length: 256}).notNull(),
      descriptionHe: text('description_he').notNull(),
      descriptionEn: text('description_en').notNull(),
      createdAt: timestamp('created_at', {withTimezone: true})
                     .default(sql`CURRENT_TIMESTAMP`)
                     .notNull(),


      level: varchar('level', {length: 50}).notNull(),
      creditPoints: integer('credit_points').notNull(),
      departmentHe: varchar('department_he', {length: 256}),
      departmentEn: varchar('department_en', {length: 256}),

      gradeAverage:
          decimal('grade_average', {precision: 5, scale: 2}).default(sql`0`),
      examDifficulty:
          decimal('exam_difficulty', {precision: 3, scale: 2}).default(sql`0`),
      assignmentDifficulty:
          decimal('assignment_difficulty', {precision: 3, scale: 2})
              .default(sql`0`),
      interestLevel:
          decimal('interest_level', {precision: 3, scale: 2}).default(sql`0`),
      overallScore:
          decimal('overall_score', {precision: 5, scale: 2}).default(sql`0`),
      topicsHe: varchar('topics_he', {length: 256})
                    .array()
                    .default(sql`ARRAY[]::varchar[]`),
      topicsEn: varchar('topics_en', {length: 256})
                    .array()
                    .default(sql`ARRAY[]::varchar[]`),
      prerequisitesHe: text('prerequisites_he').notNull(),
      prerequisitesEn: text('prerequisites_en').notNull(),
    },
    (course) => [  // Changed from object to array
        index('course_title_en_idx').on(course.titleEn),
        index('course_title_he_idx').on(course.titleHe),
        index('course_number_idx').on(course.id),
        index('course_department_he_idx').on(course.departmentHe),
        index('course_department_en_idx').on(course.departmentEn),

]);


export const CourseSchema = z.object({
  id: z.string().max(50).default('00000'),
  titleHe: z.string().max(256),
  titleEn: z.string().max(256),
  descriptionHe: z.string(),
  descriptionEn: z.string(),
  createdAt: z.date().default(new Date()),
  level: z.string().max(50),
  creditPoints: z.number().int(),
  departmentHe: z.string().max(256).optional(),
  departmentEn: z.string().max(256).optional(),
  gradeAverage: z.number().multipleOf(0.01).min(0).max(999.99).default(0),
  examDifficulty: z.number().multipleOf(0.01).min(0).max(9.99).default(0),
  assignmentDifficulty: z.number().multipleOf(0.01).min(0).max(9.99).default(0),
  interestLevel: z.number().multipleOf(0.01).min(0).max(9.99).default(0),
  overallScore: z.number().multipleOf(0.01).min(0).max(999.99).default(0),
  topicsHe: z.array(z.string().max(256)).default([]),
  topicsEn: z.array(z.string().max(256)).default([]),
  prerequisitesHe: z.array(z.string().max(256)).default([]),
  prerequisitesEn: z.array(z.string().max(256)).default([]),
});

export type CourseSchema = z.infer<typeof CourseSchema>;