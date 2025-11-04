import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Achievements, Entrance, Home, OurTeam } from "@/pages";
import ErrorPageHandling from "./pages/ErrorPageHandling/ErrorPageHandling";
import { Provider } from "react-redux";
import { store } from "./store";
import Testing from "./pages/Test/Testing";
import LeaderShip from "./pages/Leadership/Leadership";
import Statistics from "./pages/Statistics/Statistics";
import Competetions from "./pages/Competetions/Competetions";
import PlannedEvents from "./pages/PlannedEvents/PlannedEvents";
import { News } from "./pages/News/News";
import { Strategy } from "./pages/Strategy/Strategy";

const App: React.FC = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Entrance />,
      errorElement: <ErrorPageHandling />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "leadership",
          element: <LeaderShip />,
        },
        {
          path: "statistics",
          element: <Statistics />,
        },
        {
          path: "competitions",
          element: <Competetions />,
        },
        {
          path: "achievements",
          element: <Achievements />,
        },
        {
          path: "team",
          element: <OurTeam />,
        },
        {
          path: "events",
          element: <PlannedEvents />,
        },
        {
          path: "news",
          element: <News />,
        },
        {
          path: "strategy",
          element: <Strategy />,
        },
        {
          path: "*",
          element: <ErrorPageHandling />,
        },
      ],
    },
    {
      path: "test",
      element: <Testing />,
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </>
  );
};

export default App;
