import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Verification from "./utils/Verification";
import Guest from "./utils/Guest";
import Categories from "./pages/Categories";
// const token = Cookies.get('token')

export default createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Verification>
            <Home />
          </Verification>
        ),
      },
      {
        path: "/login",
        element: (
          <Guest>
            <Login />
          </Guest>
        ),
      },
      {
        path: "/register",
        element: (
          <Guest>
            <Register />
          </Guest>
        )
      },
      {
        path: "/category",
        element: (
          <Verification>
            <Categories/>
          </Verification>
        )
      },
    ],
  },
]);
// token ? <Home /> : <Navigate to="/login"  replace={true} />,
