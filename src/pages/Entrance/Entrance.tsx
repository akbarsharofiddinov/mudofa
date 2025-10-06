import ShinyText from '@/components/UI/ShinyText';
import { LogIn } from 'lucide-react';
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavigationLogo from '@/components/NavigationLogo';
import { Cursor, useTypewriter } from 'react-simple-typewriter';

const navItems = [
  {
    label: "Biz haqimizda",
    link: "about"
  },
  {
    label: "Statistika",
    link: "statistics"
  },
  {
    label: "Rahbariyat",
    link: "management"
  },
  {
    label: "Erishilgan yutuqlar",
    link: "achievements"
  },
  {
    label: "O’tkazilgan musobaqalar",
    link: "competitions"
  },
  {
    label: "Bizning jamoa",
    link: "team"
  },
  {
    label: "Rejalashtirilgan sport tadbirlari",
    link: "events"
  },
  {
    label: "Yangiliklar",
    link: "news"
  },
  {
    label: "Bizning strategiya",
    link: "strategy"
  },
  {
    label: "Yaratilgan imkoniyat",
    link: "opportunities"
  },
];

const Entrance: React.FC = () => {
  const [showEntrance, setShowEntrance] = useState(true)
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

  const navigate = useNavigate();

  return (
    <>
      <main className={`w-full h-screen transition-all duration-500`}>
        <NavigationLogo />
        <Outlet />

        {/* Log in button */}
        <button className="flex items-center flex-row-reverse gap-2 fixed top-4 right-4 z-90">

          <ShinyText>
            <div className='flex items-center gap-2 text-white'>
              <LogIn /> Kirish
            </div>
          </ShinyText>
        </button>




      </main>

      <nav className={`fixed inset-x-0 bottom-0 z-20 w-full bg-yellow-500/10 backdrop-blur-md border-t border-yellow-500/30 py-6 transition-all duration-1000 opacity-100 translate-y-0`}>
        <div className="navbar-container w-full mx-auto px-8 lg:px-12 xl:px-16 2xl:px-20 relative">
          {/* Timeline Navigation Items - Yellow Theme */}
          <ul className="relative flex items-center justify-between min-h-[70px] w-full">
            {/* Gradient Dotted Line */}
            <div className="gradient-dotted-line absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2 z-0"></div>

            {navItems.map((item, index) => (
              <li key={index} onClick={() => navigate(item.link)} className="flex-1 relative z-10">
                <div className="motion-navigation-item group cursor-pointer relative flex flex-col items-center justify-center p-2 transition-all duration-300 hover:scale-105">
                  <div className="motion-navigation-dot w-2 h-2 rounded-full mb-2 transition-all duration-300 bg-yellow-500/60 group-hover:bg-yellow-500 group-hover:shadow-[0_0_15px_yellow] group-hover:scale-150"></div>
                  <div className="motion-navigation-label text-xs text-white/70 group-hover:text-yellow-300 font-medium tracking-wider transition-all duration-300 text-center leading-tight max-w-[90px]">
                    {item.label}
                  </div>
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-yellow-500"></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Entrance Overlay */}
      {showEntrance && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-xl'>
          <div className='relative w-full flex items-center z-90 justify-center h-screen p-8 bg-white/10 backdrop-blur-md'>

            <div className='text-center flex flex-col items-center break-words text-white space-y-6'>
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