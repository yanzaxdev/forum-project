import {NextFunction, Request, Response, Router} from 'express';

import {courseController} from '../controllers/courseController';

const courseRouter = Router();

interface CourseParams {
  id: string;
}

// Generic routes first
courseRouter.get(
    '/courses', async (req: Request, res: Response, next: NextFunction) => {
      try {
        await courseController.getAllCourses(req, res);
      } catch (error) {
        next(error);
      }
    });

// Specific routes before parameter routes
courseRouter.post(
    '/courses/rating',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log('Route handler triggered');
        console.log('Request body:', req.body);
        await courseController.handleRatingPayload(req, res);
      } catch (error) {
        next(error);
      }
    });

// Parameter routes last
courseRouter.get(
    '/courses/:id',
    async (req: Request<CourseParams>, res: Response, next: NextFunction) => {
      try {
        await courseController.getCourseById(req, res);
      } catch (error) {
        next(error);
      }
    });

courseRouter.post('/test-post', (req, res) => {
  // console.log('Test post route hit');
  res.json({message: 'Post working'});
});

export default courseRouter;