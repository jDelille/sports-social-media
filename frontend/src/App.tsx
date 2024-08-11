import { AuthContext, AuthProvider } from "./context/AuthContext";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useContext } from "react";
import { EditProfile, Home, LandingPage, Match, Matches, Profile } from "./pages";
import {
  BetSlip,
  CreateComment,
  CreatePostModal,
  CreateQuoteRepost,
  DeletePost,
  LeftSidebar,
  Login,
  LoginReminder,
  Register,
  RightSidebar,
  SignUpBar,
} from "./components";
import "./scss/app.scss";
import AccountCreated from "./components/popup/AccountCreated";
import CustomizeProfileModal from "./components/customize-profile-modal/CustomizeProfileModal";
import BetPostModal from "./components/bet-post-modal/BetPostModal";
import LeaderboardInfo from "./components/popup/LeaderboardInfo";


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
              <Register />
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
                <AccountCreated />
                <CustomizeProfileModal />
                <BetPostModal />
                <LeaderboardInfo />
              </div>
              <RightSidebar currentUser={currentUser} />
              <SignUpBar currentUser={currentUser} />
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
        {
          path: "/profile/:username",
          element: <Profile />
        },
        {
          path: "/settings/profile",
          element: <EditProfile/>
        }
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
