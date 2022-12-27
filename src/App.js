import logo from "./logo.svg";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CartView from "./components/CartView";

export const ProtectedRoute = (props) => {
  const token = localStorage.getItem("ECOMM_TOKEN");
  if (!!token == false) return <Navigate to="/login" />;
  return <props.component />;
};

export const PublicRoute = (props) => {
  const token = localStorage.getItem("ECOMM_TOKEN");
  if (token) return <Navigate to="/dashboard" />;
  return <props.component />;
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute component={Signup} />,
    },
    {
      path: "/signup",
      element: <PublicRoute component={Signup} />,
    },
    {
      path: "/login",
      element: <PublicRoute component={Login} />,
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute component={Dashboard} />,
    },
    {
      path: "/cartview",
      element: <ProtectedRoute component={CartView} />,
    },
  ]);
  return (
    <div className="App">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
