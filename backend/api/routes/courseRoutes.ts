import {NextFunction, Request, Response, Router} from 'express';

import {courseController} from '../controllers/courseController';

const courseRouter = Router();


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
    '/courses/rating',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await courseController.handleRatingPayload(req, res);
      } catch (error) {
        next(error);
      }
    });


export default courseRouter;