// FlashAndLogo.tsx
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
  show: boolean;
  onEnd?: () => void;
  /** Butun sahna necha ms ichida yakun topsin (enter+exit) */
  totalMs?: number; // default 1200
};

const GOLD_1 = "#F4D37E";
const GOLD_2 = "#D4AF37";
const BLUE   = "#1E3A8A";
const AURORA = "rgba(160,120,255,0.25)";

export default function FlashAndLogo({ show, onEnd, totalMs = 1200 }: Props) {
  // “sessiya” – har safar show=true bo‘lganda sparkles uchun yangi seed
  const [session, setSession] = useState(0);

  useEffect(() => {
    if (show) setSession((s) => s + 1);
  }, [show]);

  // Sparkle joylashuvi – sessiya ichida BARQAROR
  const sparkles = useMemo(() => {
    const N = 18;
    const arr: { x: number; y: number; delay: number }[] = [];
    // deterministik “random”: session asosida
    const rand = (() => {
      let s = (session * 9301 + 49297) % 233280;
      return () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
      };
    })();

    for (let i = 0; i < N; i++) {
      const d = 140 + rand() * 220;
      const a = (i / N) * Math.PI * 2 + rand() * 0.4;
      arr.push({
        x: Math.cos(a) * d,
        y: Math.sin(a) * d,
        delay: 0.05 * (i % 6),
      });
    }
    return arr;
  }, [session]);

  // Enter + Exit vaqtlarini ajratamiz: enter ~ 900ms, exit ~ 300ms = totalMs
  const enterMs = Math.max(600, Math.min(1000, totalMs - 300));
  const exitMs = Math.max(200, totalMs - enterMs);

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        onEnd?.(); // faqat exit tugagach
      }}
      initial={false}
    >
      {show && (
        <motion.div
          key={session} // sessiya bo‘yicha remount
          className="fixed inset-0 z-[60] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: exitMs / 1000 } }}
          style={{
            willChange: "opacity, transform",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        >
          {/* --- Darken backdrop (subtle) --- */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ duration: 0.25 }}
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.0) 65%)",
              willChange: "opacity, transform",
              backfaceVisibility: "hidden",
              transform: "translateZ(0)",
            }}
          />

          {/* --- Core flash --- */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            initial={{ scale: 0.2, opacity: 1 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: enterMs / 1000 * 0.58, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              width: 480,
              height: 480,
              background: `radial-gradient(circle, ${GOLD_1} 0%, ${GOLD_2} 35%, rgba(255,255,255,0.0) 65%)`,
              willChange: "opacity, transform",
              backfaceVisibility: "hidden",
              transform: "translateZ(0)",
            }}
          />

          {/* --- Blue corona --- */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
            initial={{ scale: 0.6, opacity: 0.9 }}
            animate={{ scale: 2.6, opacity: 0 }}
            transition={{ duration: enterMs / 1000 * 0.75, ease: "easeOut" }}
            style={{
              width: 560,
              height: 560,
              boxShadow: `0 0 120px 30px ${BLUE}`,
              border: `2px solid ${BLUE}`,
              filter: "blur(2px)",
              willChange: "opacity, transform",
              backfaceVisibility: "hidden",
              transform: "translateZ(0)",
            }}
          />

          {/* --- Pulse rings (2 dona) --- */}
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
              initial={{ scale: 0.5, opacity: 0.9, rotate: 0 }}
              animate={{ scale: 3.1, opacity: 0, rotate: 60 * (i ? -1 : 1) }}
              transition={{
                duration: enterMs / 1000,
                delay: i * 0.06,
                ease: "easeOut",
              }}
              style={{
                width: 520,
                height: 520,
                border: `2px solid ${GOLD_1}`,
                boxShadow: `0 0 60px 10px ${GOLD_1}`,
                willChange: "opacity, transform",
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
              }}
            />
          ))}

          {/* --- Radiant rays (conic gradient) --- */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden"
            initial={{ scale: 0.8, opacity: 0.7, rotate: 0 }}
            animate={{ scale: 2.4, opacity: 0, rotate: 120 }}
            transition={{ duration: enterMs / 1000 * 0.92, ease: "easeOut" }}
            style={{
              width: 640,
              height: 640,
              filter: "blur(2px)",
              willChange: "opacity, transform",
              backfaceVisibility: "hidden",
              transform: "translateZ(0)",
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: `conic-gradient(from 0deg,
                  ${AURORA} 0deg, transparent 12deg,
                  ${GOLD_1} 20deg, transparent 32deg,
                  ${AURORA} 40deg, transparent 54deg,
                  ${GOLD_2} 62deg, transparent 78deg,
                  ${AURORA} 86deg, transparent 100deg,
                  ${GOLD_1} 108deg, transparent 124deg,
                  ${GOLD_2} 132deg, transparent 148deg,
                  ${AURORA} 156deg, transparent 172deg,
                  ${GOLD_1} 180deg, transparent 196deg,
                  ${AURORA} 204deg, transparent 220deg,
                  ${GOLD_2} 228deg, transparent 244deg,
                  ${AURORA} 252deg, transparent 268deg,
                  ${GOLD_1} 276deg, transparent 292deg,
                  ${AURORA} 300deg, transparent 316deg,
                  ${GOLD_2} 324deg, transparent 340deg,
                  ${AURORA} 348deg, transparent 360deg)`,
                mixBlendMode: "screen",
              }}
            />
          </motion.div>

          {/* --- Sparkles (barqaror) --- */}
          {sparkles.map(({ x, y, delay }, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 rounded-full"
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.2 }}
              animate={{ x, y, opacity: [0, 1, 0], scale: [0.2, 1, 0.2] }}
              transition={{ duration: enterMs / 1000 * 0.75, delay, ease: "easeOut" }}
              style={{
                width: 6,
                height: 6,
                background: `radial-gradient(circle, #FFFFFF, ${GOLD_1} 70%, rgba(255,255,255,0) 75%)`,
                boxShadow: `0 0 16px 4px ${GOLD_1}`,
                mixBlendMode: "screen",
                willChange: "opacity, transform",
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
