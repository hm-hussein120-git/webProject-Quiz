import { redirect, type ActionFunction } from "react-router";
import EmployeeForm from "~/components/EmployeeForm";
import { getDB } from "~/db/getDB";


export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const db = await getDB();

  const fullName = formData.get("full_name");
  const email = formData.get("email");
  const phoneNumber = formData.get("phone_number");
  const jobTitle = formData.get("job_title");
  const department = formData.get("department");
  const salary = formData.get("salary");

  await db.run(
    `
      INSERT INTO employees
        (full_name, email, phone_number, job_title, department, salary)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [fullName, email, phoneNumber, jobTitle, department, salary]
  );

  return redirect("/employees");
};

export default function NewEmployeePage() {
  return (
    <div className="page">
      <h1>Create New Employee</h1>
      <EmployeeForm />
    </div>
  );
}
