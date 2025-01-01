// controllers/courseController.ts
import {eq} from 'drizzle-orm';
import {Request, Response} from 'express';
import {RatingPayload} from '~/types/ranking';

import {db} from '../db';
import {courses} from '../db/schema';

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

  handleRatingPayload: async (req: Request, res: Response) => {
    const payload: RatingPayload = req.body;

    // Your logic to handle the rating payload
    try {
      // For example, save the payload to the database
      // await saveRatingToDatabase(payload);

      res.status(200).json({message: 'Rating submitted successfully'});
    } catch (error) {
      res.status(500).json({message: 'Error submitting rating', error});
    }
  },
};