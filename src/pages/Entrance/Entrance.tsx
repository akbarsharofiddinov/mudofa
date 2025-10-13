import ShinyText from '@/components/UI/ShinyText';
import { LogIn } from 'lucide-react';
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavigationLogo from '@/components/NavigationLogo';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import LightRays from '@/components/UI/LaytRay';
import EnhancedTimelineNav from '@/EnhancedTimelineNav';

const navItems = [
  { label: "Rahbariyat", link: "management" },
  { label: "Statistika", link: "statistics" },
  { label: "Musobaqalar", link: "competitions" },
  { label: "Yutuqlar", link: "achievements" },
  { label: "Bizning Jamoa", link: "team" },
  { label: "Tadbirlar", link: "events" },
  { label: "Yangiliklar", link: "news" },
  { label: "Bizning strategiya", link: "strategy" },
];

const Entrance: React.FC = () => {
  const [showEntrance, setShowEntrance] = useState(false)
  const text = useTypewriter({
    words: ["O’zbekiston Respublikasi Mudofa Vazirligi Sport Markazi"],
    loop: 1,
    typeSpeed: 100,
    deleteSpeed: 50,
    delaySpeed: 1000,
    onLoopDone: () => {
      setTimeout(() => {
        setShowEntrance(false)
      }, 1000);
    },
  })

  return (
    <>
      <main className={`w-full h-screen transition-all duration-500`}>
        <NavigationLogo />
        <Outlet />

        {/* Log in button */}
        <button className="flex items-center flex-row-reverse gap-2 fixed top-4 right-4 z-90">

          <ShinyText>
            <div className='flex items-center gap-2 text-white text-[14px]'>
              <LogIn size={20} /> Kirish
            </div>
          </ShinyText>
        </button>

      </main>

      {!showEntrance && (
        <>
          < EnhancedTimelineNav items={navItems} betweenDots={8} />
        </>
      )}

      {/* Entrance Overlay */}
      {showEntrance && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-xl'>

          <div className='relative w-full flex items-center z-90 justify-center h-screen p-8 backdrop-blur-md'>
            <LightRays raysOrigin="top-center"
              raysColor="#00ffff"
              raysSpeed={1.5}
              lightSpread={0.8}
              rayLength={1.2}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
              className="custom-rays h-screen" />

            <div className='text-center absolute inset-0 flex flex-col justify-center items-center break-words text-white space-y-6'>

              <h1 className='text-7xl font-normal max-w-[1100px] bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-white'>
                {text[0]}
                <Cursor cursorStyle='|' />
              </h1>
            </div>

            <div className='absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-sm'></div>
            <div className='absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-sm'></div>
          </div>
        </div>
      )}
    </>
  )
}

export default Entrance