import { AuthContext, AuthProvider } from "./context/AuthContext";
import LeftSidebar from "./components/sidebar/LeftSidebar";
import RightSidebar from "./components/sidebar/RightSidebar";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateQuoteRepost from "./components/create-quote-repost/CreateQuoteRepost";
import CreateComment from "./components/create-comment/CreateComment";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DeletePost from "./components/delete-post/DeletePost";
import LoginReminder from "./components/login-reminder/LoginReminder";
import Matches from "./pages/Matches";
import Match from "./pages/Match";
import BetSlip from "./components/bet-slip/BetSlip";
import LandingPage from "./pages/LandingPage";
import { useContext } from "react";
import CreatePostModal from "./components/create-post-modal/CreatePostModal";
import "./scss/app.scss";
import SignUpBar from "./components/sign-up-bar/SignUpBar";

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const { currentUser } = useContext(AuthContext);

    if (pathname === "/" && currentUser) {
      return <Navigate to="/home" />;
    }

    return (
      <QueryClientProvider client={queryClient}>
        <div className="layout">
          {pathname === "/" && !currentUser ? (
            <>
              <Login />
              <LandingPage />
            </>
          ) : (
            <>
              <LeftSidebar currentUser={currentUser} />
              <div className="main-content">
                <Register />
                <Login />
                <CreateQuoteRepost />
                <CreateComment />
                <CreatePostModal />
                <LoginReminder />
                <BetSlip />
                <Outlet />
                <DeletePost />
              </div>
              <RightSidebar currentUser={currentUser} />
              <SignUpBar currentUser={currentUser}/>
            </>
          )}
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
          path: "/home",
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
        <div className="app">
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
