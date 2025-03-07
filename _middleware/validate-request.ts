import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Middleware to validate requests
export const validateRequest = [
  // Example validation rules
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];