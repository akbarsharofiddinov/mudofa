import { useState, useRef, useCallback, useEffect, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import logoImage from '@assets/74f914656c0a924cde5ec3bef5c1603a1193e836.png';
import { OptimizedCanvas } from '@/components/UI/OptimizedCanvas';

export const Hero = memo(function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth - 0.5) * 40,
      y: (e.clientY / window.innerHeight - 0.5) * 40,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Use optimized canvas instead of complex animation

  return (
    <section id="home" ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Optimized Canvas Background */}
      <OptimizedCanvas
        particleCount={window.innerWidth < 768 ? 50 : window.innerWidth < 1024 ? 80 : 120}
        animationType="hero"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27]/30 via-transparent to-[#0a0e27]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1),transparent_50%)]" />

      {/* Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 h-full flex items-center justify-center px-3 sm:px-4 lg:px-6"
      >
        <div className="max-w-[1400px] mx-auto text-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: 'spring', stiffness: 100 }}
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            }}
            className="transition-transform duration-300 ease-out"
          >
            {/* 3D Logo Container */}
            <motion.div
              className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 mb-8 sm:mb-12"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Orbital rings */}
              {[1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute inset-0"
                  animate={{
                    rotateZ: ring % 2 === 0 ? 360 : -360,
                  }}
                  transition={{
                    duration: 10 * ring,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    className={`absolute inset-0 rounded-full border-2 ${ring === 1
                      ? 'border-[#00d4ff]/30'
                      : ring === 2
                        ? 'border-purple-500/30'
                        : 'border-yellow-500/30'
                      }`}
                    style={{
                      transform: `scale(${1 + ring * 0.15}) rotateX(${ring * 30}deg)`,
                    }}
                  />
                </motion.div>
              ))}

              {/* Logo with 3D effect */}
              <motion.div
                className="absolute inset-0 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl shadow-purple-500/50 m-5"
                animate={{
                  boxShadow: [
                    '0 0 40px rgba(124, 58, 237, 0.5)',
                    '0 0 80px rgba(0, 212, 255, 0.5)',
                    '0 0 40px rgba(251, 191, 36, 0.5)',
                    '0 0 40px rgba(124, 58, 237, 0.5)',
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              >
                <img
                  src={logoImage}
                  alt="Mudofaa Vazirligi Sport Markazi Logo"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Particles around logo */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    background: ['#00d4ff', '#7c3aed', '#fbbf24'][i % 3],
                  }}
                  animate={{
                    x: Math.cos((i * Math.PI * 2) / 12) * 150,
                    y: Math.sin((i * Math.PI * 2) / 12) * 150,
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
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
              className="space-y-2 sm:space-y-3 lg:space-y-4"
            >
              {/* <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl tracking-tight leading-tight">
                <motion.span
                  className="block bg-gradient-to-r from-[#00d4ff] via-white to-[#00d4ff] bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                  style={{
                    backgroundSize: '200% auto',
                    textShadow: '0 0 40px rgba(0,212,255,0.5)',
                  }}
                >
                  O'ZBEKISTON RESPUBLIKASI
                </motion.span>
                
                <motion.span
                  className="block text-white mt-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(255,255,255,0.3)',
                      '0 0 40px rgba(124,58,237,0.5)',
                      '0 0 20px rgba(255,255,255,0.3)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  MUDOFAA VAZIRLIGI
                </motion.span>
                
                <motion.span
                  className="block bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 bg-clip-text text-transparent mt-4"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                  style={{
                    backgroundSize: '200% auto',
                    textShadow: '0 0 40px rgba(251,191,36,0.5)',
                  }}
                >
                  SPORT MARKAZI
                </motion.span>
              </h1> */}

              {/* Subtitle with typing effect */}
              {/* <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 max-w-4xl mx-auto mt-4 sm:mt-6 lg:mt-8 px-2"
              >
                <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-[#00d4ff]/10 via-purple-500/10 to-yellow-500/10 backdrop-blur-xl border border-white/10">
                  Kuchli ruh, kuchli tana - Vatanimiz uchun!
                </span>
              </motion.p> */}
            </motion.div>

            {/* CTA Buttons with 3D effects */}
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-6 sm:mt-8 lg:mt-12 w-full px-2"
            >
              <motion.a
                href="#about"
                whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl overflow-hidden w-full sm:w-auto"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] via-purple-500 to-yellow-500" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-purple-500 to-[#00d4ff]"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 text-white flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base">
                  <Award size={20} className="sm:w-6 sm:h-6" />
                  Batafsil ma'lumot
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] to-purple-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              </motion.a>

              <motion.a
                href="#events"
                whileHover={{ scale: 1.05, rotateX: -5, rotateY: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl border-2 border-white/30 backdrop-blur-xl overflow-hidden w-full sm:w-auto"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 text-white flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base">
                  <Target size={20} className="sm:w-6 sm:h-6" />
                  Tadbirlar kalendari
                </span>
              </motion.a>
            </motion.div> */}

            {/* Stats with 3D cards */}
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-8 sm:mt-12 lg:mt-16 w-full max-w-5xl mx-auto px-2"
            >
              {[
                { icon: Trophy, value: '214', label: 'Respublika miqyosi' },
                { icon: Award, value: '163', label: 'Xalqaro miqyosi' },
                { icon: Users, value: '813', label: 'Sportchilar' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, rotateY: 10 }}
                  className="relative group"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative px-8 py-6 rounded-2xl bg-gradient-to-br from-[#00d4ff]/10 via-purple-500/10 to-yellow-500/10 backdrop-blur-xl border border-white/10">
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-[#00d4ff]" />
                    <div className="text-3xl text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </motion.div> */}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator with animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-3 text-white/70 hover:text-white transition-colors group"
        >
          <span className="text-sm tracking-wider uppercase">Pastga aylantiring</span>
          <motion.div
            className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
            whileHover={{ borderColor: 'rgba(255,255,255,0.8)' }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
          <ChevronDown className="group-hover:translate-y-2 transition-transform" size={24} />
        </motion.a>
      </motion.div>

      {/* Simplified floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
            }}
            animate={{
              y: -100,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          >
            <div className={`w-6 h-6 rounded-full ${i % 3 === 0 ? 'bg-[#00d4ff]/20' :
              i % 3 === 1 ? 'bg-purple-500/20' :
                'bg-yellow-500/20'
              }`} />
          </motion.div>
        ))}
      </div>
    </section>
  );
});