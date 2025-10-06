import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import mudofaLogo from '@/assets/mudofaLogo.png';

const AnimatedLogo: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Add periodic emphasis animation
    const interval = setInterval(() => {
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.6, ease: "easeInOut" }
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [controls]);

  return (
    <div className="relative">
      {/* Glow backdrop layers */}
      <motion.div
        className="absolute inset-0 w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 165, 0, 0.3) 0%, rgba(255, 215, 0, 0.2) 30%, rgba(255, 140, 0, 0.1) 60%, transparent 100%)',
          filter: 'blur(20px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Secondary glow layer */}
      <motion.div
        className="absolute inset-0 w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, rgba(255, 165, 0, 0.2) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }}
        animate={{
          scale: [1.1, 0.9, 1.1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />

      {/* Orbiting particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
          style={{
            filter: 'blur(1px)',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear"
          }}
          initial={{
            x: Math.cos((i * 60 * Math.PI) / 180) * (120 + i * 10),
            y: Math.sin((i * 60 * Math.PI) / 180) * (120 + i * 10),
          }}
        />
      ))}

      {/* Main logo container */}
      <motion.div
        className="relative z-10"
        initial={{
          opacity: 0,
          scale: 0.3,
          rotateY: -180,
          rotateX: 45
        }}
        animate={isLoaded ? {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          rotateX: 0,
          y: [-5, 5, -5]
        } : {}}
        transition={{
          opacity: { duration: 1.2, ease: "easeOut" },
          scale: { duration: 1.4, ease: "backOut" },
          rotateY: { duration: 1.6, ease: "easeOut" },
          rotateX: { duration: 1.2, ease: "easeOut" },
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.6
          }
        }}
        whileHover={{
          scale: 1.15,
          rotateZ: [0, 3, -3, 0],
          transition: {
            scale: { duration: 0.3 },
            rotateZ: { duration: 0.6, ease: "easeInOut" }
          }
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Logo shadow */}
        <motion.img
          src={mudofaLogo}
          alt="Mudofa Logo Shadow"
          className="absolute top-2 left-2 w-64 h-64 opacity-30 blur-sm"
          style={{
            filter: 'brightness(0) saturate(100%) invert(12%) sepia(100%) saturate(7426%) hue-rotate(18deg) brightness(96%) contrast(106%)',
          }}
          animate={{
            opacity: isHovered ? 0.5 : 0.3,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Main logo with enhanced effects */}
        <motion.img
          src={mudofaLogo}
          alt="Mudofa Logo"
          className="w-64 h-64 relative"
          style={{
            filter: `
              drop-shadow(0 0 20px rgba(255, 165, 0, 0.8))
              drop-shadow(0 0 40px rgba(255, 215, 0, 0.6))
              drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))
              brightness(1.1)
              contrast(1.1)
              saturate(1.2)
            `,
          }}
          animate={{
            filter: isHovered
              ? `
                drop-shadow(0 0 30px rgba(255, 165, 0, 1))
                drop-shadow(0 0 60px rgba(255, 215, 0, 0.8))
                drop-shadow(0 15px 40px rgba(0, 0, 0, 0.4))
                brightness(1.2)
                contrast(1.2)
                saturate(1.3)
              `
              : `
                drop-shadow(0 0 20px rgba(255, 165, 0, 0.8))
                drop-shadow(0 0 40px rgba(255, 215, 0, 0.6))
                drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))
                brightness(1.1)
                contrast(1.1)
                saturate(1.2)
              `
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Shine effect overlay */}
        <motion.div
          className="absolute inset-0 w-64 h-64 rounded-full overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute -inset-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: isHovered ? "200%" : "-100%",
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut"
            }}
            style={{
              transform: "rotate(45deg)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Pulsing ring effect */}
      <motion.div
        className="absolute inset-0 w-64 h-64 border-2 border-yellow-400/30 rounded-full pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Secondary pulsing ring */}
      <motion.div
        className="absolute inset-0 w-64 h-64 border border-orange-400/20 rounded-full pointer-events-none"
        animate={{
          scale: [1.1, 1.5, 1.1],
          opacity: [0.2, 0.05, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Sparkle effects */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-yellow-400"
          style={{
            left: `${20 + Math.cos((i * 45 * Math.PI) / 180) * 140}px`,
            top: `${20 + Math.sin((i * 45 * Math.PI) / 180) * 140}px`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.25
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedLogo;