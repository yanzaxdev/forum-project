// routes/courseRoutes.ts
import {NextFunction, Request, Response, Router} from 'express';

import {courseController} from '../controllers/courseController';

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

export default courseRouter;