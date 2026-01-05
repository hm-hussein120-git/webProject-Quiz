import type { RouteConfig } from "@react-router/dev/routes";

export default [
    {
        path: "/",
        file: "routes/_index/route.tsx",
    },
    {
        path: "/employees",
        file: "routes/employees._index/route.tsx",
    },
    {
        path: "/employees/new",
        file: "routes/employees.new/route.tsx",
    },
    {
        path: "/employees/:employeeId",
        file: "routes/employees.$employeeId._index/route.tsx",
    },
    {
        path: "/timesheets",
        file: "routes/timesheets._index/route.tsx",
    },
    {
        path: "/timesheets/new",
        file: "routes/timesheets.new/route.tsx",
    },
    {
        path: "/timesheets/:timesheetId",
        file: "routes/timesheets.$timesheetId._index/route.tsx",
    },
] satisfies RouteConfig;
