import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

export const validateRequest = (validations: ValidationChain[]) => {
    return [
        ...validations,
        (req: Request, res: Response, next: NextFunction): void => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }
            next();
        }
    ];
};
