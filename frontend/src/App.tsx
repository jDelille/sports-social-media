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
import { EditProfile, Home, LandingPage, Leaderboard, Match, Matches, Profile } from "./pages";
import {
  BetSlip,
  CreateComment,
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
import LeaderboardInfo from "./components/popup/LeaderboardInfo";
import Discover from "./pages/Discover";
import GamePreview from "./components/game-preview/GamePreview";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostPage from "./pages/PostPage";
import Alerts from "./pages/Alerts";
import GroupsPage from "./pages/Groups";
import GroupPage from "./pages/GroupPage";
import { BetPostModal, CreateGroupModal, CreatePostModal, CustomizeProfileModal } from "./components/modals";

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
                <GamePreview />
                <ToastContainer />
                <CreateGroupModal />

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
          path: "/match/:sport/:league",
          element: <Match />,
        },
        {
          path: "/profile/:username",
          element: <Profile />
        },
        {
          path: "/settings/profile",
          element: <EditProfile/>
        },
        {
          path: "/leaderboard",
          element: <Leaderboard/>
        },
        {
          path: "/alerts",
          element: <Alerts />
        },
        {
          path: "/groups",
          element: <GroupsPage />
        },
        {
          path: "/discover/hashtag/:hashtag",
          element: <Discover />
        },
        {
          path: "/post/:postId",
          element: <PostPage />
        },
        {
          path: "/group/:groupId",
          element: <GroupPage />
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
