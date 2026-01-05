import { Form, Link, useNavigation } from "react-router";

type TimesheetFormProps = {
    timesheet?: any;
    employees: any[];
};

export default function TimesheetForm({
    timesheet,
    employees,
}: TimesheetFormProps) {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <Form method="post">
            <div className="page">
                <div>
                    <label>Employee</label>
                    <select
                        name="employee_id"
                        defaultValue={timesheet?.employee_id || ""}
                        required
                    >
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
                    <input
                        type="datetime-local"
                        name="start_time"
                        defaultValue={timesheet?.start_time || ""}
                        required
                    />
                </div>

                <div>
                    <label>End Time</label>
                    <input
                        type="datetime-local"
                        name="end_time"
                        defaultValue={timesheet?.end_time || ""}
                        required
                    />
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save"}
                </button>

                <hr />

                <ul>
                    <li>
                        <Link to="/timesheets">Timesheets</Link>
                    </li>
                    <li>
                        <Link to="/employees">Employees</Link>
                    </li>
                </ul>
            </div>
        </Form>
    );
}
