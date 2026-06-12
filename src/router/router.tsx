import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout/MainLayout";
import HomePage from "../pages/HomePage/HomePage";
import Tasks from '../pages/TasksPage/TasksPage';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import StatisticsPage from '../pages/StatisticsPage/StatisticsPage';
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
path: '/',
element: <WelcomePage/>
      },
      {
        path: "/home",
        element: <HomePage />,
      },
        {
         path: "/tasks",
         element: <Tasks />,
       },
       {
         path: "/statistics",
         element: <StatisticsPage />,
       },
    ],
  },
]);
