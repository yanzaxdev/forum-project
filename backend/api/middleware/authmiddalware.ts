import {requireAuth} from '@clerk/express';
import {NextFunction, Request, Response} from 'express';

// Basic auth check

// Simple error handler for unauthorized requests
const handleUnauthorized =
    (err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err.message.includes('auth')) {
        return res.status(401).json(
            {message: 'Please sign in to submit rating'});
      }
      next(err);
    };

export {requireAuth, handleUnauthorized};

// Protect a route based on authorization status
hasPermission = (request, response, next) => {
  const auth = getAuth(request);

  // Handle if the user is not authorized
  if (!auth.has({permission: 'org:admin:testpermission'})) {
    return response.status(403).send('Unauthorized');
  }

  return next();
};