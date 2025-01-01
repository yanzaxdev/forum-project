// routes/courseRoutes.ts
import {NextFunction, Request, Response, Router} from 'express';

import {courseController} from '../controllers/courseController';
import {RatingPayload} from '../types/ranking'

const courseRouter = Router();


// Define the param interface
interface CourseParams {
  id: string;
}

courseRouter.get(
    '/courses', async (req: Request, res: Response, next: NextFunction) => {
      try {
        await courseController.getAllCourses(req, res);
      } catch (error) {
        next(error);
      }
    });

courseRouter.get(
    '/courses/:id',
    async (req: Request<CourseParams>, res: Response, next: NextFunction) => {
      try {
        await courseController.getCourseById(req, res);
      } catch (error) {
        next(error);
      }
    });

courseRouter.post(
    '/courses/:id/rating',
    async (
        req: Request<CourseParams, any, RatingPayload>, res: Response,
        next: NextFunction) => {
      try {
        // await courseController.handleRatingPayload(req, res);
      } catch (error) {
        next(error);
      }
    });


export default courseRouter;