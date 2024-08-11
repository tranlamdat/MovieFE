import { Navigate, useRoutes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import MoviePage from "./pages/movie/MoviePage";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Actor from "./pages/admin/actor/Actor";
import Director from "./pages/admin/director/Director";
import Genre from "./pages/admin/genre/Genre";
import AdminMovie from "./pages/admin/movie/Movie";
import ProfilePage from "./pages/profile/ProfilePage";
import WatchListPage from "./pages/watch-lists/WatchListPage";

function App() {
  const router = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/sign-up",
      element: <RegisterPage />,
    },
    {
      path: "/movie/:movieId",
      element: <MoviePage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/watch-lists",
      element: <WatchListPage />
    },
    {
      path: "/admin",
      children: [
        {
          path: "",
          element: <Navigate to="/admin/dashboard" />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "actor",
          element: <Actor />,
        },
        {
          path: "director",
          element: <Director />,
        },
        {
          path: "genre",
          element: <Genre />,
        },
        {
          path: "movie",
          element: <AdminMovie />,
        },
      ],
    },
  ]);

  return router;
}

export default App;
