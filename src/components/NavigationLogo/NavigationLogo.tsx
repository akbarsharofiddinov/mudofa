import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import logoImage from '@/assets/mudofaLogo.png';

interface NavigationLogoProps {
  className?: string;
}

const NavigationLogo: React.FC<NavigationLogoProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleLogoClick = () => {
    navigate('/');
  };

  if (isHomePage) {
    // On home page, logo is part of the main content (centered)
    return null;
  }

  // On other pages, show logo in top-left corner
  return (
    <button
      className={`group fixed top-4 left-4 z-[999] px-2.5 py-1 rounded-full transition-all hover:shadow-xl ${className}`}
      onClick={handleLogoClick}
      aria-label="Go home"
    >
      <motion.div
        className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
        initial={{ rotateY: 0, opacity: 0 }}
        animate={{ rotateY: 360, opacity: 1 }}
        transition={{
          rotateY: { duration: 20, repeat: Infinity, ease: 'linear' },
          opacity: { duration: 0.8 }
        }}
        style={{ transformStyle: 'preserve-3d' }}
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
              className={`absolute inset-0 rounded-full border-2 ${
                ring === 1
                  ? 'border-[#00d4ff]/40'
                  : ring === 2
                    ? 'border-purple-500/40'
                    : 'border-yellow-500/40'
              }`}
              style={{
                transform: `scale(${1 + ring * 0.12}) rotateX(${ring * 25}deg)`,
              }}
            />
          </motion.div>
        ))}

        {/* Logo with 3D effect */}
        <motion.div
          className="relative rounded-full overflow-hidden border-4 border-white/20 shadow-2xl shadow-purple-500/50 m-2 z-10"
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
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Logo image failed to load:', e);
              (e.target as HTMLImageElement).style.display = 'none';
            }}
            onLoad={() => {
              console.log('Navigation logo loaded successfully');
            }}
          />
        </motion.div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00d4ff] via-purple-500 to-yellow-500 blur-2xl opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
      </motion.div>
    </button>
  );
};

export default NavigationLogo;