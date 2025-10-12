import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Achievements, Entrance, Home, Management, OurTeam } from "@/pages"
import ErrorPageHandling from './pages/ErrorPageHandling/ErrorPageHandling'
import Lanyard from './ThreeJS/Book/Lanyard/Lanyard'

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
          path: "team",
          element: <OurTeam />
        },
        {
          path: "achievements",
          element: <Achievements />
        },
        {
          path: "competitions",
          element: <></>
        },
        {
          path: "management",
          element: <Management />
        },
        {
          path: "*",
          element: <ErrorPageHandling />
        },
      ]
    },
  ])

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App