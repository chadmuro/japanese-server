import { Request, Response, NextFunction } from 'express';

export function authorizeRole(role: 'admin' | 'basic') {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.role !== role) {
      return res.status(401).json({ message: 'Not allowed!' });
    }
    next();
  };
}
