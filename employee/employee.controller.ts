import express, { Request, Response, NextFunction } from 'express';
import { EmployeeService } from './employee.service';
import { validateRequest } from '../_middleware/validate-request';
import { body } from 'express-validator';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const employeeService = new EmployeeService();


router.post(
    '/register',
    validateRequest([
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        body('position').notEmpty().withMessage('Position is required'),
        body('salary').optional().isNumeric().withMessage('Salary must be a number'),
        body('departmentId').optional().isInt().withMessage('Valid department ID is required')
    ]),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const existingEmployee = await employeeService.findByEmail(req.body.email);
            if (existingEmployee) {
                res.status(400).json({ message: 'Email already registered' });
                return;
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const employeeData = {
                ...req.body,
                password: hashedPassword
            };

            const newEmployee = await employeeService.createEmployee(employeeData);
            
            const { password, ...employeeWithoutPassword } = newEmployee;
            
            res.status(201).json({
                message: 'Employee registered successfully',
                employee: employeeWithoutPassword
            });
        } catch (err) {
            next(err);
        }
    }
);


router.post(
    '/login',
    validateRequest([
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ]),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, password } = req.body;
            const employee = await employeeService.findByEmail(email);

            if (!employee) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }

            const isValidPassword = await bcrypt.compare(password, employee.password);
            if (!isValidPassword) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }

            const token = jwt.sign(
                { 
                    id: employee.id,
                    email: employee.email,
                    position: employee.position 
                },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '24h' }
            );

            res.json({
                message: 'Login successful',
                token,
                employee: {
                    id: employee.id,
                    name: employee.name,
                    email: employee.email,
                    position: employee.position
                }
            });
        } catch (err) {
            next(err);
        }
    }
);

router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const employees = await employeeService.getAllEmployees();
        res.json(employees);
    } catch (err) {
        next(err);
    }
});

export default router;
