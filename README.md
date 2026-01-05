# Employee Management System (EMS)

A simple full‑stack **Employee Management System** built as a technical challenge for a **Full Stack Web Developer** role.

The application allows HR personnel to manage **employees** and **timesheets** using a clean and easy‑to‑use interface.

---

## 🚀 Tech Stack

- **Frontend:** React.js  
- **Routing & Backend Logic:** React Router (loader & action functions)  
- **Database:** SQLite  
- **Language:** TypeScript / JavaScript  
- **Version Control:** Git & GitHub  

---

## ✅ Implemented Requirements

### 1️⃣ Single Employee View  
Routes:
- `/employees/new`
- `/employees/:employeeId`

**Features**
- Create a new employee
- Edit an existing employee
- Form fields:
  - Full Name
  - Email
  - Phone Number
  - Job Title
  - Department
  - Salary
- Required field validation
- Navigation back to Employees list

---

### 2️⃣ Multiple Employees View  
Route:
- `/employees`

**Features**
- View a list of employees
- Maximum of 5 relevant columns
- Each employee row links to the edit page
- Navigation to:
  - Create new employee
  - Timesheets list

---

### 3️⃣ Single Timesheet View  
Routes:
- `/timesheets/new`
- `/timesheets/:timesheetId`

**Features**
- Create a new timesheet
- Edit an existing timesheet
- Fields:
  - Employee (dropdown)
  - Start Time
  - End Time
- Navigation links to:
  - Employees
  - Timesheets

---

### 4️⃣ Multiple Timesheets View  
Route:
- `/timesheets`

**Features**
- View timesheets in:
  - Table view
  - Calendar/List view
- Toggle button to switch between views
- Each timesheet links to its edit page

---

## 🗃️ Database & Seeding

- SQLite database
- Database schema defined in `app/db/schema.sql`
- Initial data seeded using `scripts/seed.js`
- Includes:
  - Sample employees
  - Sample timesheets

---

## ▶️ How to Run the Project

### 1. Install dependencies
```bash
npm install
```
### 2. Create the database
```bash
npm run setup_db
```
### 3. Seed the database
```bash
npm run seed
```
### 4. Run the development server
```bash
npm run dev
```
### 5. Production build (optional)
```bash
npm run build
npm run start
```
