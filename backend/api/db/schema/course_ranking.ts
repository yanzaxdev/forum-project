import {InferInsertModel, InferSelectModel, sql} from 'drizzle-orm';
import {decimal, index, integer, text, timestamp, unique} from 'drizzle-orm/pg-core';
import {z} from 'zod';

import {courses} from './courses';
import {createTable} from './tableCreator';
import {users} from './users';

export type CourseRanking = InferSelectModel<typeof courseRankings>;
export type CourseRankingInsert = InferInsertModel<typeof courseRankings>;

export const courseRankings = createTable(
    'course_rankings', {
      id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
      courseId: integer('course_id').notNull().references(() => courses.id),
      userId: text().notNull().references(() => users.id),
      grade: decimal('grade', {precision: 5, scale: 2}).default(sql`0`),
      examDifficulty:
          decimal('exam_difficulty', {precision: 3, scale: 2}).default(sql`0`),
      examComment: text('exam_comment').default(sql`''`),
      assignmentDifficulty:
          decimal('assignment_difficulty', {precision: 3, scale: 2})
              .default(sql`0`),
      assignmentComment: text('assignment_comment').default(sql`''`),
      interestLevel:
          decimal('interest_level', {precision: 3, scale: 2}).default(sql`0`),
      interestComment: text('interest_comment').default(sql`''`),
      overallScore: decimal('overall_score', {precision: 3, scale: 2}),
      overallComment: text('overall_comment').default(sql`''`),
      createdAt: timestamp('created_at', {withTimezone: true})
                     .default(sql`CURRENT_TIMESTAMP`)
                     .notNull(),
    },
    (ranking) => [  // Changed from object to array
        index('course_id_idx').on(ranking.courseId),
        index('user_id_idx').on(ranking.userId),
        unique('unique_course_user_ranking')
            .on(ranking.userId, ranking.courseId)]);



export const zRatingSchema = z.object({
  courseId: z.number().int().positive(),
  userId: z.string(),
  grade: z.number().min(0).max(100).multipleOf(0.01),
  examDifficulty: z.number().min(0).max(5).multipleOf(0.01),
  examComment: z.string(),
  assignmentDifficulty: z.number().min(0).max(5).multipleOf(0.01),
  assignmentComment: z.string(),
  interestLevel: z.number().min(0).max(5).multipleOf(0.01),
  interestComment: z.string(),
  overallScore: z.number().min(0).max(5).multipleOf(0.01),
  overallComment: z.string(),
});

export type RatingPayload = z.infer<typeof zRatingSchema>;