import { AppDataSource } from '../_helpers/db';
import { Department } from './department.entity';

export class DepartmentService {
    async getAllDepartments() {
        return await AppDataSource.getRepository(Department).find({ relations: ['employees'] });
    }

    async getDepartmentById(id: number) {
        return await AppDataSource.getRepository(Department).findOne({ where: { id }, relations: ['employees'] });
    }

    async createDepartment(departmentData: Partial<Department>) {
        const department = AppDataSource.getRepository(Department).create(departmentData);
        return await AppDataSource.getRepository(Department).save(department);
    }

    async updateDepartment(id: number, departmentData: Partial<Department>) {
        await AppDataSource.getRepository(Department).update(id, departmentData);
        return await this.getDepartmentById(id);
    }

    async deleteDepartment(id: number) {
        await AppDataSource.getRepository(Department).delete(id);
        return { message: 'Department deleted successfully' };
    }
}