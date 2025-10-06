import { useEffect, useRef, useCallback, memo } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
  type: 'circle' | 'star' | 'triangle';
}

interface OptimizedCanvasProps {
  particleCount?: number;
  animationType?: 'hero' | 'background' | 'static';
  className?: string;
}

export const OptimizedCanvas = memo(function OptimizedCanvas({
  particleCount = 50,
  animationType = 'background',
  className = ''
}: OptimizedCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);

  const colors = ['#00d4ff', '#7c3aed', '#fbbf24', '#ffffff'];

  const createParticle = useCallback((canvas: HTMLCanvasElement): Particle => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * 1000,
    vx: (Math.random() - 0.5) * (animationType === 'hero' ? 2 : 0.5),
    vy: (Math.random() - 0.5) * (animationType === 'hero' ? 2 : 0.5),
    vz: Math.random() * 2 + 1,
    size: Math.random() * 3 + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    type: ['circle', 'star', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'star' | 'triangle'
  }), [animationType]);

  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: Particle, scale: number, alpha: number) => {
    const x = particle.x;
    const y = particle.y;
    const size = particle.size * scale;

    ctx.save();
    ctx.globalAlpha = alpha;

    if (particle.type === 'circle') {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
      gradient.addColorStop(0, particle.color + Math.floor(alpha * 100).toString(16).padStart(2, '0'));
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, size * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    } else if (particle.type === 'star') {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const radius = i % 2 === 0 ? size : size / 2;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x + px, y + py);
        else ctx.lineTo(x + px, y + py);
      }
      ctx.closePath();
      ctx.fillStyle = particle.color;
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x - size * 0.866, y + size * 0.5);
      ctx.lineTo(x + size * 0.866, y + size * 0.5);
      ctx.closePath();
      ctx.fillStyle = particle.color;
      ctx.fill();
    }

    ctx.restore();
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Clear canvas with optimized fill
    ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    timeRef.current += 0.01;
    const time = timeRef.current;

    particlesRef.current.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.z -= particle.vz;

      // Add wave motion for hero animation
      if (animationType === 'hero') {
        particle.x += Math.sin(time + index * 0.1) * 0.5;
        particle.y += Math.cos(time + index * 0.1) * 0.5;
      }

      // Boundary checks
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      if (particle.z < 0) {
        particle.z = 1000;
        particle.x = Math.random() * canvas.width;
        particle.y = Math.random() * canvas.height;
      }

      // 3D perspective
      const scale = 1000 / (1000 + particle.z);
      const alpha = Math.min(1, scale);

      // Draw particle
      drawParticle(ctx, particle, scale, alpha);

      // Draw connections for hero animation
      if (animationType === 'hero' && index < 10) {
        particlesRef.current.slice(index + 1, index + 5).forEach(p2 => {
          const dx = particle.x - p2.x;
          const dy = particle.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - distance / 150) * 0.3;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      }
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [animationType, drawParticle]);

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();

    // Initialize particles
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle(canvas));
    }

    // Start animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animate();
  }, [particleCount, createParticle, animate]);

  useEffect(() => {
    initializeCanvas();

    const handleResize = () => {
      initializeCanvas();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initializeCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none opacity-20 ${className}`}
      style={{ background: 'transparent' }}
    />
  );
});

