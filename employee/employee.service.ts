import { AppDataSource } from '../_helpers/db';
import { Employee } from './employee.entity';

export class EmployeeService {
    async getAllEmployees() {
        return await AppDataSource.getRepository(Employee).find({ relations: ['department'] });
    }

    async getEmployeeById(id: number) {
        return await AppDataSource.getRepository(Employee).findOne({ where: { id }, relations: ['department'] });
    }

    async createEmployee(employeeData: Partial<Employee>) {
        const employee = AppDataSource.getRepository(Employee).create(employeeData);
        return await AppDataSource.getRepository(Employee).save(employee);
    }

    async updateEmployee(id: number, employeeData: Partial<Employee>) {
        await AppDataSource.getRepository(Employee).update(id, employeeData);
        return await this.getEmployeeById(id);
    }

    async deleteEmployee(id: number) {
        await AppDataSource.getRepository(Employee).delete(id);
        return { message: 'Employee deleted successfully' };
    }
}
