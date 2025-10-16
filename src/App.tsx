import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Achievements, Entrance, Home, Management, OurTeam } from "@/pages"
import ErrorPageHandling from './pages/ErrorPageHandling/ErrorPageHandling'
import SearchInput from './pages/Search/SearchInput'
import PhotoRoom from './pages/Search/PhotoRoom'
import { Provider } from 'react-redux'
import { store } from './store'
import { PlannedEventsSection } from './pages/PlannedEvents/PlannedEventsSection'

const App: React.FC = () => {

  const [data, setData] = useState<{ imageData: string[] }>({ imageData: [] })

  const setImageData = (data: string[]) => {
    setData({ imageData: data })
  }

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
          path: "events",
          element: <PlannedEventsSection />
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
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
      {/* <div className='w-full h-screen'>
        <HorseModel />
      </div> */}
      {/* <div className="w-full h-screen flex flex-col items-center overflow-hidden">
        <h1 className='text-center font-bold text-2xl m-2'>React Photo Room</h1>
        <SearchInput setImageData={setImageData} />
        <PhotoRoom imageData={data.imageData}></PhotoRoom>
      </div> */}
    </>
  )
}

export default App