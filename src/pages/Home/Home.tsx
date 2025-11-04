import React, { useRef, useCallback, useEffect, memo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import logoImage from '@/assets/mudofaLogo.png';
import { OptimizedCanvas } from '@/components/UI/OptimizedCanvas';
import Galaxy from '@/Motion/ReactBits/Galaxy';
import { useAppSelector } from '@/store/hooks';
import LightRays from '@/components/UI/LightRay';

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Use framer-motion's useMotionValue and useSpring for smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700, restDelta: 0.001 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Throttled mouse handling using RAF
  const rafId = useRef<number | undefined>(undefined);
  const isThrottled = useRef(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isThrottled.current) return;

    isThrottled.current = true;
    rafId.current = requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30; // Reduced intensity
      const y = (e.clientY / window.innerHeight - 0.5) * 30;

      mouseX.set(x);
      mouseY.set(y);
      isThrottled.current = false;
    });
  }, [mouseX, mouseY]);

  const { horseAnimationFinished } = useAppSelector(state => state.infoSlice);

  useEffect(() => {
    const handleResize = () => {
      // Reset mouse position on resize
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleMouseMove, mouseX, mouseY]);

  return (
    <>
      {!horseAnimationFinished && (
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

              {/* <h1 className='text-7xl font-normal max-w-[1100px] bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-white'>
                {text[0]}
                <Cursor cursorStyle='|' />
              </h1> */}
            </div>

            <div className='absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-sm'></div>
            <div className='absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-sm'></div>
          </div>
        </div>
      )}

      {/* Optimized Background Effects - Only on Home */}
      <div className='fixed inset-0 z-90 opacity-20'>
        <Galaxy
          mouseInteraction={true}
          starSpeed={3}
          density={0.4}
          speed={0.2}
          glowIntensity={0.6}
          repulsionStrength={1}
        />
      </div>
      <section id="home" ref={containerRef} className="relative h-screen overflow-hidden">
        {/* Optimized Canvas Background */}
        <OptimizedCanvas
          particleCount={typeof window !== 'undefined' ? (window.innerWidth < 768 ? 25 : window.innerWidth < 1024 ? 40 : 60) : 40}
          animationType="background"
        />

        {/* Simplified Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27]/20 via-transparent to-[#0a0e27]/20" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 h-full flex items-center justify-center px-3 sm:px-4 lg:px-6"
        >
          <div className="max-w-[1400px] mx-auto text-center w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: 'spring', stiffness: 100 }}
              style={{
                x: smoothMouseX,
                y: smoothMouseY,
              }}
              className="will-change-transform"
            >
              {/* 3D Logo Container */}
              {horseAnimationFinished && (
                <>
                  <motion.div
                    className="relative flex items-center justify-center mx-auto w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 mb-8 sm:mb-12"
                    initial={{ rotateY: 0, opacity: 0 }}
                    animate={{ rotateY: 360, opacity: 1 }}
                    transition={{
                      rotateY: { duration: 20, repeat: Infinity, ease: 'linear' },
                      opacity: { duration: 1, delay: 0.2 }
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'visible',
                      perspective: '1000px'
                    }}
                  >
                    {/* Optimized orbital rings */}
                    {[1, 2, 3].map((ring) => (
                      <motion.div
                        key={ring}
                        className="absolute inset-0 will-change-transform"
                        animate={{
                          rotateZ: ring % 2 === 0 ? 360 : -360,
                        }}
                        transition={{
                          duration: 8 * ring,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        style={{
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        <div
                          className={`absolute inset-0 rounded-full border-2 ${ring === 1
                            ? 'border-[#00d4ff]/40'
                            : ring === 2
                              ? 'border-purple-500/40'
                              : 'border-yellow-500/40'
                            }`}
                          style={{
                            transform: `scale(${1 + ring * 0.05}) rotateX(${ring * 25}deg)`,
                          }}
                        />
                      </motion.div>
                    ))}

                    {/* Logo with 3D effect */}
                    <motion.div
                      className="relative rounded-full overflow-hidden border-4 border-white/20 shadow-2xl shadow-purple-500/50 m-2 z-2"
                      initial={{ scale: 0 }}
                      animate={{
                        scale: 1,
                        boxShadow: [
                          '0 0 40px rgba(124, 58, 237, 0.5)',
                          '0 0 80px rgba(0, 212, 255, 0.5)',
                          '0 0 40px rgba(251, 191, 36, 0.5)',
                          '0 0 40px rgba(124, 58, 237, 0.5)',
                        ],
                      }}
                      transition={{
                        scale: { duration: 0.8, delay: 0.3 },
                        boxShadow: { duration: 4, repeat: Infinity },
                      }}
                    >
                      <img
                        src={logoImage}
                        alt="Mudofaa Vazirligi Sport Markazi Logo"
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          console.error('Logo image failed to load:', e);
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                        onLoad={() => {
                          console.log('Logo image loaded successfully');
                        }}
                      />
                    </motion.div>

                    {/* Reduced particles around logo for better performance */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full will-change-transform"
                        style={{
                          left: '50%',
                          top: '50%',
                          background: ['#00d4ff', '#7c3aed', '#fbbf24'][i % 3],
                        }}
                        animate={{
                          x: Math.cos((i * Math.PI * 2) / 8) * 120,
                          y: Math.sin((i * Math.PI * 2) / 8) * 120,
                          scale: [0, 1, 0],
                          opacity: [0, 0.8, 0],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: i * 0.15,
                          ease: "easeInOut"
                        }}
                      />
                    ))}

                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00d4ff] via-purple-500 to-yellow-500 blur-3xl opacity-50"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>

                  {/* Title with 3D text effect */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="space-y-2 sm:space-y-3 lg:space-y-4 mb-40"
                  >
                    <h1 className="text-md sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-white/95">
                      <span className="bg-gradient-to-r from-slate-200 via-white to-slate-100 bg-clip-text text-transparent tracking-wide">
                        O'zbekiston Respublikasi
                      </span>
                    </h1>
                    <h2 className="text-sm sm:text-md md:text-xl lg:text-2xl font-normal text-white/80 tracking-wide">
                      Mudofa Vazirligi Sport Markazi
                    </h2>
                  </motion.div>
                </>
              )}

            </motion.div>
          </div>
        </motion.div>

        {/* Optimized floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute will-change-transform"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 100,
              }}
              animate={{
                y: -100,
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              }}
              transition={{
                duration: Math.random() * 8 + 12,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random() * 3,
              }}
            >
              <div className={`w-4 h-4 rounded-full ${i % 3 === 0 ? 'bg-[#00d4ff]/30' :
                i % 3 === 1 ? 'bg-purple-500/30' :
                  'bg-yellow-500/30'
                }`} />
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default memo(Home);