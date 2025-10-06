import React, { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Achievements, Entrance, Home, OurTeam } from "@/pages"
import ErrorPageHandling from './pages/ErrorPageHandling/ErrorPageHandling'
import { UI } from './ThreeJS/UI'
import { Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Experience } from './ThreeJS/Experience'

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
          element: (
            <>
              <UI />
              <Loader />
              <Canvas
                shadows
                camera={{
                  position: [-0.5, 1, window.innerWidth > 800 ? 4 : 9],
                  fov: 45,
                }}
              >
                <group position-y={0}>
                  <Suspense fallback={null}>
                    <Experience />
                  </Suspense>
                </group>
              </Canvas>
            </>
          )
        },
        {
          path: "competitions",
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