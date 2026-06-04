import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout/MainLayout";
import HomePage from "../pages/HomePage/HomePage";
import Tasks from '../pages/TasksPage/TasksPage';
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
       {
        path: "/tasks",
        element: <Tasks />,
      },
    ],
  },
]);
