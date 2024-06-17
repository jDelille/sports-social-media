import { AuthProvider } from "./context/AuthContext";
import LeftSidebar from "./components/sidebar/LeftSidebar";
import RightSidebar from "./components/sidebar/RightSidebar";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateQuoteRepost from "./components/create-quote-repost/CreateQuoteRepost";
import CreateComment from "./components/create-comment/CreateComment";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DeletePost from "./components/delete-post/DeletePost";
import "./scss/app.scss";
import LoginReminder from "./components/login-reminder/LoginReminder";
import Matches from "./pages/Matches";
import Match from "./pages/Match";
import BetSlip from "./components/bet-slip/BetSlip";

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
      <div className="layout">
        <LeftSidebar />
        <div className="main-content">
          <Login />
          <Register />
          <CreateQuoteRepost />
          <CreateComment />
          <LoginReminder />
          <BetSlip />
          <Outlet />
          <DeletePost />
        </div>
        <RightSidebar />
      </div>
      </QueryClientProvider>

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
        {
          path: "/matches",
          element: <Matches />,
        },
        {
          path: "/match",
          element: <Match />,
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
