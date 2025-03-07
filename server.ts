import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./_helpers/db";
import userRoutes from "./employee/employee.controller";
import departmentRoutes from "./departments/department.controller";
import "reflect-metadata";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/employees", userRoutes);
app.use("/department", departmentRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to MySQL Database");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => console.error("Error connecting to database", err));

