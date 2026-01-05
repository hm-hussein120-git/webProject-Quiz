import {
  Form,
  Link,
  redirect,
  useLoaderData,
  type ActionFunction,
} from "react-router";
import { getDB } from "~/db/getDB";


export async function loader() {
  const db = await getDB();

  const employees = await db.all(
    "SELECT id, full_name FROM employees"
  );

  return { employees };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const employeeId = formData.get("employee_id");
  const startTime = formData.get("start_time");
  const endTime = formData.get("end_time");

  if (!employeeId || !startTime || !endTime) {
    throw new Error("Missing required fields");
  }

  const db = await getDB();

  await db.run(
    `
      INSERT INTO timesheets (employee_id, start_time, end_time)
      VALUES (?, ?, ?)
    `,
    [employeeId, startTime, endTime]
  );

  return redirect("/timesheets");
};

export default function NewTimesheetPage() {
  const { employees } = useLoaderData() as {
    employees: { id: number; full_name: string }[];
  };

  return (
    <div className="page">
      <h1>Create New Timesheet</h1>

      <Form method="post">
        <div>
          <label>Employee</label>
          <select name="employee_id" required>
            <option value="">Select employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.full_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Start Time</label>
          <input type="datetime-local" name="start_time" required />
        </div>

        <div>
          <label>End Time</label>
          <input type="datetime-local" name="end_time" required />
        </div>

        <button type="submit">Create Timesheet</button>
      </Form>

      <hr />

      <ul>
        <li><Link to="/timesheets">Timesheets</Link></li>
        <li><Link to="/employees">Employees</Link></li>
      </ul>
    </div>
  );
}
