import { createBrowserRouter, RouterProvider } from "react-router";
import {
  Home,
  AuthPage,
  Dashboard,
  Inventory,
  DashboardUI,
  Employee,
} from "./app-components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth-page",
    element: <AuthPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <DashboardUI />,
      },
    ],
  },
  {
    path: "/employee",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Employee />,
      },
    ],
  },
  {
    path: "/inventory",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Inventory />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
