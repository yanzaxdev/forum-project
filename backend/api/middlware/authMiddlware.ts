import {getAuth} from '@clerk/express';
import {NextFunction, Request, Response} from 'express';


// Middleware
const authMiddleware =
    (req: Request, res: Response, next: NextFunction): void => {
      const {userId} = getAuth(req);
      if (!userId) {
        res.status(401).json({error: 'Unauthorized'});
        return;
      }
      next();
    };

export default authMiddleware;