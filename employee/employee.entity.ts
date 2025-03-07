import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Department } from '../departments/department.entity';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    email!: string;

    @Column()
    position!: string;

    @ManyToOne(() => Department, (department) => department.employees)
    department!: Department;

    @Column({ default: true })
    isActive!: boolean;
}

export default Employee; 
