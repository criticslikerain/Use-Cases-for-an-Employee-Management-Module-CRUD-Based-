import express from 'express';
import { DepartmentService } from './department.service';
import { validateRequest } from '../_middleware/validate-request';

const router = express.Router();
const departmentService = new DepartmentService();

router.get('/', async (req, res, next) => {
    try {
        const departments = await departmentService.getAllDepartments();
        res.json(departments);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const department = await departmentService.getDepartmentById(Number(req.params.id));
        res.json(department);
    } catch (err) {
        next(err);
    }
});

router.post('/', validateRequest, async (req, res, next) => {
    try {
        const newDepartment = await departmentService.createDepartment(req.body);
        res.status(201).json(newDepartment);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', validateRequest, async (req, res, next) => {
    try {
        const updatedDepartment = await departmentService.updateDepartment(Number(req.params.id), req.body);
        res.json(updatedDepartment);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const result = await departmentService.deleteDepartment(Number(req.params.id));
        res.json(result);
    } catch (err) {
        next(err);
    }
});

export default router;