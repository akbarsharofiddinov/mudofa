import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
// import { getTranslation } from '@/utils/translations';
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import {
  Award,
  Users,
  Target,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Trophy,
  Sparkles,
  Clipboard,
  Timer,
  Radio,
  Medal,
  Flag,
  Zap,
  TrendingUp,
  BarChart3,
  Star,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/UI/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/tabs";
import leaderImage from "@/assets/leadership.png";

interface Leader {
  name: string;
  position: string;
  image: string;
  specialty: string;
  email: string;
  phone: string;
  experience: string;
  education: string;
  awards: string[];
  bio: string;
  skills: { name: string; level: number }[];
  stats: { label: string; value: string }[];
}

const LeaderShip: React.FC = () => {
  const { language } = useLanguage();
  // const t = getTranslation(language);
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const leaders: Leader[] = [
    {
      name: "General Aziz Rahimov",
      position: language === "uz" ? "Direktor" : "Директор",
      image: leaderImage,
      specialty: "Strategik boshqaruv",
      email: "aziz.rahimov@modsport.uz",
      phone: "+998 71 234 56 78",
      experience: "25 yildan ortiq",
      education: "Harbiy Akademiya, MBA",
      awards: ["Shukhrat ordeni", "O'zbekiston Qahramoni", "Sport mukofoti"],
      bio: "General Aziz Rahimov 25 yildan ortiq vaqt davomida harbiy va sport sohasida xizmat qilmoqda.",
      skills: [
        { name: "Strategik rejalashtirish", level: 98 },
        { name: "Liderlik", level: 95 },
        { name: "Jamoa boshqaruv", level: 92 },
        { name: "Xalqaro aloqalar", level: 90 },
      ],
      stats: [
        { label: "Loyihalar", value: "150+" },
        { label: "Jamoalar", value: "35" },
        { label: "Yutuqlar", value: "200+" },
      ],
    },
    {
      name: "Colonel Sherzod Karimov",
      position: language === "uz" ? "O'rinbosar" : "Заместитель",
      image: leaderImage,
      specialty: "Sport tadbirlari",
      email: "sherzod.karimov@modsport.uz",
      phone: "+998 71 234 56 79",
      experience: "15 yil",
      education: "Sport Akademiyasi, Menejment",
      awards: ["Jasorat medali", "Eng yaxshi menejer", "Sport rivojiga hissa"],
      bio: "Colonel Sherzod Karimov sport tadbirlarini tashkil etish va boshqarish bo'yicha katta tajribaga ega.",
      skills: [
        { name: "Loyiha boshqaruv", level: 94 },
        { name: "Tadbir tashkiloti", level: 96 },
        { name: "Budjet rejalashtirish", level: 88 },
        { name: "Muloqot", level: 93 },
      ],
      stats: [
        { label: "Tadbirlar", value: "500+" },
        { label: "Hamkorlar", value: "80+" },
        { label: "Loyihalar", value: "120+" },
      ],
    },
    {
      name: "Mayor Dilshod Tursunov",
      position: language === "uz" ? "Bosh murabbiy" : "Главный тренер",
      image: leaderImage,
      specialty: "O'q otish sport",
      email: "dilshod.tursunov@modsport.uz",
      phone: "+998 71 234 56 80",
      experience: "12 yil",
      education: "Jismoniy tarbiya instituti",
      awards: ["Eng yaxshi murabbiy", "Oltin medal (Osiyo)", "Xizmat medali"],
      bio: "Mayor Dilshod Tursunov O'q otish bo'yicha malakali murabbiy, 50 dan ortiq sportchilarni tayyorlagan.",
      skills: [
        { name: "Sportchilarni tayyorlash", level: 97 },
        { name: "Texnik ko'nikma", level: 95 },
        { name: "Psixologik yordam", level: 91 },
        { name: "Trening rejalashtirish", level: 93 },
      ],
      stats: [
        { label: "Sportchilar", value: "50+" },
        { label: "Medallar", value: "85+" },
        { label: "Rekordlar", value: "12" },
      ],
    },
    {
      name: "Kapitan Rustam Aliyev",
      position: language === "uz" ? "Tibbiyot bo'limi" : "Медицинский отдел",
      image: leaderImage,
      specialty: "Sport tibbiyoti",
      email: "rustam.aliyev@modsport.uz",
      phone: "+998 71 234 56 81",
      experience: "10 yil",
      education: "Tibbiyot Akademiyasi",
      awards: [
        "Eng yaxshi shifokor",
        "Tibbiy innovatsiya",
        "Xizmat sertifikati",
      ],
      bio: "Kapitan Rustam Aliyev sport tibbiyoti sohasida malakali mutaxassis.",
      skills: [
        { name: "Diagnostika", level: 92 },
        { name: "Reabilitatsiya", level: 94 },
        { name: "Profilaktika", level: 89 },
        { name: "Shoshilinch yordam", level: 96 },
      ],
      stats: [
        { label: "Bemorlar", value: "1200+" },
        { label: "Operatsiyalar", value: "450+" },
        { label: "Reabilitatsiya", value: "800+" },
      ],
    },
    {
      name: "Litenent Sardor Yusupov",
      position: language === "uz" ? "Yoshlar bo'limi" : "Отдел молодежи",
      image: leaderImage,
      specialty: "Yoshlar rivojlanishi",
      email: "sardor.yusupov@modsport.uz",
      phone: "+998 71 234 56 82",
      experience: "8 yil",
      education: "Pedagogika instituti",
      awards: [
        "Eng yaxshi o'qituvchi",
        "Yoshlar ishonchi",
        "Innovatsiya mukofoti",
      ],
      bio: "Litenent Sardor Yusupov yoshlar bilan ishlash bo'yicha tajribali mutaxassis.",
      skills: [
        { name: "Yoshlar bilan ishlash", level: 95 },
        { name: "Psixologik yordam", level: 90 },
        { name: "Dastur ishlab chiqish", level: 88 },
        { name: "Motivatsiya", level: 93 },
      ],
      stats: [
        { label: "Talabalar", value: "300+" },
        { label: "Dasturlar", value: "25+" },
        { label: "Loyihalar", value: "40+" },
      ],
    },
    {
      name: "Ofitser Nodira Rahimova",
      position: language === "uz" ? "Moliya bo'limi" : "Финансовый отдел",
      image: leaderImage,
      specialty: "Moliya va budjet",
      email: "nodira.rahimova@modsport.uz",
      phone: "+998 71 234 56 84",
      experience: "14 yil",
      education: "Iqtisodiyot universiteti, MBA",
      awards: [
        "Eng yaxshi moliyachi",
        "Innovatsiya mukofoti",
        "Professional mukofot",
      ],
      bio: "Ofitser Nodira Rahimova moliya sohasida malakali mutaxassis.",
      skills: [
        { name: "Budjet rejalashtirish", level: 97 },
        { name: "Moliyaviy tahlil", level: 95 },
        { name: "Hisobot", level: 93 },
        { name: "Audit", level: 91 },
      ],
      stats: [
        { label: "Budjet", value: "$5M+" },
        { label: "Loyihalar", value: "200+" },
        { label: "Yillar", value: "14" },
      ],
    },
  ];

  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`h-screen pt-10 pb-18 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950"
          : "bg-gradient-to-br from-slate-50 via-white to-emerald-50"
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {isDark ? (
          <>
            <motion.div
              className="absolute top-20 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                x: [0, -50, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            />
          </>
        ) : (
          <>
            {/* Light mode elegant background */}
            <motion.div
              className="absolute top-10 right-20 w-96 h-96 bg-gradient-to-br from-slate-200/40 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-emerald-200/40 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                y: [0, -40, 0],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-amber-200/20 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Professional grid pattern */}
            <svg
              className="absolute inset-0 w-full h-full opacity-20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="leadership-grid"
                  width="60"
                  height="60"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="30"
                    cy="30"
                    r="2"
                    fill="rgb(71, 85, 105)"
                    opacity="0.4"
                  />
                  <circle
                    cx="10"
                    cy="10"
                    r="1"
                    fill="rgb(16, 185, 129)"
                    opacity="0.3"
                  />
                  <path
                    d="M 60 0 L 0 0 0 60"
                    fill="none"
                    stroke="rgb(71, 85, 105)"
                    strokeWidth="0.5"
                    opacity="0.2"
                  />
                  <path
                    d="M 0 60 L 60 0"
                    fill="none"
                    stroke="rgb(16, 185, 129)"
                    strokeWidth="0.3"
                    opacity="0.15"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#leadership-grid)" />
            </svg>
            {/* Decorative corner accents */}
            <svg
              className="absolute top-0 left-0 w-64 h-64 opacity-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M 0 0 L 200 0 L 0 200 Z" fill="url(#corner-gradient)" />
              <defs>
                <linearGradient
                  id="corner-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgb(16, 185, 129)" />
                  <stop offset="100%" stopColor="rgb(251, 191, 36)" />
                </linearGradient>
              </defs>
            </svg>
            <svg
              className="absolute bottom-0 right-0 w-64 h-64 opacity-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 256 256 L 56 256 L 256 56 Z"
                fill="url(#corner-gradient-2)"
              />
              <defs>
                <linearGradient
                  id="corner-gradient-2"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgb(59, 130, 246)" />
                  <stop offset="100%" stopColor="rgb(16, 185, 129)" />
                </linearGradient>
              </defs>
            </svg>
          </>
        )}

        {/* Coaching & Training Symbols */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Radio/Communication symbols */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`radio-${i}`}
              className={`absolute ${
                isDark ? "text-emerald-500/20" : "text-emerald-600/15"
              }`}
              style={{
                left: `${15 + i * 15}%`,
                top: `${10 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <Radio size={40 + i * 5} strokeWidth={1.5} />
            </motion.div>
          ))}

          {/* Clipboard symbols */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`clipboard-${i}`}
              className={`absolute ${
                isDark ? "text-amber-500/20" : "text-amber-600/15"
              }`}
              style={{
                right: `${10 + i * 18}%`,
                top: `${15 + (i % 2) * 30}%`,
              }}
              animate={{
                y: [0, 15, 0],
                x: [0, -10, 0],
                rotate: [0, -5, 5, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                delay: i * 0.7,
              }}
            >
              <Clipboard size={35 + i * 4} strokeWidth={1.5} />
            </motion.div>
          ))}

          {/* Timer/Stopwatch symbols */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`timer-${i}`}
              className={`absolute ${
                isDark ? "text-blue-500/20" : "text-blue-600/15"
              }`}
              style={{
                left: `${20 + i * 22}%`,
                bottom: `${15 + (i % 2) * 25}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                delay: i * 0.6,
              }}
            >
              <Timer size={38 + i * 3} strokeWidth={1.5} />
            </motion.div>
          ))}

          {/* Medal symbols */}
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={`medal-${i}`}
              className={`absolute ${
                isDark ? "text-purple-500/20" : "text-purple-600/15"
              }`}
              style={{
                right: `${5 + i * 14}%`,
                bottom: `${10 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 15, -15, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 7 + i,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            >
              <Medal size={32 + i * 4} strokeWidth={1.5} />
            </motion.div>
          ))}

          {/* Trophy symbols */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`trophy-${i}`}
              className={`absolute ${
                isDark ? "text-yellow-500/20" : "text-yellow-600/15"
              }`}
              style={{
                left: `${10 + i * 25}%`,
                top: `${60 + (i % 2) * 15}%`,
              }}
              animate={{
                y: [0, 20, 0],
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 6 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.8,
              }}
            >
              <Trophy size={45 + i * 5} strokeWidth={1.5} />
            </motion.div>
          ))}

          {/* Target symbols */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`target-${i}`}
              className={`absolute ${
                isDark ? "text-red-500/20" : "text-red-600/15"
              }`}
              style={{
                right: `${15 + i * 17}%`,
                top: `${40 + (i % 3) * 15}%`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 9 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <Target size={36 + i * 3} strokeWidth={1.5} />
            </motion.div>
          ))}

          {/* Flag symbols */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`flag-${i}`}
              className={`absolute ${
                isDark ? "text-cyan-500/20" : "text-cyan-600/15"
              }`}
              style={{
                left: `${30 + i * 20}%`,
                bottom: `${40 + (i % 2) * 20}%`,
              }}
              animate={{
                x: [0, 10, 0],
                rotate: [0, 5, -5, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.6,
              }}
            >
              <Flag size={40 + i * 4} strokeWidth={1.5} />
            </motion.div>
          ))}

          {/* BarChart symbols */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`chart-${i}`}
              className={`absolute ${
                isDark ? "text-indigo-500/20" : "text-indigo-600/15"
              }`}
              style={{
                right: `${25 + i * 25}%`,
                bottom: `${55 + i * 10}%`,
              }}
              animate={{
                y: [0, -12, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 7 + i,
                repeat: Infinity,
                delay: i * 0.9,
              }}
            >
              <BarChart3 size={38 + i * 5} strokeWidth={1.5} />
            </motion.div>
          ))}

          {/* Star symbols */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className={`absolute ${
                isDark ? "text-pink-500/20" : "text-pink-600/15"
              }`}
              style={{
                left: `${5 + i * 12}%`,
                top: `${5 + (i % 4) * 22}%`,
              }}
              animate={{
                scale: [1, 1.4, 1],
                rotate: [0, 72, 144, 216, 288, 360],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 10 + i,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              <Star size={28 + i * 2} strokeWidth={1.5} />
            </motion.div>
          ))}

          {/* Zap/Energy symbols */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`zap-${i}`}
              className={`absolute ${
                isDark ? "text-orange-500/20" : "text-orange-600/15"
              }`}
              style={{
                right: `${8 + i * 20}%`,
                top: `${25 + (i % 3) * 18}%`,
              }}
              animate={{
                y: [0, -25, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            >
              <Zap size={34 + i * 3} strokeWidth={1.5} />
            </motion.div>
          ))}

          {/* TrendingUp symbols */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`trend-${i}`}
              className={`absolute ${
                isDark ? "text-teal-500/20" : "text-teal-600/15"
              }`}
              style={{
                left: `${40 + i * 15}%`,
                bottom: `${8 + i * 18}%`,
              }}
              animate={{
                x: [0, 15, 0],
                y: [0, -10, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                delay: i * 0.7,
              }}
            >
              <TrendingUp size={36 + i * 4} strokeWidth={1.5} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >

          <h2 className="text-3xl md:text-4xl mb-4 bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent">
            {language === "uz"
              ? "Rahbariyat"
              : language === "ru"
              ? "Руководство"
              : "Раҳбарият"}
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-500 to-emerald-500 mx-auto rounded-full" />
        </motion.div>

        {/* Orbital Leadership Display */}
        <div className="relative flex items-center justify-center min-h-[440px]">
          {/* Central Hub */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="relative w-32 h-32">
              {/* Center Circle */}
              <motion.div
                className="w-full h-full rounded-full bg-gradient-to-br from-slate-900/95 to-emerald-900/70 backdrop-blur-xl border-4 border-amber-500/60 shadow-2xl flex items-center justify-center"
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(251, 191, 36, 0.4)",
                    "0 0 60px rgba(16, 185, 129, 0.6)",
                    "0 0 30px rgba(251, 191, 36, 0.4)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-center">
                  <Users className="w-4 h-4 text-amber-400 mx-auto mb-2" />
                  <div className="text-emerald-400 text-3xl">
                    {leaders.length}
                  </div>
                  <div className="text-amber-200/70 text-sm">
                    {language === "uz"
                      ? "Rahbarlar"
                      : language === "ru"
                      ? "Лидеров"
                      : "Раҳбарлар"}
                  </div>
                </div>
              </motion.div>

              {/* Connection Lines with Animation */}
              {leaders.map((_, index) => {
                const angle = (index * 360) / leaders.length;
                const isHovered = hoveredIndex === index;

                return (
                  <motion.div
                    key={`line-${index}`}
                    className="absolute top-1/2 left-1/2 origin-left"
                    style={{
                      width: "160px",
                      height: "4px",
                      transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-500 via-emerald-500 to-transparent rounded-full"
                      animate={{
                        opacity: isHovered ? 1 : 0.3,
                        height: isHovered ? "6px" : "4px",
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Flowing Particle */}
                    <motion.div
                      className="absolute w-3 h-3 bg-amber-400 rounded-full shadow-lg"
                      animate={{
                        x: [0, 280],
                        opacity: [0, 1, 1, 0],
                        scale: [0.5, 1, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                        ease: "linear",
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Orbiting Leader Profiles */}
          {leaders.map((leader, index) => {
            const angle = (index * 360) / leaders.length;
            const radius = 160;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <motion.div
                key={index}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x,
                  y,
                }}
                transition={{
                  duration: 1,
                  delay: index * 0.12,
                  x: { duration: 0.8 },
                  y: { duration: 0.8 },
                }}
                whileHover={{ scale: 1.15, zIndex: 50 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => setSelectedLeader(leader)}
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-amber-500/50 to-emerald-500/50 rounded-full blur-xl"
                  animate={{
                    scale: hoveredIndex === index ? [1.5, 1.8, 1.5] : 1,
                    opacity: hoveredIndex === index ? [0.7, 1, 0.7] : 0.3,
                  }}
                  transition={{
                    duration: 1,
                    repeat: hoveredIndex === index ? Infinity : 0,
                  }}
                />

                <div className="relative">
                  {/* Rank Badge */}
                  <motion.div
                    className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-emerald-500 flex items-center justify-center text-white shadow-2xl z-20 border-2 border-white/20"
                    animate={{
                      rotate: hoveredIndex === index ? 360 : 0,
                      scale: hoveredIndex === index ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-sm">{index + 1}</span>
                  </motion.div>

                  {/* Profile Image */}
                  <motion.div
                    className="w-24 h-24 rounded-full border-4 overflow-hidden shadow-2xl relative bg-slate-900"
                    animate={{
                      borderColor:
                        hoveredIndex === index
                          ? [
                              "rgb(251, 191, 36)",
                              "rgb(16, 185, 129)",
                              "rgb(251, 191, 36)",
                            ]
                          : "rgba(251, 191, 36, 0.6)",
                    }}
                    transition={{
                      duration: 2,
                      repeat: hoveredIndex === index ? Infinity : 0,
                    }}
                  >
                    <ImageWithFallback
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                  </motion.div>

                  {/* Info Panel */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-64 bg-gradient-to-br from-slate-900/98 to-emerald-900/80 backdrop-blur-xl border-2 border-amber-500/60 rounded-xl p-4 shadow-2xl z-30"
                      >
                        <h3 className="text-base text-amber-300 mb-1">
                          {leader.name}
                        </h3>
                        <p className="text-emerald-400 text-xs mb-3">
                          {leader.position}
                        </p>

                        <div className="space-y-1.5 mb-3">
                          <div className="flex items-center gap-2 text-xs text-amber-200/70">
                            <Target className="w-3 h-3 text-amber-500" />
                            <span>{leader.specialty}</span>
                          </div>
                        </div>

                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLeader(leader);
                          }}
                          className="w-full py-2 bg-gradient-to-r from-amber-500 to-emerald-500 text-white rounded-lg text-xs flex items-center justify-center gap-2 shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>
                            {language === "uz"
                              ? "Batafsil"
                              : language === "ru"
                              ? "Подробнее"
                              : "Батафсил"}
                          </span>
                          <Sparkles className="w-3 h-3" />
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Leader Details Modal */}
      <Dialog
        open={!!selectedLeader}
        onOpenChange={() => setSelectedLeader(null)}
      >
        <DialogContent
          className={`min-w-[800px] max-w-[800px] max-h-[75vh] overflow-y-auto border ${
            isDark
              ? "bg-gradient-to-br from-slate-900/95 to-emerald-900/60 border-amber-500/40 text-white"
              : "bg-gradient-to-br from-white via-emerald-50/50 to-white border-emerald-300/50 text-gray-900"
          }`}
        >
          {selectedLeader && (
            <>
              <DialogHeader>
                <DialogTitle
                  className={`text-xl font-light flex items-center gap-3 ${
                    isDark ? "text-amber-300" : "text-gray-800"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-emerald-500 flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  {selectedLeader.name}
                </DialogTitle>
                <DialogDescription
                  className={isDark ? "text-emerald-400" : "text-emerald-600"}
                >
                  {selectedLeader.position}
                </DialogDescription>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-3 mt-1">
                <div className="space-y-6">
                  <motion.div
                    className="relative rounded-xl overflow-hidden flex items-center justify-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <ImageWithFallback
                      src={selectedLeader.image}
                      alt={selectedLeader.name}
                      className="w-32 h-2w-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  </motion.div>

                  <div
                    className={`rounded-xl p-2 border ${
                      isDark
                        ? "bg-slate-800/50 border-amber-500/20"
                        : "bg-emerald-50/50 border-emerald-300/40"
                    }`}
                  >
                    <h4
                      className={`mb-2 flex items-center gap-2 ${
                        isDark ? "text-amber-300" : "text-emerald-700"
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-xs">{language === "uz" ? "Aloqa" : "Контакты"}</span>
                    </h4>
                    <div className="space-y-3">
                      <div
                        className={`flex items-center gap-3 ${
                          isDark ? "text-emerald-400" : "text-gray-700"
                        }`}
                      >
                        <Mail className="w-4 h-4" />
                        <span className="text-xs">{selectedLeader.email}</span>
                      </div>
                      <div
                        className={`flex items-center gap-3 ${
                          isDark ? "text-emerald-400" : "text-gray-700"
                        }`}
                      >
                        <Phone className="w-4 h-4" />
                        <span className="text-xs">{selectedLeader.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {selectedLeader.stats.map((stat, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-amber-500/20 to-emerald-500/20 rounded-xl p-2 text-center border border-amber-500/30"
                      >
                        <div className="text-lg text-amber-400">
                          {stat.value}
                        </div>
                        <div className="text-[10px] text-amber-200/70 ">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <Tabs defaultValue="about" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
                      <TabsTrigger
                        value="about"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-emerald-500"
                      >
                        {language === "uz" ? "Haqida" : "О себе"}
                      </TabsTrigger>
                      <TabsTrigger
                        value="skills"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-emerald-500"
                      >
                        {language === "uz" ? "Ko'nikmalar" : "Навыки"}
                      </TabsTrigger>
                      <TabsTrigger
                        value="awards"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-emerald-500"
                      >
                        {language === "uz" ? "Mukofotlar" : "Награды"}
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="about" className="space-y-4">
                      <div className="bg-slate-800/50 rounded-xl p-3 border border-amber-500/20">
                        <h5 className="text-emerald-400 mb-2 flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          <span className="text-xs">{language === "uz" ? "Tajriba" : "Опыт"}</span>
                        </h5>
                        <p className="text-amber-200/70 text-xs">
                          {selectedLeader.experience}
                        </p>
                      </div>

                      <div className="bg-slate-800/50 rounded-xl p-3 border border-amber-500/20">
                        <h5 className="text-emerald-400 mb-2 flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          <span className="text-xs">{language === "uz" ? "Ta'lim" : "Образование"}</span>
                        </h5>
                        <p className="text-amber-200/70 text-xs">
                          {selectedLeader.education}
                        </p>
                      </div>

                      <div className="bg-slate-800/50 rounded-xl p-3 border border-amber-500/20">
                        <h5 className="text-emerald-400 mb-3">
                          <span className="text-xs">{language === "uz" ? "Biografiya" : "Биография"}</span>
                        </h5>
                        <p className="text-amber-200/70 text-xs leading-relaxed">
                          {selectedLeader.bio}
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="skills" className="space-y-4">
                      {selectedLeader.skills.map((skill, index) => (
                        <motion.div
                          key={index}
                          className="bg-slate-800/50 rounded-xl p-4 border border-amber-500/20"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex justify-between mb-2">
                            <span className="text-emerald-400 text-sm">
                              {skill.name}
                            </span>
                            <span className="text-amber-400 text-sm">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </TabsContent>

                    <TabsContent value="awards" className="space-y-3">
                      {selectedLeader.awards.map((award, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3 bg-slate-800/50 rounded-xl p-4 border border-amber-500/20"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                            <Trophy className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-amber-200/90 text-sm">
                            {award}
                          </span>
                        </motion.div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default LeaderShip;
