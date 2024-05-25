import { AuthProvider } from "./context/AuthContext";
import LeftSidebar from "./components/sidebar/LeftSidebar";
import RightSidebar from "./components/sidebar/RightSidebar";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import "./scss/globals.scss";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const Layout = () => {
    return (
      <div className="layout">
        <LeftSidebar />
        <div className="main-content">
          <Login />
          <Register />
          <Outlet />
        </div>
        <RightSidebar />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ]);

  return (
    <>
      <AuthProvider>
        <div>
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
