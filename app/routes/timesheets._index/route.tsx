import { useState } from "react";
import { Link, useLoaderData } from "react-router";
import { getDB } from "~/db/getDB";

export async function loader() {
  const db = await getDB();

  const timesheets = await db.all(`
    SELECT
      timesheets.id,
      timesheets.start_time,
      timesheets.end_time,
      employees.full_name
    FROM timesheets
    JOIN employees ON timesheets.employee_id = employees.id
    ORDER BY timesheets.start_time DESC
  `);

  return { timesheets };
}

export default function TimesheetsPage() {
  const { timesheets } = useLoaderData() as { timesheets: any[] };
  const [isTableView, setIsTableView] = useState(true);

  return (
    <div className="page">
      <h1>Timesheets</h1>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setIsTableView(true)}>Table View</button>
        <button onClick={() => setIsTableView(false)}>Calendar View</button>
      </div>

      {isTableView ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {timesheets.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.full_name}</td>
                <td>{t.start_time}</td>
                <td>{t.end_time}</td>
                <td>
                  <Link to={`/timesheets/${t.id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <h3>Calendar View</h3>
          <ul>
            {timesheets.map((t) => (
              <li key={t.id}>
                <strong>{t.full_name}</strong>
                <br />
                {t.start_time} → {t.end_time}
              </li>
            ))}
          </ul>
        </div>
      )}

      <hr />

      <ul>
        <li>
          <Link to="/timesheets/new">New Timesheet</Link>
        </li>
        <li>
          <Link to="/employees">Employees</Link>
        </li>
      </ul>
    </div>
  );
}
