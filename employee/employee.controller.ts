import { AppDataSource } from "../_helpers/db";
import { Employee } from "./employee.entity";

export class EmployeeService {
    private repo = AppDataSource.getRepository(Employee);

    async getAll() {
        return await this.repo.find();
    }

    async getById(id: number) {
        return await this.repo.findOneBy({ id });
    }

    async create(employeeData: Partial<Employee>) {
        const employee = this.repo.create(employeeData);
        return await this.repo.save(employee);
    }

    async update(id: number, employeeData: Partial<Employee>) {
        await this.repo.update(id, employeeData);
        return this.getById(id);
    }

    async softDelete(id: number) {
        const employee = await this.getById(id);
        if (!employee) return null;
        employee.isActive = false;
        return await this.repo.save(employee);
    }
}
