import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./_helpers/db";
import userRoutes from "./employee/employee.controller";
import departmentRoutes from "./departments/department.controller";
import { productRouter } from "./products/product.routes"; // ✅ Add this line
import "reflect-metadata";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/employees", userRoutes);
app.use("/department", departmentRoutes);
app.use("/api", productRouter); // ✅ Mount the product router here

// Optional: Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to MySQL Database");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => console.error("Error connecting to database", err));