import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Achievements, Entrance, Home, OurTeam } from "@/pages"
import ErrorPageHandling from './pages/ErrorPageHandling/ErrorPageHandling'

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
          path: "*",
          element: <ErrorPageHandling />
        }
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