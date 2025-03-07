import { Request, Response } from "express";
import { EmployeeService } from "./employee.service";

export class EmployeeController {
  private employeeService: EmployeeService;

  constructor() {
    this.employeeService = new EmployeeService();
  }

  async getAllEmployees(req: Request, res: Response) {
    try {
      const employees = await this.employeeService.getEmployees();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: "Error fetching employees", error });
    }
  }

  async getEmployeeById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const employee = await this.employeeService.getEmployeeById(id);
      if (employee) {
        res.json(employee);
      } else {
        res.status(404).json({ message: "Employee not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching employee", error });
    }
  }

  async createEmployee(req: Request, res: Response) {
    try {
      const newEmployee = await this.employeeService.createEmployee(req.body);
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(500).json({ message: "Error creating employee", error });
    }
  }

  async updateEmployee(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const updatedEmployee = await this.employeeService.updateEmployee(id, req.body);
      res.json(updatedEmployee);
    } catch (error) {
      res.status(500).json({ message: "Error updating employee", error });
    }
  }

  async deleteEmployee(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.employeeService.deleteEmployee(id);
      res.json({ message: "Employee deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting employee", error });
    }
  }
}
