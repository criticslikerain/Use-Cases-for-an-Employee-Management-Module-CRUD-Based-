import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../_middleware/validate-request';
import { EmployeeService } from '../employee/employee.service';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';





const router = express.Router();
const employeeService = new EmployeeService();





router.post(
    '/login',
    validateRequest([
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('Password is required'),   ]),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {      const { email, password } = req.body;        const employee = await employeeService.findByEmail(email);
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

export default router;