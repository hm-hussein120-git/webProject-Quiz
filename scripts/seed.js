import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfigPath = path.join(__dirname, '../database.yaml');
const dbConfig = yaml.load(fs.readFileSync(dbConfigPath, 'utf8'));

const { sqlite_path: sqlitePath } = dbConfig;

const db = new sqlite3.Database(sqlitePath, (err) => {
  if (err) {
    console.error('Failed to connect to DB:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});


const employees = [
  {
    full_name: "John Doe",
    email: "john@example.com",
    phone_number: "123456789",
    job_title: "Frontend Developer",
    department: "IT",
    salary: 1200,
  },
  {
    full_name: "Jane Smith",
    email: "jane@example.com",
    phone_number: "987654321",
    job_title: "HR Officer",
    department: "HR",
    salary: 1000,
  },
  {
    full_name: "Alice Johnson",
    email: "alice@example.com",
    phone_number: "555666777",
    job_title: "Backend Developer",
    department: "IT",
    salary: 1300,
  },
 
  {
    full_name: "Mohammad Ali",
    email: "mohammad@company.com",
    phone_number: "777888999",
    job_title: "Project Manager",
    department: "Management",
    salary: 1600,
  },
  {
    full_name: "KAWthar Hussein",
    email: "kawthar@company.com",
    phone_number: "222333444",
    job_title: "AI ENGINEER",
    department: "Design",
    salary: 1100,
  },
];


const timesheets = [
  {
    employee_id: 1,
    start_time: "2025-02-10 08:00",
    end_time: "2025-02-10 17:00",
  },
  {
    employee_id: 2,
    start_time: "2025-02-11 12:00",
    end_time: "2025-02-11 17:00",
  },
  {
    employee_id: 3,
    start_time: "2025-02-12 07:00",
    end_time: "2025-02-12 16:00",
  },
 
  {
    employee_id: 4,
    start_time: "2025-02-13 09:00",
    end_time: "2025-02-13 18:00",
  },
  {
    employee_id: 5,
    start_time: "2025-02-14 10:00",
    end_time: "2025-02-14 17:30",
  },
];


const insertData = (table, data) => {
  const columns = Object.keys(data[0]).join(', ');
  const placeholders = Object.keys(data[0]).map(() => '?').join(', ');
  const stmt = db.prepare(`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`);

  data.forEach(row => {
    stmt.run(Object.values(row), (err) => {
      if (err) {
        console.error(`Error inserting into ${table}:`, err.message);
      }
    });
  });

  stmt.finalize();
};


db.serialize(() => {
  insertData('employees', employees);
  insertData('timesheets', timesheets);
});

db.close((err) => {
  if (err) {
    console.error('Error closing the database:', err.message);
  } else {
    console.log('Database seeded successfully.');
  }
});
