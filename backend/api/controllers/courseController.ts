// controllers/courseController.ts
import {eq} from 'drizzle-orm';
import {Request, Response} from 'express';

import {courses} from '../../db/schema';
import {db} from '../db';

interface CourseParams {
  id: string;
}

export const courseController = {
  getAllCourses: async(req: Request, res: Response): Promise<void> => {
    try {
      // Use the type inference from drizzle for type safety
      const allCourses = await db.select().from(courses);

      // If you still get TypeScript errors, you can assert the type:
      // const allCourses = await db.select().from(courses) as Course[];

      res.json(allCourses);
    } catch (error) {
      const errorMessage =
          error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(500).json({error: errorMessage});
    }
  },

  getCourseById: async(req: Request<CourseParams>, res: Response):
      Promise<void> => {
        try {
          const courseId = req.params.id;

          if (!courseId) {
            res.status(400).json({error: 'Invalid course ID'});
            return;
          }

          // Using drizzle's type inference
          const result = await db.select()
                             .from(courses)
                             .where(eq(courses.id, courseId))
                             .limit(1);

          if (result.length === 0) {
            res.status(404).json({error: 'Course not found'});
            return;
          }

          // The first item should be of the correct type
          const course = result[0];
          res.json(course);
        } catch (error) {
          const errorMessage =
              error instanceof Error ? error.message : 'Unknown error occurred';
          res.status(500).json({error: errorMessage});
        }
      }
};