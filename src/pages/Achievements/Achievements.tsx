import React, { Suspense } from 'react'
import { UI } from '@/ThreeJS/Book/UI'
import { Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Experience } from '@/ThreeJS/Book/Experience'
import Beams from '@/Motion/ReactBits/Beams'

const Achievements: React.FC = () => {
  return (
    <>
      <div className='absolute inset-0'>
        <Beams />
      </div>
      <UI />
      {/* Left side */}
      <div className='absolute left-20 top-[22%] text-white max-w-[300px] max-h-[400px] custom-scrollbar overflow-y-auto bg-white/15 p-4 rounded-md border-1 border-white/30'>
        <ul className='flex flex-col gap-4'>
          <li>1. O‘zbekiston jamoasi Osiyo chempioni bo‘ldi.</li>
          <li>2. ⚽ Real Madrid kuchli g‘alabaga erishdi.</li>
          <li>3. 🏀 NBAda yangi mavsum rasman boshlandi.</li>
          <li>4. 🥇 Djokovic yana “Grand Slam” g‘olibi bo‘ldi.</li>
          <li>5. 🏃 Bolt rekordini hali hech kim yangilamadi.</li>
          <li>5. 🏃 Bolt rekordini hali hech kim yangilamadi.</li>
          <li>5. 🏃 Bolt rekordini hali hech kim yangilamadi.</li>
          <li>5. 🏃 Bolt rekordini hali hech kim yangilamadi.</li>
          <li>5. 🏃 Bolt rekordini hali hech kim yangilamadi.</li>
          <li>5. 🏃 Bolt rekordini hali hech kim yangilamadi.</li>
          <li>5. 🏃 Bolt rekordini hali hech kim yangilamadi.</li>
          <li>5. 🏃 Bolt rekordini hali hech kim yangilamadi.</li>
        </ul>
      </div>
      {/* Book */}
      <Loader />
      <Canvas
        shadows
        camera={{
          position: [-0.5, 1, window.innerWidth > 800 ? 4 : 9],
          fov: 45,
        }}
        style={{width: "80%", marginLeft: "auto"}}
      >
        <group position-y={0}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </group>
      </Canvas>
    </>
  )
}

export default Achievements