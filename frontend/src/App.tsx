import { AuthProvider } from "./context/AuthContext";
import LeftSidebar from "./components/sidebar/LeftSidebar";
import RightSidebar from "./components/sidebar/RightSidebar";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CreatePost from "./components/create-post/CreatePost";
import CreateQuoteRepost from "./components/create-quote-repost/CreateQuoteRepost";
import CreateComment from "./components/create-comment/CreateComment";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DeletePost from "./components/delete-post/DeletePost";
import "./scss/app.scss";

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
          <CreatePost />
          <CreateQuoteRepost />
          <CreateComment />
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
