import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./_helpers/db"; 
import employeeRoutes from "./employee/employee.controller";
import { userRouter } from "./users/user.controller";
import departmentRoutes from "./departments/department.controller";
import "reflect-metadata";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/employees", employeeRoutes);
app.use("/department", departmentRoutes);
app.use("/", userRouter);


AppDataSource.initialize()
  .then(() => {
    console.log("Connected to MySQL Database successfully.");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
    process.exit(1);  
  });
