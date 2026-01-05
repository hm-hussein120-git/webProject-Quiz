import { createBrowserRouter } from "react-router";
import Root from "./root";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "employees",
                lazy: () => import("./routes/employees._index/route"),
            },
            {
                path: "employees/:employeeId",
                lazy: () => import("./routes/employees.$employeeId._index/route"),
            },
            {
                path: "timesheets",
                lazy: () => import("./routes/timesheets._index/route"),
            },
            {
                path: "timesheets/new",
                lazy: () => import("./routes/timesheets.new/route"),
            },
            {
                path: "timesheets/:timesheetId",
                lazy: () => import("./routes/timesheets.$timesheetId._index/route"),
            },
        ],
    },
]);
