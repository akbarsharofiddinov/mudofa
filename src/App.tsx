import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Achievements, Entrance, Home } from "@/pages"
import News from './pages/News/News'

const App: React.FC = () => {

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Entrance />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "news",
          element: <News />
        },
        {
          path: "achievements",
          element: <Achievements />
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