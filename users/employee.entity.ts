import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Department } from "./department.entity";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  position: string;

  @ManyToOne(() => Department, (department) => department.employees, { nullable: false })
  @JoinColumn({ name: "departmentID" })
  department: Department;

  @Column({ type: "int" })
  departmentID: number;

  @Column({ type: "date" })
  hireDate: Date;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  salary: number;

  @Column({ type: "int", nullable: true })
  projectID: number;

  @Column({ type: "varchar", length: 100, unique: true })
  employeeID: string;

  @Column({ type: "int" })
  yearsOfService: number;

  @Column({ type: "varchar", length: 255 })
  password: string;
}
