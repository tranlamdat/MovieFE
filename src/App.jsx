import { useRoutes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import MoviePage from "./pages/movie/MoviePage";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Actor from "./pages/admin/actor/Actor";

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
      path: "/admin",
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "actor",
          element: <Actor />,
        },
      ],
    },
  ]);

  return router;
}

export default App;
