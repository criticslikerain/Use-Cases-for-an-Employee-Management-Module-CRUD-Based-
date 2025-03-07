import express, { Request, Response, NextFunction } from 'express';
import { DepartmentService } from './department.service';
import { validateRequest } from '../_middleware/validate-request';
import { body } from 'express-validator';

const router = express.Router();
const departmentService = new DepartmentService();

router.post(
    '/',
    validateRequest([
        body('name').notEmpty().withMessage('Department name is required'),
    ]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newDepartment = await departmentService.createDepartment(req.body);
            res.status(201).json(newDepartment);
        } catch (err) {
            next(err);
        }
    }
);

router.put(
    '/:id',
    validateRequest([
        body('name').optional().notEmpty().withMessage('Department name cannot be empty'),
    ]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updatedDepartment = await departmentService.updateDepartment(Number(req.params.id), req.body);
            res.json(updatedDepartment);
        } catch (err) {
            next(err);
        }
    }
);

export default router;
