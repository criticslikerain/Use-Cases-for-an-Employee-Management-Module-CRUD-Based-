import { AppDataSource } from "../_helpers/db";
import { Employee } from "./employee.entity";
import { Department } from "./department.entity";
import bcrypt from "bcrypt";

export class EmployeeService {
  private employeeRepository = AppDataSource.getRepository(Employee);
  private departmentRepository = AppDataSource.getRepository(Department);

  // Create Employee
  async createEmployee(
    name: string,
    position: string,
    departmentID: number,
    hireDate: Date,
    salary: number,
    projectID: number,
    employeeID: string,
    yearsOfService: number,
    password: string
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const department = await this.departmentRepository.findOne({ where: { id: departmentID } });

    if (!department) {
      throw new Error("Department not found");
    }

    const newEmployee = this.employeeRepository.create({
      name,
      position,
      department,
      hireDate,
      departmentID,
      salary,
      projectID,
      employeeID,
      yearsOfService,
      password: hashedPassword,
    });

    return this.employeeRepository.save(newEmployee);
  }

  // Get all Employees
  async getEmployees() {
    return this.employeeRepository.find({ relations: ["department"] });
  }

  // Get Employee by ID
  async getEmployeeById(id: number) {
    return this.employeeRepository.findOne({ where: { id }, relations: ["department"] });
  }

  // Update Employee
  async updateEmployee(id: number, updateData: Partial<Employee>) {
    await this.employeeRepository.update(id, updateData);
    return this.getEmployeeById(id);
  }

  // Delete Employee
  async deleteEmployee(id: number) {
    return this.employeeRepository.delete(id);
  }

  // Create Department
  async createDepartment(name: string) {
    const newDepartment = this.departmentRepository.create({ name });
    return this.departmentRepository.save(newDepartment);
  }

  // Get all Departments
  async getDepartments() {
    return this.departmentRepository.find();
  }

  // Get Department by ID
  async getDepartmentById(id: number) {
    return this.departmentRepository.findOne({ where: { id } });
  }

  // Update Department
  async updateDepartment(id: number, name: string) {
    await this.departmentRepository.update(id, { name });
    return this.getDepartmentById(id);
  }

  // Delete Department
  async deleteDepartment(id: number) {
    return this.departmentRepository.delete(id);
  }
}
