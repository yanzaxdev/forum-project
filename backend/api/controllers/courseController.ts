// controllers/courseController.ts
import {eq} from 'drizzle-orm';
import {Request, Response} from 'express';
import {z} from 'zod';
import {RatingPayload} from '~/types/ranking';

import {db} from '../db';
import {CourseRanking, courseRankings, courses, zRatingSchema} from '../db/schema';

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
          const courseId = parseInt(req.params.id);

          if (isNaN(courseId)) {
            res.status(400).json({error: 'Invalid course ID'});
            return;
          }

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
      const payload = zRatingSchema.parse(req.body);
      // When inserting into courseRankings
      const parsedRating = {
        ...payload,
        examDifficulty: payload.examDifficulty.toString(),
        assignmentDifficulty: payload.assignmentDifficulty.toString(),
        interestLevel: payload.interestLevel.toString(),
        grade: payload.grade.toString()
      };
      await db.insert(courseRankings).values(parsedRating)


      res.status(200).json({message: 'Rating submitted successfully'});
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json(
            {message: 'Validation error', errors: error.errors});
      } else {
        res.status(500).json({message: 'Error submitting rating', error});
      }
    }
  },
};