import {InferInsertModel, InferSelectModel, sql} from 'drizzle-orm';
import {decimal, index, text, timestamp, unique, varchar} from 'drizzle-orm/pg-core';
import {z} from 'zod';

import {courses} from './courses';
import {createTable} from './tableCreator';
import {users} from './users';

export type CourseRating = InferSelectModel<typeof courseRatings>;
export type CourseRatingInsert = InferInsertModel<typeof courseRatings>;

export const courseRatings = createTable(
    'course_ratings', {
      courseId: varchar('course_id', {length: 50})
                    .notNull()
                    .references(() => courses.id),
      userId: text('user_id').notNull().references(() => users.id),
      grade: decimal('grade', {precision: 5, scale: 2}),
      examDifficulty: decimal('exam_difficulty', {precision: 3, scale: 2}),
      examComment: text('exam_comment').default(sql`''`),
      assignmentDifficulty:
          decimal('assignment_difficulty', {precision: 3, scale: 2}),
      assignmentComment: text('assignment_comment').default(sql`''`),
      interestLevel: decimal('interest_level', {precision: 3, scale: 2}),
      interestComment: text('interest_comment').default(sql`''`),
      overallScore: decimal('overall_score', {precision: 3, scale: 2}),
      overallComment: text('overall_comment').default(sql`''`),
      createdAt: timestamp('created_at', {withTimezone: true})
                     .default(sql`CURRENT_TIMESTAMP`)
                     .notNull(),
    },
    (ranking) =>
        [index('course_id_idx').on(ranking.courseId),
         index('user_id_idx').on(ranking.userId),
         unique('unique_course_user_ranking')
             .on(ranking.userId, ranking.courseId)]);



export const CourseRatingSchema = z.object({
  courseId: z.string().max(50),
  userId: z.string(),
  grade: z.number().multipleOf(0.01).min(0).max(999.99).optional(),
  examDifficulty: z.number().multipleOf(0.01).min(0).max(9.99).optional(),
  examComment: z.string().default(''),
  assignmentDifficulty: z.number().multipleOf(0.01).min(0).max(9.99).optional(),
  assignmentComment: z.string().default(''),
  interestLevel: z.number().multipleOf(0.01).min(0).max(9.99).optional(),
  interestComment: z.string().default(''),
  overallScore: z.number().multipleOf(0.01).min(0).max(9.99).optional(),
  overallComment: z.string().default(''),
  createdAt: z.date().default(() => new Date())
});
