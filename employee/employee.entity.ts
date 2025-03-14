import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Department } from '../departments/department.entity';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ nullable: true })
    salary?: number;

    @Column()
    position!: string;

    @ManyToOne(() => Department, (department) => department.employees)
    department?: Department;

    @Column({ default: true })
    isActive!: boolean;

    @CreateDateColumn()
    hireDate!: Date;

 
    departmentId?: number;
}

export default Employee; 
