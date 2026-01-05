import {
  Form,
  Link,
  redirect,
  useLoaderData,
  type ActionFunction,
  type LoaderFunction,
} from "react-router";
import { getDB } from "~/db/getDB";


export const loader: LoaderFunction = async ({ params }) => {
  const db = await getDB();

  const timesheet = await db.get(
    "SELECT * FROM timesheets WHERE id = ?",
    [params.timesheetId]
  );

  if (!timesheet) {
    throw new Response("Timesheet not found", { status: 404 });
  }

  const employees = await db.all(
    "SELECT id, full_name FROM employees"
  );

  return { timesheet, employees };
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const db = await getDB();

  await db.run(
    `
    UPDATE timesheets
    SET employee_id = ?, start_time = ?, end_time = ?
    WHERE id = ?
    `,
    [
      formData.get("employee_id"),
      formData.get("start_time"),
      formData.get("end_time"),
      params.timesheetId,
    ]
  );

  return redirect("/timesheets");
};


export default function EditTimesheetPage() {
  const { timesheet, employees } = useLoaderData() as {
    timesheet: any;
    employees: any[];
  };

  return (
    <div className="page">
      <h1>Edit Timesheet</h1>

      <Form method="post">
        <div>
          <label>Employee</label>
          <select
            name="employee_id"
            defaultValue={timesheet.employee_id}
            required
          >
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.full_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Start Time</label>
          <input
            type="datetime-local"
            name="start_time"
            defaultValue={timesheet.start_time}
            required
          />
        </div>

        <div>
          <label>End Time</label>
          <input
            type="datetime-local"
            name="end_time"
            defaultValue={timesheet.end_time}
            required
          />
        </div>

        <button type="submit">Save Changes</button>
      </Form>

      <hr />

      <ul>
        <li><Link to="/timesheets">Back to Timesheets</Link></li>
        <li><Link to="/timesheets/new">New Timesheet</Link></li>
        <li><Link to="/employees">Employees</Link></li>
      </ul>
    </div>
  );
}
