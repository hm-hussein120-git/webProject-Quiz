import { Form, Link, useNavigation } from "react-router";

type EmployeeFormProps = {
    employee?: {
        full_name?: string;
        email?: string;
        phone_number?: string;
        job_title?: string;
        department?: string;
        salary?: number;
    };
};

export default function EmployeeForm({ employee }: EmployeeFormProps) {
    const navigation = useNavigation();
    const submitting = navigation.state === "submitting";

    return (
        <Form method="post">
            <div className="page">
                <div>
                    <label>Full Name</label>
                    <input
                        name="full_name"
                        defaultValue={employee?.full_name || ""}
                        required
                    />
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        defaultValue={employee?.email || ""}
                        required
                    />
                </div>

                <div>
                    <label>Phone</label>
                    <input
                        name="phone_number"
                        defaultValue={employee?.phone_number || ""}
                    />
                </div>

                <div>
                    <label>Job Title</label>
                    <input
                        name="job_title"
                        defaultValue={employee?.job_title || ""}
                        required
                    />
                </div>

                <div>
                    <label>Department</label>
                    <input
                        name="department"
                        defaultValue={employee?.department || ""}
                        required
                    />
                </div>

                <div>
                    <label>Salary</label>
                    <input
                        type="number"
                        name="salary"
                        min={0}
                        defaultValue={employee?.salary || ""}
                        required
                    />
                </div>

                <button type="submit" disabled={submitting}>
                    {submitting ? "Saving..." : "Save"}
                </button>

                <div style={{ marginTop: "12px" }}>
                    <Link to="/employees">Back to Employees</Link>
                </div>
            </div>
        </Form>
    );
}
