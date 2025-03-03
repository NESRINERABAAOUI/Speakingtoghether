import Client from "../pages/admin/Client";
import Dashboard from "../pages/admin/Dashboard";
import Translator from "../pages/admin/Translator";

const dashboardRoutes = [
  { path: "dashboard", element: <Dashboard /> },
  { path: "translator", element: <Translator /> },
  { path: "client", element: <Client /> },
];

export default dashboardRoutes;
