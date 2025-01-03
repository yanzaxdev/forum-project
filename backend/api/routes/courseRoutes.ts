// routes/courseRoutes.ts
import {getAuth} from '@clerk/express';
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
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const {userId} = getAuth(req)
        if (!userId) {
          res.status(401).json({error: 'Unauthorized'});
          return;
        }
        const payload = ''
        // await courseController.handleRatingPayload(req, res);
      } catch (error) {
        next(error);
      }
    });


export default courseRouter;