import {
  redirect,
  useLoaderData,
  type ActionFunction,
  type LoaderFunction,
} from "react-router";
import EmployeeForm from "~/components/EmployeeForm";
import { getDB } from "~/db/getDB";


export const loader: LoaderFunction = async ({ params }) => {
  const db = await getDB();
  const employeeId = params.employeeId;

  if (!employeeId) {
    throw new Response("Employee ID is required", { status: 400 });
  }

  const employee = await db.get(
    "SELECT * FROM employees WHERE id = ?",
    employeeId
  );

  if (!employee) {
    throw new Response("Employee not found", { status: 404 });
  }

  return { employee };
};


export const action: ActionFunction = async ({ request, params }) => {
  const employeeId = params.employeeId;
  const formData = await request.formData();
  const db = await getDB();

  if (!employeeId) {
    throw new Response("Employee ID is required", { status: 400 });
  }

  await db.run(
    `
    UPDATE employees
    SET
      full_name = ?,
      email = ?,
      phone_number = ?,
      job_title = ?,
      department = ?,
      salary = ?
    WHERE id = ?
    `,
    [
      formData.get("full_name"),
      formData.get("email"),
      formData.get("phone_number"),
      formData.get("job_title"),
      formData.get("department"),
      Number(formData.get("salary")),
      employeeId,
    ]
  );

  return redirect("/employees");
};

export default function EditEmployeePage() {
  const { employee } = useLoaderData() as { employee: any };

  return (
    <div className="page">
      <h1>Edit Employee</h1>
      <EmployeeForm employee={employee} />
    </div>
  );
}
