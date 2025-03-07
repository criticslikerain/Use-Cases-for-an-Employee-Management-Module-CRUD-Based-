import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Employee } from "../employee/employee.entity";

dotenv.config();
  
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE, 
    entities: [Employee],
    synchronize: true, 
  });
