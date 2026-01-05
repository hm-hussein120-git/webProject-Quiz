import { Link, useLoaderData } from "react-router";
import { getDB } from "~/db/getDB";

type Employee = {
  id: number;
  full_name: string;
  email: string;
  job_title: string;
  department: string;
};

export async function loader() {
  const db = await getDB();

  const employees = await db.all<Employee[]>(`
    SELECT
      id,
      full_name,
      email,
      job_title,
      department
    FROM employees
  `);

  return { employees };
}

export default function EmployeesPage() {
  const { employees } = useLoaderData() as { employees: Employee[] };

  return (
    <div className="page">
      <h1>Employees</h1>

      <div style={{ marginBottom: 16 }}>
        <Link to="/employees/new">➕ New Employee</Link>{" "}
        | <Link to="/timesheets">⏱ Timesheets</Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Department</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.full_name}</td>
              <td>{emp.email}</td>
              <td>{emp.job_title}</td>
              <td>{emp.department}</td>
              <td>
                <Link to={`/employees/${emp.id}`}>Open</Link>
              </td>
            </tr>
          ))}

          {employees.length === 0 && (
            <tr>
              <td colSpan={5}>No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
