import { createBrowserRouter, RouterProvider } from "react-router";
import { Home, Signup, Login, Dashboard } from "./app-components";

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
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
