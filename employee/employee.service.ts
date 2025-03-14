import { AppDataSource } from '../_helpers/db';
import { Employee } from './employee.entity';
import { Department } from '../departments/department.entity';

export class EmployeeService {
    private employeeRepository = AppDataSource.getRepository(Employee);

    async findByEmail(email: string) {
        return await this.employeeRepository.findOne({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                password: true, 
                position: true,
                salary: true,
                isActive: true,
                hireDate: true
            }
        });
    }









    async getAllEmployees() {
        return await this.employeeRepository.find({
            relations: ['department'],
            select: {
                id: true,
                name: true,
                email: true,
                position: true,
                salary: true,
                isActive: true,
                hireDate: true
            }
        });
    }








    async getEmployeeById(id: number) {
        return await this.employeeRepository.findOne({
            where: { id },
            relations: ['department']
        });
    }




    async createEmployee(employeeData: Partial<Employee>) 
    
    
    {

        if (employeeData.departmentId) {
            const department = await AppDataSource.getRepository(Department).findOne({
                where: { id: employeeData.departmentId }
            });
            if (department) {
                employeeData.department = department;
            }
          
            delete employeeData.departmentId;
        }

        const employee = this.employeeRepository.create(employeeData);
        return await this.employeeRepository.save(employee);
    }




    async updateEmployee(id: number, employeeData: Partial<Employee>) 
    
    {
        await this.employeeRepository.update(id, employeeData);
        return await this.getEmployeeById(id);
    }





    async deleteEmployee(id: number)
    
    
    
    {
        await this.employeeRepository.delete(id);
        return { message: 'Employee deleted successfully' };
    }
}
