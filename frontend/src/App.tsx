import { createBrowserRouter, RouterProvider } from "react-router";
import {
  Home,
  Signup,
  Login,
  Dashboard,
  Inventory,
  DashboardUI,
} from "./app-components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <DashboardUI />,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
