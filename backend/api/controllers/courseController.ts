// controllers/courseController.ts
import {eq} from 'drizzle-orm';
import {Request, Response} from 'express';
import {ZodError} from 'zod';  // Import ZodError explicitly

import {db} from '../../db';
import {CourseRatingInsert, courseRatings, CourseRatingSchema, courses,} from '../../db/schema';

interface CourseParams {
  id: string;
}

export const courseController = {
  getAllCourses: async(req: Request, res: Response): Promise<void> => {
    try {
      const allCourses = await db.select().from(courses);
      res.json(allCourses);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({error: error.message});
      } else {
        res.status(500).json({error: 'Unknown error occurred'});
      }
    }
  },

  getCourseById: async(req: Request<CourseParams>, res: Response):
      Promise<void> => {
        try {
          const courseId = req.params.id;

          const course = await db.select()
                             .from(courses)
                             .where(eq(courses.id, courseId))
                             .limit(1);

          if (!course.length) {
            res.status(404).json({error: 'Course not found'});
            return;
          }

          res.json(course[0]);
        } catch (error) {
          if (error instanceof Error) {
            res.status(500).json({error: error.message});
          } else {
            res.status(500).json({error: 'Unknown error occurred'});
          }
        }
      },

  handleRatingPayload: async(req: Request, res: Response): Promise<void> => {
    try {
      const payload = CourseRatingSchema.parse(req.body);

      const parsedRating: CourseRatingInsert = {
        userId: payload.userId,
        courseId: payload.courseId,
        grade: payload.grade.toString(),
        examDifficulty: payload.examDifficulty.toString(),
        examComment: payload.examComment,
        assignmentDifficulty: payload.assignmentDifficulty.toString(),
        assignmentComment: payload.assignmentComment,
        interestLevel: payload.interestLevel.toString(),
        interestComment: payload.interestComment,
        overallScore: payload.overallScore.toString(),
        overallComment: payload.overallComment,
      };

      await db.insert(courseRatings).values(parsedRating);
      res.status(201).json({message: 'Rating submitted successfully'});
    } catch (error) {
      if (error instanceof ZodError) {  // Use imported ZodError
        res.status(400).json(
            {message: 'Validation error', errors: error.errors});
      } else {
        res.status(500).json({
          message: 'Error submitting rating',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  },
};