

# 📘 Employee Management Module (CRUD-Based)
A collaborative project where each team member is responsible for implementing a specific feature of the Employee Management Module using **Express.js & TypeORM**.

## 👥 Team Members & Responsibilities

### 🟢 Cabatingan - Employee Management & Updates
- **Use Case 1: Add a New Employee**
  - Create an API to add employees with validation.
  - Define the **Employee** entity in TypeORM.
- **Use Case 3: Update Employee Salary**
  - Ensure only HR can update salaries.

### 🔵 Cornejo - Employee Retrieval & Search
- **Use Case 2: Retrieve All Employees**
  - Fetch employees and implement pagination.
- **Use Case 5: Search Employees by Name**
  - Implement a search function for employees.

### 🟠 Irag - Employee Status Management
- **Use Case 4: Delete an Employee**
  - Implement soft-delete (mark as inactive).
- **Use Case 10: Deactivate Inactive Employees**
  - Set up a cron job to deactivate inactive employees.

### 🟣 Cabahug - Employee Assignments & Transfers
- **Use Case 6: Assign Employee to a Project**
  - Implement a many-to-many relationship between Employee and Project.
- **Use Case 8: Transfer Employee to Another Department**
  - Ensure employees can be transferred between departments.

### 🟡 Castro - Reports & Bulk Operations
- **Use Case 7: Generate Employee Tenure Report**
  - Calculate employee tenure from hire date.
- **Use Case 9: Bulk Import Employees**
  - Implement CSV file parsing and employee data import.

## 🛠️ Tech Stack
- **Backend:** Node.js (Express.js)
- **Database:** PostgreSQL with TypeORM
- **Authentication:** JWT (if required)
- **File Handling:** csv-parser for bulk import
- **Task Scheduling:** Cron jobs for automatic deactivation

## 🚀 How to Run the Project
1. **Clone the repository**
   ```sh
   git clone https://github.com/criticslikerain/Use-Cases-for-an-Employee-Management-Module-CRUD-Based-.git
   cd Use-Cases-for-an-Employee-Management-Module-CRUD-Based-
2. **Install the dependencies**
   ```sh
   npm install @angular/common @angular/core bcrypt class-transformer class-validator cors dotenv express express-validator joi mysql2 reflect-metadata rxjs typeorm

   npm install --save-dev @types/bcrypt @types/cors @types/express @types/node nodemon ts-node typescript

3. **Create a database called "midterm" on MySQL**
   ```sh
   CREATE DATABASE midterm;
4. **Run the Project**
   ```sh
   npx ts-node server.ts

Make sure all the possible routes will be included

For POSTING: 
GET 
UPDATE 
DELETE 
PUT 

