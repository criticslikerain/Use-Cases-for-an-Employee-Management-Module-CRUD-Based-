import express, { Request, Response, NextFunction } from 'express';
import { EmployeeService } from './employee.service';
import { validateRequest } from '../_middleware/validate-request';
import { body } from 'express-validator';

const router = express.Router();
const employeeService = new EmployeeService();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getEmployees = await employeeService.getAllEmployees();
        res.json(getEmployees);
    } catch (err) {
        next(err);
    }
});


router.post(
    '/',
    validateRequest([
        body('name').notEmpty().withMessage('Name is required'),
        body('position').notEmpty().withMessage('Position is required'),
    ]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newEmployee = await employeeService.createEmployee(req.body);
            res.status(201).json(newEmployee);
        } catch (err) {
            next(err);
        }
    }
);

router.put(
    '/:id',
    validateRequest([
        body('name').optional().notEmpty().withMessage('Name cannot be empty'),
        body('position').optional().notEmpty().withMessage('Position cannot be empty'),
    ]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updatedEmployee = await employeeService.updateEmployee(Number(req.params.id), req.body);
            res.json(updatedEmployee);
        } catch (err) {
            next(err);
        }
    }
);

export default router;
