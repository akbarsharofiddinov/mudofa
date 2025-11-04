/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { getTranslation } from "@/utils/translations";
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Target,
  Swords,
  Users,
  Zap,
  Shield,
  Activity,
  Circle,
  Flame,
  Crosshair,
  Dumbbell,
} from "lucide-react";
import { Badge } from "@/components/UI/badge";

interface SportStats {
  id: number;
  sportUz: string;
  sportRu: string;
  icon: React.ComponentType<any>;
  iconColor: string;
  data2025: {
    republicGold: number;
    republicSilver: number;
    republicBronze: number;
    intlGold: number;
    intlSilver: number;
    intlBronze: number;
  };
  data2024: {
    republicGold: number;
    republicSilver: number;
    republicBronze: number;
    intlGold: number;
    intlSilver: number;
    intlBronze: number;
  };
  data2023: {
    republicGold: number;
    republicSilver: number;
    republicBronze: number;
    intlGold: number;
    intlSilver: number;
    intlBronze: number;
  };
}

const Statistics: React.FC = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = getTranslation(language);
  const [selectedYear, setSelectedYear] = useState<2023 | 2024 | 2025>(2025);
  const [hoveredSport, setHoveredSport] = useState<number | null>(null);
  const [animatedCounts, setAnimatedCounts] = useState<{
    [key: string]: number;
  }>({});

  const isDark = theme === "dark";

  const sportsData: SportStats[] = [
    // Shooting - First Priority
    {
      id: 9,
      sportUz: "O'q otish",
      sportRu: "Стрельба",
      icon: Crosshair,
      iconColor: "text-red-400",
      data2025: {
        republicGold: 8,
        republicSilver: 4,
        republicBronze: 3,
        intlGold: 2,
        intlSilver: 1,
        intlBronze: 0,
      },
      data2024: {
        republicGold: 7,
        republicSilver: 6,
        republicBronze: 5,
        intlGold: 1,
        intlSilver: 1,
        intlBronze: 3,
      },
      data2023: {
        republicGold: 8,
        republicSilver: 5,
        republicBronze: 0,
        intlGold: 1,
        intlSilver: 4,
        intlBronze: 2,
      },
    },
    {
      id: 1,
      sportUz: "Boks",
      sportRu: "Бокс",
      icon: Shield,
      iconColor: "text-red-500",
      data2025: {
        republicGold: 6,
        republicSilver: 2,
        republicBronze: 2,
        intlGold: 2,
        intlSilver: 3,
        intlBronze: 2,
      },
      data2024: {
        republicGold: 0,
        republicSilver: 0,
        republicBronze: 0,
        intlGold: 9,
        intlSilver: 9,
        intlBronze: 6,
      },
      data2023: {
        republicGold: 6,
        republicSilver: 1,
        republicBronze: 2,
        intlGold: 1,
        intlSilver: 2,
        intlBronze: 2,
      },
    },
    {
      id: 2,
      sportUz: "Taekvondo",
      sportRu: "Тхэквондо",
      icon: Flame,
      iconColor: "text-orange-500",
      data2025: {
        republicGold: 0,
        republicSilver: 0,
        republicBronze: 0,
        intlGold: 20,
        intlSilver: 7,
        intlBronze: 6,
      },
      data2024: {
        republicGold: 2,
        republicSilver: 3,
        republicBronze: 1,
        intlGold: 9,
        intlSilver: 3,
        intlBronze: 6,
      },
      data2023: {
        republicGold: 3,
        republicSilver: 0,
        republicBronze: 0,
        intlGold: 19,
        intlSilver: 8,
        intlBronze: 16,
      },
    },
    {
      id: 3,
      sportUz: "Erkak kurash",
      sportRu: "Мужская борьба",
      icon: Swords,
      iconColor: "text-purple-500",
      data2025: {
        republicGold: 2,
        republicSilver: 1,
        republicBronze: 0,
        intlGold: 0,
        intlSilver: 0,
        intlBronze: 1,
      },
      data2024: {
        republicGold: 2,
        republicSilver: 0,
        republicBronze: 1,
        intlGold: 1,
        intlSilver: 1,
        intlBronze: 1,
      },
      data2023: {
        republicGold: 1,
        republicSilver: 1,
        republicBronze: 1,
        intlGold: 0,
        intlSilver: 2,
        intlBronze: 0,
      },
    },
    {
      id: 4,
      sportUz: "Jyudo",
      sportRu: "Дзюдо",
      icon: Users,
      iconColor: "text-indigo-500",
      data2025: {
        republicGold: 5,
        republicSilver: 0,
        republicBronze: 2,
        intlGold: 9,
        intlSilver: 7,
        intlBronze: 5,
      },
      data2024: {
        republicGold: 5,
        republicSilver: 2,
        republicBronze: 5,
        intlGold: 23,
        intlSilver: 18,
        intlBronze: 11,
      },
      data2023: {
        republicGold: 6,
        republicSilver: 0,
        republicBronze: 0,
        intlGold: 10,
        intlSilver: 14,
        intlBronze: 10,
      },
    },
    {
      id: 5,
      sportUz: "Og'ir atlet",
      sportRu: "Тяжелая атлетика",
      icon: Dumbbell,
      iconColor: "text-amber-500",
      data2025: {
        republicGold: 3,
        republicSilver: 0,
        republicBronze: 1,
        intlGold: 1,
        intlSilver: 2,
        intlBronze: 4,
      },
      data2024: {
        republicGold: 2,
        republicSilver: 0,
        republicBronze: 0,
        intlGold: 5,
        intlSilver: 5,
        intlBronze: 2,
      },
      data2023: {
        republicGold: 3,
        republicSilver: 0,
        republicBronze: 0,
        intlGold: 0,
        intlSilver: 2,
        intlBronze: 2,
      },
    },
    {
      id: 6,
      sportUz: "Engil atlet",
      sportRu: "Легкая атлетика",
      icon: Activity,
      iconColor: "text-emerald-500",
      data2025: {
        republicGold: 10,
        republicSilver: 2,
        republicBronze: 1,
        intlGold: 11,
        intlSilver: 5,
        intlBronze: 8,
      },
      data2024: {
        republicGold: 25,
        republicSilver: 7,
        republicBronze: 6,
        intlGold: 21,
        intlSilver: 20,
        intlBronze: 13,
      },
      data2023: {
        republicGold: 35,
        republicSilver: 20,
        republicBronze: 17,
        intlGold: 30,
        intlSilver: 20,
        intlBronze: 15,
      },
    },
    {
      id: 7,
      sportUz: "Baydarka eshkak",
      sportRu: "Байдарка и каноэ",
      icon: Activity,
      iconColor: "text-blue-500",
      data2025: {
        republicGold: 17,
        republicSilver: 13,
        republicBronze: 10,
        intlGold: 5,
        intlSilver: 7,
        intlBronze: 3,
      },
      data2024: {
        republicGold: 19,
        republicSilver: 7,
        republicBronze: 0,
        intlGold: 1,
        intlSilver: 3,
        intlBronze: 3,
      },
      data2023: {
        republicGold: 19,
        republicSilver: 7,
        republicBronze: 6,
        intlGold: 3,
        intlSilver: 3,
        intlBronze: 2,
      },
    },
    {
      id: 8,
      sportUz: "Basketbol",
      sportRu: "Баскетбол",
      icon: Circle,
      iconColor: "text-orange-400",
      data2025: {
        republicGold: 1,
        republicSilver: 0,
        republicBronze: 0,
        intlGold: 0,
        intlSilver: 1,
        intlBronze: 0,
      },
      data2024: {
        republicGold: 0,
        republicSilver: 0,
        republicBronze: 0,
        intlGold: 0,
        intlSilver: 0,
        intlBronze: 0,
      },
      data2023: {
        republicGold: 2,
        republicSilver: 0,
        republicBronze: 0,
        intlGold: 0,
        intlSilver: 1,
        intlBronze: 1,
      },
    },
    {
      id: 10,
      sportUz: "Kamoddan otish",
      sportRu: "Стрельба из лука",
      icon: Target,
      iconColor: "text-green-500",
      data2025: {
        republicGold: 10,
        republicSilver: 3,
        republicBronze: 1,
        intlGold: 3,
        intlSilver: 1,
        intlBronze: 0,
      },
      data2024: {
        republicGold: 8,
        republicSilver: 1,
        republicBronze: 1,
        intlGold: 0,
        intlSilver: 2,
        intlBronze: 2,
      },
      data2023: {
        republicGold: 11,
        republicSilver: 2,
        republicBronze: 1,
        intlGold: 0,
        intlSilver: 0,
        intlBronze: 2,
      },
    },
    {
      id: 11,
      sportUz: "Tennis",
      sportRu: "Теннис",
      icon: Circle,
      iconColor: "text-yellow-500",
      data2025: {
        republicGold: 0,
        republicSilver: 0,
        republicBronze: 0,
        intlGold: 0,
        intlSilver: 0,
        intlBronze: 0,
      },
      data2024: {
        republicGold: 0,
        republicSilver: 0,
        republicBronze: 0,
        intlGold: 0,
        intlSilver: 0,
        intlBronze: 0,
      },
      data2023: {
        republicGold: 0,
        republicSilver: 0,
        republicBronze: 0,
        intlGold: 0,
        intlSilver: 0,
        intlBronze: 0,
      },
    },
    {
      id: 12,
      sportUz: "Trampolin",
      sportRu: "Батут",
      icon: Activity,
      iconColor: "text-pink-500",
      data2025: {
        republicGold: 1,
        republicSilver: 0,
        republicBronze: 1,
        intlGold: 0,
        intlSilver: 1,
        intlBronze: 0,
      },
      data2024: {
        republicGold: 0,
        republicSilver: 1,
        republicBronze: 1,
        intlGold: 0,
        intlSilver: 0,
        intlBronze: 1,
      },
      data2023: {
        republicGold: 2,
        republicSilver: 0,
        republicBronze: 0,
        intlGold: 0,
        intlSilver: 1,
        intlBronze: 0,
      },
    },
    {
      id: 13,
      sportUz: "Qalich'bozlik",
      sportRu: "Фехтование",
      icon: Swords,
      iconColor: "text-cyan-500",
      data2025: {
        republicGold: 6,
        republicSilver: 3,
        republicBronze: 0,
        intlGold: 0,
        intlSilver: 2,
        intlBronze: 3,
      },
      data2024: {
        republicGold: 3,
        republicSilver: 4,
        republicBronze: 1,
        intlGold: 0,
        intlSilver: 1,
        intlBronze: 3,
      },
      data2023: {
        republicGold: 2,
        republicSilver: 1,
        republicBronze: 1,
        intlGold: 3,
        intlSilver: 2,
        intlBronze: 2,
      },
    },
    {
      id: 14,
      sportUz: "Velosport",
      sportRu: "Велоспорт",
      icon: Circle,
      iconColor: "text-lime-500",
      data2025: {
        republicGold: 9,
        republicSilver: 8,
        republicBronze: 7,
        intlGold: 2,
        intlSilver: 2,
        intlBronze: 3,
      },
      data2024: {
        republicGold: 14,
        republicSilver: 9,
        republicBronze: 0,
        intlGold: 2,
        intlSilver: 2,
        intlBronze: 2,
      },
      data2023: {
        republicGold: 19,
        republicSilver: 9,
        republicBronze: 1,
        intlGold: 5,
        intlSilver: 3,
        intlBronze: 10,
      },
    },
    {
      id: 15,
      sportUz: "Ku'l jangi",
      sportRu: "Вольная борьба",
      icon: Zap,
      iconColor: "text-purple-400",
      data2025: {
        republicGold: 0,
        republicSilver: 2,
        republicBronze: 11,
        intlGold: 3,
        intlSilver: 1,
        intlBronze: 3,
      },
      data2024: {
        republicGold: 10,
        republicSilver: 6,
        republicBronze: 12,
        intlGold: 2,
        intlSilver: 2,
        intlBronze: 0,
      },
      data2023: {
        republicGold: 25,
        republicSilver: 20,
        republicBronze: 35,
        intlGold: 12,
        intlSilver: 15,
        intlBronze: 12,
      },
    },
    {
      id: 16,
      sportUz: "Armrestling",
      sportRu: "Армрестлинг",
      icon: Dumbbell,
      iconColor: "text-gray-500",
      data2025: {
        republicGold: 0,
        republicSilver: 0,
        republicBronze: 0,
        intlGold: 0,
        intlSilver: 0,
        intlBronze: 0,
      },
      data2024: {
        republicGold: 2,
        republicSilver: 2,
        republicBronze: 0,
        intlGold: 2,
        intlSilver: 2,
        intlBronze: 0,
      },
      data2023: {
        republicGold: 10,
        republicSilver: 5,
        republicBronze: 0,
        intlGold: 1,
        intlSilver: 1,
        intlBronze: 3,
      },
    },
    {
      id: 17,
      sportUz: "Sambo",
      sportRu: "Самбо",
      icon: Shield,
      iconColor: "text-red-600",
      data2025: {
        republicGold: 0,
        republicSilver: 2,
        republicBronze: 4,
        intlGold: 6,
        intlSilver: 5,
        intlBronze: 12,
      },
      data2024: {
        republicGold: 0,
        republicSilver: 0,
        republicBronze: 0,
        intlGold: 0,
        intlSilver: 0,
        intlBronze: 0,
      },
      data2023: {
        republicGold: 1,
        republicSilver: 1,
        republicBronze: 1,
        intlGold: 0,
        intlSilver: 1,
        intlBronze: 2,
      },
    },
    {
      id: 18,
      sportUz: "MMA",
      sportRu: "ММА",
      icon: Flame,
      iconColor: "text-orange-600",
      data2025: {
        republicGold: 2,
        republicSilver: 2,
        republicBronze: 2,
        intlGold: 1,
        intlSilver: 0,
        intlBronze: 0,
      },
      data2024: {
        republicGold: 0,
        republicSilver: 10,
        republicBronze: 12,
        intlGold: 5,
        intlSilver: 2,
        intlBronze: 1,
      },
      data2023: {
        republicGold: 0,
        republicSilver: 0,
        republicBronze: 0,
        intlGold: 0,
        intlSilver: 0,
        intlBronze: 0,
      },
    },
    {
      id: 19,
      sportUz: "Kurash",
      sportRu: "Кураш",
      icon: Users,
      iconColor: "text-teal-500",
      data2025: {
        republicGold: 1,
        republicSilver: 1,
        republicBronze: 1,
        intlGold: 4,
        intlSilver: 8,
        intlBronze: 4,
      },
      data2024: {
        republicGold: 14,
        republicSilver: 5,
        republicBronze: 11,
        intlGold: 7,
        intlSilver: 5,
        intlBronze: 2,
      },
      data2023: {
        republicGold: 0,
        republicSilver: 1,
        republicBronze: 1,
        intlGold: 1,
        intlSilver: 0,
        intlBronze: 1,
      },
    },
    {
      id: 20,
      sportUz: "Biatlon",
      sportRu: "Биатлон",
      icon: Crosshair,
      iconColor: "text-blue-600",
      data2025: {
        republicGold: 7,
        republicSilver: 7,
        republicBronze: 5,
        intlGold: 3,
        intlSilver: 2,
        intlBronze: 0,
      },
      data2024: {
        republicGold: 11,
        republicSilver: 5,
        republicBronze: 0,
        intlGold: 0,
        intlSilver: 0,
        intlBronze: 0,
      },
      data2023: {
        republicGold: 0,
        republicSilver: 0,
        republicBronze: 0,
        intlGold: 0,
        intlSilver: 0,
        intlBronze: 0,
      },
    },
    {
      id: 21,
      sportUz: "Stenddan o'q otish",
      sportRu: "Стендовая стрельба",
      icon: Target,
      iconColor: "text-amber-600",
      data2025: {
        republicGold: 0,
        republicSilver: 1,
        republicBronze: 2,
        intlGold: 0,
        intlSilver: 0,
        intlBronze: 0,
      },
      data2024: {
        republicGold: 0,
        republicSilver: 0,
        republicBronze: 0,
        intlGold: 0,
        intlSilver: 0,
        intlBronze: 0,
      },
      data2023: {
        republicGold: 0,
        republicSilver: 0,
        republicBronze: 0,
        intlGold: 0,
        intlSilver: 0,
        intlBronze: 0,
      },
    },
    {
      id: 22,
      sportUz: "Karate",
      sportRu: "Каратэ",
      icon: Flame,
      iconColor: "text-red-500",
      data2025: {
        republicGold: 0,
        republicSilver: 0,
        republicBronze: 1,
        intlGold: 0,
        intlSilver: 1,
        intlBronze: 3,
      },
      data2024: {
        republicGold: 0,
        republicSilver: 0,
        republicBronze: 0,
        intlGold: 1,
        intlSilver: 0,
        intlBronze: 0,
      },
      data2023: {
        republicGold: 0,
        republicSilver: 3,
        republicBronze: 0,
        intlGold: 1,
        intlSilver: 0,
        intlBronze: 1,
      },
    },
  ];

  // Calculate totals for selected year
  const getTotalsByYear = (year: 2023 | 2024 | 2025) => {
    const dataKey = `data${year}` as keyof SportStats;
    return sportsData.reduce(
      (acc, sport) => {
        const data = sport[dataKey] as SportStats["data2025"];
        return {
          republicGold: acc.republicGold + data.republicGold,
          republicSilver: acc.republicSilver + data.republicSilver,
          republicBronze: acc.republicBronze + data.republicBronze,
          intlGold: acc.intlGold + data.intlGold,
          intlSilver: acc.intlSilver + data.intlSilver,
          intlBronze: acc.intlBronze + data.intlBronze,
        };
      },
      {
        republicGold: 0,
        republicSilver: 0,
        republicBronze: 0,
        intlGold: 0,
        intlSilver: 0,
        intlBronze: 0,
      }
    );
  };

  const totals = getTotalsByYear(selectedYear);
  const grandTotal = {
    gold: totals.republicGold + totals.intlGold,
    silver: totals.republicSilver + totals.intlSilver,
    bronze: totals.republicBronze + totals.intlBronze,
  };

  // Animated counter effect
  useEffect(() => {
    const targets = {
      totalGold: grandTotal.gold,
      totalSilver: grandTotal.silver,
      totalBronze: grandTotal.bronze,
    };

    Object.keys(targets).forEach((key) => {
      let start = 0;
      const end = targets[key as keyof typeof targets];
      const duration = 1500;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setAnimatedCounts((prev) => ({ ...prev, [key]: end }));
          clearInterval(timer);
        } else {
          setAnimatedCounts((prev) => ({ ...prev, [key]: Math.floor(start) }));
        }
      }, 16);
    });
  }, [selectedYear]);

  return (
    <div
      className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900"
          : "bg-gradient-to-br from-blue-50 via-white to-green-50"
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {isDark ? (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </>
        ) : (
          <>
            {/* Light mode animated shapes */}
            <motion.div
              className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 30, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-1/3 right-10 w-80 h-80 bg-gradient-to-br from-green-200/30 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5],
                x: [0, -40, 0],
              }}
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-br from-teal-200/20 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 13,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Enhanced statistics pattern */}
            <svg
              className="absolute inset-0 w-full h-full opacity-25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="statistics-pattern"
                  width="70"
                  height="70"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="35"
                    cy="35"
                    r="2"
                    fill="rgb(59, 130, 246)"
                    opacity="0.4"
                  />
                  <circle
                    cx="10"
                    cy="10"
                    r="1.5"
                    fill="rgb(16, 185, 129)"
                    opacity="0.3"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="1"
                    fill="rgb(14, 165, 233)"
                    opacity="0.3"
                  />
                  <path
                    d="M 70 0 L 0 0 0 70"
                    fill="none"
                    stroke="rgb(16, 185, 129)"
                    strokeWidth="0.6"
                    opacity="0.3"
                  />
                  <path
                    d="M 0 70 L 70 0"
                    fill="none"
                    stroke="rgb(59, 130, 246)"
                    strokeWidth="0.4"
                    opacity="0.2"
                  />
                </pattern>
                <pattern
                  id="medal-rings"
                  width="100"
                  height="100"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    stroke="rgb(251, 191, 36)"
                    strokeWidth="0.5"
                    opacity="0.2"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="rgb(16, 185, 129)"
                    strokeWidth="0.5"
                    opacity="0.15"
                  />
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="url(#statistics-pattern)"
              />
              <rect width="100%" height="100%" fill="url(#medal-rings)" />
            </svg>
            {/* Corner decorations */}
            <div className="absolute top-0 right-0 w-56 h-56 border-r-2 border-t-2 border-blue-300/20 rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-56 h-56 border-l-2 border-b-2 border-green-300/20 rounded-bl-3xl"></div>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className={`text-5xl md:text-6xl mb-4 bg-gradient-to-r ${
              isDark
                ? "from-amber-400 to-emerald-400"
                : "from-amber-600 to-emerald-600"
            } bg-clip-text text-transparent`}
          >
            {t.statistics.title}
          </h2>
          <p
            className={`${
              isDark ? "text-amber-200/70" : "text-gray-600"
            } text-lg mb-6`}
          >
            2023-2025{" "}
            {language === "uz"
              ? "yillar bo'yicha musobaqalar natijalari"
              : "Результаты соревнований за годы"}
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-500 to-emerald-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Year Selector */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div
            className={`inline-flex ${
              isDark
                ? "bg-slate-900/50 border-amber-500/30"
                : "bg-white border-amber-400/40"
            } backdrop-blur-xl border rounded-full p-2 gap-2 shadow-xl`}
          >
            {[2023, 2024, 2025].map((year) => (
              <motion.button
                key={year}
                onClick={() => setSelectedYear(year as 2023 | 2024 | 2025)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-full transition-all ${
                  selectedYear === year
                    ? "bg-gradient-to-r from-amber-500 to-emerald-500 text-white shadow-lg"
                    : isDark
                    ? "text-amber-200/70 hover:text-amber-200"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span className="text-lg">{year}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Total Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {/* Gold Total */}
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 blur-xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div
              className={`relative ${
                isDark
                  ? "bg-gradient-to-br from-slate-900/90 to-amber-900/50"
                  : "bg-gradient-to-br from-white/95 via-amber-50/50 to-yellow-50/40"
              } backdrop-blur-xl border ${
                isDark
                  ? "border-amber-500/30"
                  : "border-amber-300/60 shadow-amber-200/50"
              } rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:shadow-amber-300/60 hover:border-amber-400/70`}
            >
              <div className="flex items-center justify-between mb-4">
                <Trophy className="w-12 h-12 text-yellow-400" />
                <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">
                  {language === "uz" ? "Oltin" : "Золото"}
                </Badge>
              </div>
              <motion.div
                key={`gold-${selectedYear}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-5xl bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-2"
              >
                {animatedCounts.totalGold || 0}
              </motion.div>
              <div className={isDark ? "text-amber-200/70" : "text-gray-600"}>
                {language === "uz"
                  ? "Jami oltin medallar"
                  : "Всего золотых медалей"}
              </div>
            </div>
          </motion.div>

          {/* Silver Total */}
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300/20 to-gray-500/20 blur-xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div
              className={`relative ${
                isDark
                  ? "bg-gradient-to-br from-slate-900/90 to-slate-800/50"
                  : "bg-gradient-to-br from-white/95 via-slate-50/50 to-gray-100/40"
              } backdrop-blur-xl border ${
                isDark
                  ? "border-gray-500/30"
                  : "border-slate-300/60 shadow-slate-200/50"
              } rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:shadow-slate-300/60 hover:border-slate-400/70`}
            >
              <div className="flex items-center justify-between mb-4">
                <Medal className="w-12 h-12 text-gray-400" />
                <Badge className="bg-gray-500/20 text-gray-600 border-gray-500/30">
                  {language === "uz" ? "Kumush" : "Серебро"}
                </Badge>
              </div>
              <motion.div
                key={`silver-${selectedYear}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-5xl bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent mb-2"
              >
                {animatedCounts.totalSilver || 0}
              </motion.div>
              <div className={isDark ? "text-amber-200/70" : "text-gray-600"}>
                {language === "uz"
                  ? "Jami kumush medallar"
                  : "Всего серебряных медалей"}
              </div>
            </div>
          </motion.div>

          {/* Bronze Total */}
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-700/20 blur-xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div
              className={`relative ${
                isDark
                  ? "bg-gradient-to-br from-slate-900/90 to-orange-900/50"
                  : "bg-gradient-to-br from-white/95 via-orange-50/50 to-amber-50/40"
              } backdrop-blur-xl border ${
                isDark
                  ? "border-orange-500/30"
                  : "border-orange-300/60 shadow-orange-200/50"
              } rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:shadow-orange-300/60 hover:border-orange-400/70`}
            >
              <div className="flex items-center justify-between mb-4">
                <Award className="w-12 h-12 text-orange-400" />
                <Badge className="bg-orange-500/20 text-orange-600 border-orange-500/30">
                  {language === "uz" ? "Bronza" : "Бронза"}
                </Badge>
              </div>
              <motion.div
                key={`bronze-${selectedYear}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-5xl bg-gradient-to-r from-orange-400 to-orange-700 bg-clip-text text-transparent mb-2"
              >
                {animatedCounts.totalBronze || 0}
              </motion.div>
              <div className={isDark ? "text-amber-200/70" : "text-gray-600"}>
                {language === "uz"
                  ? "Jami bronza medallar"
                  : "Всего бронзовых медалей"}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Competition Type Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Republican Competitions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`${
              isDark
                ? "bg-gradient-to-br from-slate-900/90 to-purple-900/50 border-purple-500/30"
                : "bg-gradient-to-br from-white/95 via-purple-50/50 to-pink-50/30 border-purple-300/60 shadow-purple-200/50"
            } backdrop-blur-xl border rounded-3xl p-6 shadow-2xl transition-all duration-300 hover:shadow-purple-300/60 hover:border-purple-400/70`}
          >
            <h3
              className={`text-2xl ${
                isDark ? "text-purple-300" : "text-purple-600"
              } mb-6 flex items-center gap-2`}
            >
              <TrendingUp className="w-6 h-6" />
              {language === "uz"
                ? "Respublika musobaqalari"
                : "Республиканские соревнования"}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-3xl text-yellow-500 mb-1">
                  {totals.republicGold}
                </div>
                <div
                  className={`text-xs ${
                    isDark ? "text-amber-200/70" : "text-gray-600"
                  }`}
                >
                  {language === "uz" ? "Oltin" : "Золото"}
                </div>
              </div>
              <div className="text-center p-4 bg-gray-500/10 rounded-2xl border border-gray-500/20">
                <Medal className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="text-3xl text-gray-500 mb-1">
                  {totals.republicSilver}
                </div>
                <div
                  className={`text-xs ${
                    isDark ? "text-amber-200/70" : "text-gray-600"
                  }`}
                >
                  {language === "uz" ? "Kumush" : "Серебро"}
                </div>
              </div>
              <div className="text-center p-4 bg-orange-500/10 rounded-2xl border border-orange-500/20">
                <Award className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-3xl text-orange-500 mb-1">
                  {totals.republicBronze}
                </div>
                <div
                  className={`text-xs ${
                    isDark ? "text-amber-200/70" : "text-gray-600"
                  }`}
                >
                  {language === "uz" ? "Bronza" : "Бронза"}
                </div>
              </div>
            </div>
          </motion.div>

          {/* International Competitions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`${
              isDark
                ? "bg-gradient-to-br from-slate-900/90 to-blue-900/50 border-blue-500/30"
                : "bg-gradient-to-br from-white/95 via-blue-50/50 to-cyan-50/30 border-blue-300/60 shadow-blue-200/50"
            } backdrop-blur-xl border rounded-3xl p-6 shadow-2xl transition-all duration-300 hover:shadow-blue-300/60 hover:border-blue-400/70`}
          >
            <h3
              className={`text-2xl ${
                isDark ? "text-blue-300" : "text-blue-600"
              } mb-6 flex items-center gap-2`}
            >
              <TrendingUp className="w-6 h-6" />
              {language === "uz"
                ? "Xalqaro musobaqalar"
                : "Международные соревнования"}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-3xl text-yellow-500 mb-1">
                  {totals.intlGold}
                </div>
                <div
                  className={`text-xs ${
                    isDark ? "text-amber-200/70" : "text-gray-600"
                  }`}
                >
                  {language === "uz" ? "Oltin" : "Золото"}
                </div>
              </div>
              <div className="text-center p-4 bg-gray-500/10 rounded-2xl border border-gray-500/20">
                <Medal className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="text-3xl text-gray-500 mb-1">
                  {totals.intlSilver}
                </div>
                <div
                  className={`text-xs ${
                    isDark ? "text-amber-200/70" : "text-gray-600"
                  }`}
                >
                  {language === "uz" ? "Kumush" : "Серебро"}
                </div>
              </div>
              <div className="text-center p-4 bg-orange-500/10 rounded-2xl border border-orange-500/20">
                <Award className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-3xl text-orange-500 mb-1">
                  {totals.intlBronze}
                </div>
                <div
                  className={`text-xs ${
                    isDark ? "text-amber-200/70" : "text-gray-600"
                  }`}
                >
                  {language === "uz" ? "Bronza" : "Бронза"}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sports Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3
            className={`text-3xl ${
              isDark ? "text-amber-300" : "text-amber-600"
            } mb-6 text-center`}
          >
            {language === "uz" ? "Sport turlari bo'yicha" : "По видам спорта"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sportsData.map((sport, index) => {
              const dataKey = `data${selectedYear}` as keyof SportStats;
              const data = sport[dataKey] as SportStats["data2025"];
              const SportIcon = sport.icon;
              const isShooting = sport.id === 9;

              return (
                <motion.div
                  key={sport.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredSport(sport.id)}
                  onHoverEnd={() => setHoveredSport(null)}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-emerald-500/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div
                    className={`relative ${
                      isDark
                        ? "bg-gradient-to-br from-slate-900/90 to-emerald-900/50 border-amber-500/30"
                        : "bg-gradient-to-br from-white/95 via-emerald-50/40 to-amber-50/30 border-emerald-300/60 shadow-emerald-200/50"
                    } backdrop-blur-xl border rounded-2xl p-5 shadow-2xl transition-all duration-300 hover:shadow-emerald-300/60 hover:border-amber-400/70 ${
                      isShooting ? "ring-2 ring-red-500/50" : ""
                    }`}
                  >
                    {/* Sport Icon & Name */}
                    <div className="flex items-center justify-between mb-4">
                      <h4
                        className={`text-lg ${
                          isDark ? "text-amber-300" : "text-gray-800"
                        } flex-1`}
                      >
                        {language === "uz" ? sport.sportUz : sport.sportRu}
                      </h4>
                      <motion.div
                        className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 flex items-center justify-center border border-amber-500/30"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <SportIcon className={`w-6 h-6 ${sport.iconColor}`} />
                      </motion.div>
                    </div>

                    {/* Medal Stats */}
                    <div className="space-y-3">
                      {/* Republican */}
                      <div className="bg-purple-500/10 rounded-xl p-3 border border-purple-500/20">
                        <div
                          className={`text-xs ${
                            isDark ? "text-purple-300" : "text-purple-600"
                          } mb-2`}
                        >
                          {language === "uz" ? "Respublika" : "Республика"}
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            {isShooting ? (
                              <Trophy className="w-3 h-3 text-yellow-400" />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                            )}
                            <span
                              className={
                                isDark ? "text-yellow-400" : "text-yellow-600"
                              }
                            >
                              {data.republicGold}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {isShooting ? (
                              <Medal className="w-3 h-3 text-gray-400" />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                            )}
                            <span
                              className={
                                isDark ? "text-gray-300" : "text-gray-600"
                              }
                            >
                              {data.republicSilver}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {isShooting ? (
                              <Award className="w-3 h-3 text-orange-400" />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                            )}
                            <span
                              className={
                                isDark ? "text-orange-400" : "text-orange-600"
                              }
                            >
                              {data.republicBronze}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* International */}
                      <div className="bg-blue-500/10 rounded-xl p-3 border border-blue-500/20">
                        <div
                          className={`text-xs ${
                            isDark ? "text-blue-300" : "text-blue-600"
                          } mb-2`}
                        >
                          {language === "uz" ? "Xalqaro" : "Международные"}
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            {isShooting ? (
                              <Trophy className="w-3 h-3 text-yellow-400" />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                            )}
                            <span
                              className={
                                isDark ? "text-yellow-400" : "text-yellow-600"
                              }
                            >
                              {data.intlGold}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {isShooting ? (
                              <Medal className="w-3 h-3 text-gray-400" />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                            )}
                            <span
                              className={
                                isDark ? "text-gray-300" : "text-gray-600"
                              }
                            >
                              {data.intlSilver}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {isShooting ? (
                              <Award className="w-3 h-3 text-orange-400" />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                            )}
                            <span
                              className={
                                isDark ? "text-orange-400" : "text-orange-600"
                              }
                            >
                              {data.intlBronze}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Statistics;
