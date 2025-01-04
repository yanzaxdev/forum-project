import {InferSelectModel, sql} from 'drizzle-orm';
import {decimal, index, text, timestamp, varchar} from 'drizzle-orm/pg-core';
import {z} from 'zod';

import {createTable} from './tableCreator';

export type Course = InferSelectModel<typeof courses>;
export type CourseInsert = Omit<Course, 'id'>;

export const courses = createTable(
    'courses', {
      id: varchar('id', {length: 50}).primaryKey().notNull().default('00000'),
      titleEn: varchar('title_en', {length: 256}).notNull(),
      titleHe: varchar('title_he', {length: 256}).notNull(),
      descriptionEn: text('description_en').notNull(),
      descriptionHe: text('description_he').notNull(),
      createdAt: timestamp('created_at', {withTimezone: true})
                     .default(sql`CURRENT_TIMESTAMP`)
                     .notNull(),


      level: varchar('level', {length: 50}).notNull(),
      creditPoints: decimal('credit_points', {precision: 4, scale: 2})
                        .notNull()
                        .default(sql`0`),
      department: varchar('department', {length: 256}),

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
      topicsHe: varchar('topics', {length: 256})
                    .array()
                    .default(sql`ARRAY[]::varchar[]`),
      topicsEn: varchar('topics', {length: 256})
                    .array()
                    .default(sql`ARRAY[]::varchar[]`),
      prerequisitesEn: varchar('topics', {length: 256})
                           .array()
                           .default(sql`ARRAY[]::varchar[]`),
      prerequisitesHe: varchar('topics', {length: 256})
                           .array()
                           .default(sql`ARRAY[]::varchar[]`)
    },
    (course) => [  // Changed from object to array
        index('course_title_en_idx').on(course.titleEn),
        index('course_title_he_idx').on(course.titleHe),
        index('course_number_idx').on(course.id),
        index('course_department_idx').on(course.department),
]);


export const CourseSchema = z.object({
  id: z.string().max(50).default('00000'),
  titleEn: z.string().max(256),
  titleHe: z.string().max(256),
  descriptionEn: z.string(),
  descriptionHe: z.string(),
  createdAt: z.date(),

  level: z.string().max(50),
  creditPoints: z.number().multipleOf(0.01).min(0).max(99.99),
  department: z.string().max(256).optional(),

  gradeAverage: z.number().multipleOf(0.01).min(0).max(999.99).default(0),
  examDifficulty: z.number().multipleOf(0.01).min(0).max(9.99).default(0),
  assignmentDifficulty: z.number().multipleOf(0.01).min(0).max(9.99).default(0),
  interestLevel: z.number().multipleOf(0.01).min(0).max(9.99).default(0),
  overallScore: z.number().multipleOf(0.01).min(0).max(999.99).default(0),
});

export type CourseSchema = z.infer<typeof CourseSchema>;