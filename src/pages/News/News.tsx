import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { getTranslation } from "@/utils/translations";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import {
  Calendar,
  Eye,
  Heart,
  X,
  Trophy,
  Award,
  Target,
  Crosshair,
  Zap,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/UI/badge";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  views: number;
  category: string;
  likes: number;
  featured: boolean;
  readTime: string;
  images: string[];
}

import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import news1 from "@/assets/news/news-1.jpg";
import news2 from "@/assets/news/news-2.jpg";
import news3 from "@/assets/news/news-3.jpg";
import news4 from "@/assets/news/news-4.jpg";
import news5 from "@/assets/news/news-5.jpg";
import news6 from "@/assets/news/news-6.jpg";
import news7 from "@/assets/news/news-7.jpg";
import news8 from "@/assets/news/news-8.jpg";
import news9 from "@/assets/news/news-9.jpg";
import news10 from "@/assets/news/news-10.jpg";
import news11 from "@/assets/news/news-11.jpg";
import news12 from "@/assets/news/news-12.jpg";
import news13 from "@/assets/news/news-13.jpg";
import news14 from "@/assets/news/news-14.jpg";
import news15 from "@/assets/news/news-15.jpg";
import news16 from "@/assets/news/news-16.jpg";
import news17 from "@/assets/news/news-17.jpg";
import news18 from "@/assets/news/news-18.jpg";
import news19 from "@/assets/news/news-19.jpg";
import news20 from "@/assets/news/news-20.jpg";
import news21 from "@/assets/news/news-21.jpg";
import news22 from "@/assets/news/news-22.jpg";
import news23 from "@/assets/news/news-23.jpg";
import news24 from "@/assets/news/news-24.jpg";
import news25 from "@/assets/news/news-25.jpg";
import news26 from "@/assets/news/news-26.jpg";
import news27 from "@/assets/news/news-27.jpg";
import news28 from "@/assets/news/news-28.jpg";
import news29 from "@/assets/news/news-29.jpg";
import news30 from "@/assets/news/news-30.jpg";
import news31 from "@/assets/news/news-31.jpg";

const getCategoryConfig = (category: string) => {
  const categoryLower = category.toLowerCase();

  if (
    categoryLower.includes("musobaqalar") ||
    categoryLower.includes("competition")
  ) {
    return {
      icon: Trophy,
      gradient: "from-yellow-400 via-orange-500 to-red-500",
      glow: "rgba(251, 191, 36, 0.4)",
    };
  }
  if (
    categoryLower.includes("yutuqlar") ||
    categoryLower.includes("achievement")
  ) {
    return {
      icon: Award,
      gradient: "from-emerald-400 via-teal-500 to-cyan-500",
      glow: "rgba(16, 185, 129, 0.4)",
    };
  }
  if (categoryLower.includes("ta'lim") || categoryLower.includes("education")) {
    return {
      icon: Target,
      gradient: "from-blue-400 via-indigo-500 to-purple-500",
      glow: "rgba(59, 130, 246, 0.4)",
    };
  }
  if (
    categoryLower.includes("infratuzilma") ||
    categoryLower.includes("infrastructure")
  ) {
    return {
      icon: Crosshair,
      gradient: "from-red-400 via-pink-500 to-rose-500",
      glow: "rgba(239, 68, 68, 0.4)",
    };
  }

  return {
    icon: Sparkles,
    gradient: "from-purple-400 via-pink-500 to-rose-500",
    glow: "rgba(168, 85, 247, 0.4)",
  };
};

export function News() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = getTranslation(language);
  const isDark = theme === "dark";
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [likedNews, setLikedNews] = useState<Set<number>>(new Set());
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const news: NewsItem[] = [
    {
      id: 1,
      title:
        "O‘zbekiston kubogi: Yosh merganlar final sari dadil qadam tashlamoqda",
      excerpt:
        "Mudofaa vazirligi huzuridagi O‘q otish sport markazi mezbonligida o‘tkazilayotgan 21 yoshgacha bo‘lgan sportchilar o‘rtasidagi O‘zbekiston kubogi musobaqasi o‘zining eng mas’uliyatli va qizg‘in bosqichiga kirib bordi.",
      image: news1,
      date: "11 Sen",
      views: 2340,
      category: "Musobaqalar",
      likes: 456,
      featured: true,
      readTime: "3 min",
      images: [news2, news3, news4, news5, news6, news7],
    },
    {
      id: 2,
      title:
        "Yosh merganlar oʻrtasida oʻtkazilgan Oʻzbekiston kubogi bahslari yakunlandi",
      excerpt:
        "Mudofaa vazirligi huzuridagi O‘q otish sport markazi mezbonligida o‘tkazilgan 21 yoshgacha bo‘lgan merganlar o‘rtasidagi O‘zbekiston Kubogi musobaqasi o‘z yakuniga yetdi.",
      image: news8,
      date: "13 Sen",
      views: 1759,
      category: "Musobaqalar",
      likes: 321,
      featured: true,
      readTime: "2 min",
      images: [news9, news10, news11],
    },
    {
      id: 3,
      title: "🏆🥈Svetlana Osipova Jahon chempionati sovrindori!",
      excerpt:
        "Mudofaa vazirligi sportchimizni mazkur natija bilan muborakbod etib, kelgusi musobaqalarda yorqin g‘alabalar tilaydi.",
      image: news12,
      date: "20 Avg",
      images: [news13],
      category: "Musobaqalar",
      views: 2980,
      likes: 512,
      featured: true,
      readTime: "5 min",
    },
    {
      id: 4,
      title:
        "Mudofaa vazirligi sportchilari akademik eshkak eshish bo‘yicha Osiyo chempionatida yuqori natijalarga erishdi",
      excerpt:
        "Vyetnamning Xayfon shahrida bo‘lib o‘tgan akademik eshkak eshish bo‘yicha Osiyo chempionati o‘z yakuniga yetdi. Mazkur nufuzli musobaqada O‘zbekiston terma jamoasi munosib ishtirok etib, xalqaro sport maydonida yurtimiz sha’nini munosib himoya qildi.",
      image: news14,
      date: "5 Sen",
      images: [news15, news16, news17, news18],
      category: "Musobaqalar",
      views: 2100,
      likes: 389,
      featured: false,
      readTime: "4 min",
    },
    {
      id: 5,
      title: "O‘zbekiston bokschilari yurtga sharaf bilan qaytdi",
      excerpt:
        "Joriy yilning sentabr oyida Angliyaning Liverpul shahrida bo‘lib o‘tgan boks bo‘yicha jahon chempionatida muvaffaqiyatli ishtirok etib, yurtimiz sha’nini munosib himoya qilgan O‘zbekiston terma jamoasi a’zolari bugun tongda Islom Karimov nomidagi Toshkent xalqaro aeroportida tantanali tarzda kutib olindi.",
      image: news19,
      date: "10 Okt",
      images: [news20, news21, news22, news23, news24, news25],
      category: "Yutuqlar",
      views: 3142,
      likes: 876,
      featured: false,
      readTime: "7 min",
    },
    {
      id: 6,
      title:
        "Oʻzbekiston terma jamoasi boks boʻyicha jahon chempionatida 11 ta medalni qo‘lga kiritdi.",
      excerpt:
        "Angliyaning Liverpul shahrida bo‘lib o‘tgan musobaqada dunyoning 68 mamlakatidan 540 nafar bokschi ishtirok etdi. Oʻzbekiston terma jamoasi 6 ta oltin, 2 ta kumush va 3 ta bronza medallari bilan umumjamoa hisobida ikkinchi oʻrinni egalladi.",
      image: news26,
      category: "Yutuqlar",
      date: "8 Okt",
      views: 2890,
      likes: 512,
      featured: false,
      readTime: "5 min",
      images: [news27, news28, news29],
    },
    {
      id: 7,
      title:
        "Joriy yilning 2-11-oktyabr kunlari Norvegiyaning Fyorde shahrida oʻtkaziladigan ogʻir atletika boʻyicha jahon chempionatida O‘zbekiston terma jamoasi a’zolari ishtirokini muvaffaqiyatli yakunladi.",
      excerpt:
        "Mudofaa vazirligi Sport markazi sportchisi kapitan Ruslan Nurudinov siltab koʻtarishda 228 kg va ikki kurash yakuniga koʻra 414 kg bilan 2 ta bronza medaliga ega chiqdi.",
      image: news30,
      category: "Yutuqlar",
      date: "10 Okt",
      views: 3142,
      likes: 876,
      featured: false,
      readTime: "7 min",
      images: [news31],
    },
  ];

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedNews((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const featuredNews = news.filter((item) => item.featured);
  const regularNews = news.filter((item) => !item.featured);

  return (
    <div
      ref={sectionRef}
      className={`min-h-screen pt-10 pb-20 px-8 sm:px-10 lg:px-12 relative overflow-hidden transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-900"
          : "bg-gradient-to-br from-purple-50 via-white to-pink-50"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isDark ? (
          <>
            {/* Gradient Orbs */}
            <motion.div
              className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 20, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                x: [0, -50, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 25, repeat: Infinity }}
            />

            {/* Floating Particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </>
        ) : (
          <>
            {/* Light mode animated shapes */}
            <motion.div
              className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, 30, 0],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                x: [0, -50, 0],
                y: [0, -30, 0],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-amber-200/20 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Enhanced decorative pattern */}
            <svg
              className="absolute inset-0 w-full h-full opacity-25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="news-pattern"
                  width="65"
                  height="65"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="2"
                    fill="rgb(168, 85, 247)"
                    opacity="0.4"
                  />
                  <circle
                    cx="10"
                    cy="10"
                    r="1.5"
                    fill="rgb(236, 72, 153)"
                    opacity="0.3"
                  />
                  <circle
                    cx="55"
                    cy="55"
                    r="1"
                    fill="rgb(251, 191, 36)"
                    opacity="0.3"
                  />
                  <path
                    d="M 65 0 L 0 0 0 65"
                    fill="none"
                    stroke="rgb(168, 85, 247)"
                    strokeWidth="0.6"
                    opacity="0.3"
                  />
                  <path
                    d="M 0 65 L 65 0"
                    fill="none"
                    stroke="rgb(236, 72, 153)"
                    strokeWidth="0.4"
                    opacity="0.2"
                  />
                </pattern>
                <pattern
                  id="news-stars"
                  width="90"
                  height="90"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="45"
                    cy="45"
                    r="18"
                    fill="none"
                    stroke="rgb(251, 191, 36)"
                    strokeWidth="0.5"
                    opacity="0.2"
                  />
                  <path
                    d="M 45 30 L 47 40 L 57 40 L 49 46 L 52 56 L 45 50 L 38 56 L 41 46 L 33 40 L 43 40 Z"
                    fill="rgb(168, 85, 247)"
                    opacity="0.1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#news-pattern)" />
              <rect width="100%" height="100%" fill="url(#news-stars)" />
            </svg>
            {/* Sparkle decorations */}
            <div className="absolute top-20 right-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-30 animate-pulse"></div>
            <div
              className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-pink-400 rounded-full opacity-30 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 right-1/3 w-2 h-2 bg-amber-400 rounded-full opacity-30 animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </>
        )}
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10">
        {/* Header */}
        <motion.div style={{ y, opacity }} className="text-center mb-12">
          <motion.h2
            className="text-6xl md:text-7xl mb-3 relative inline-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className={`bg-gradient-to-r bg-clip-text text-transparent text-4xl ${
                isDark
                  ? "from-purple-400 via-pink-400 to-amber-400"
                  : "from-purple-600 via-pink-600 to-amber-600"
              }`}
            >
              {t.news.title}
            </span>

            {/* Animated underline */}
            <motion.div
              className={`absolute -bottom-2 left-0 right-0 h-1 rounded-full ${
                isDark
                  ? "bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500"
                  : "bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500"
              }`}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </motion.h2>
        </motion.div>

        {/* Featured News - Cinematic Cards */}
        {featuredNews.length > 0 && (
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {featuredNews.map((item, index) => {
                const {
                  icon: Icon,
                  gradient,
                  glow,
                } = getCategoryConfig(item.category);
                const isMain = index === 0;

                return (
                  <motion.div
                    key={item.id}
                    className={`group cursor-pointer ${
                      isMain ? "lg:col-span-2 lg:row-span-2" : ""
                    }`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedNews(item)}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <motion.div
                      className={`relative ${
                        isMain ? "h-[500px]" : "h-[242px]"
                      } rounded-2xl overflow-hidden ${
                        isDark
                          ? ""
                          : "shadow-xl hover:shadow-2xl transition-shadow duration-300"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Image */}
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          scale: hoveredId === item.id ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>

                      {/* Gradient Overlay */}
                      <div
                        className={`absolute inset-0 ${
                          isDark
                            ? "bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"
                            : "bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-transparent"
                        }`}
                      />

                      {/* Glow Effect */}
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(circle at 50% 100%, ${glow}, transparent 70%)`,
                        }}
                        animate={{
                          opacity: hoveredId === item.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Content */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-between">
                        {/* Top Badge */}
                        <div className="flex items-start justify-between">
                          <Badge
                            className={`bg-gradient-to-r ${gradient} text-white border-0 px-3 py-1 text-xs shadow-lg`}
                          >
                            <Icon className="w-3 h-3 mr-1" />
                            {item.category}
                          </Badge>

                          {/* Trending indicator */}
                          <motion.div
                            className="flex items-center gap-1 bg-red-500/20 backdrop-blur-sm px-2 py-1 rounded-full"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <TrendingUp className="w-3 h-3 text-red-400" />
                            <span className="text-xs text-red-400">HOT</span>
                          </motion.div>
                        </div>

                        {/* Bottom Content */}
                        <div>
                          <h3
                            className={`text-white mb-2 line-clamp-2 ${
                              isMain ? "text-2xl md:text-3xl" : "text-lg"
                            }`}
                          >
                            {item.title}
                          </h3>

                          {isMain && (
                            <p className="text-purple-200/80 text-sm mb-3 line-clamp-2">
                              {item.excerpt}
                            </p>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs text-purple-300">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {item.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {item.views}
                              </div>
                            </div>

                            {/* Like Button */}
                            <motion.button
                              onClick={(e) => toggleLike(item.id, e)}
                              className={`flex items-center gap-1 px-2 py-1 rounded-full backdrop-blur-sm transition-colors ${
                                likedNews.has(item.id)
                                  ? "bg-red-500/30 text-red-400"
                                  : "bg-white/10 text-white hover:bg-white/20"
                              }`}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Heart
                                className={`w-3 h-3 ${
                                  likedNews.has(item.id) ? "fill-current" : ""
                                }`}
                              />
                              <span className="text-xs">
                                {item.likes + (likedNews.has(item.id) ? 1 : 0)}
                              </span>
                            </motion.button>
                          </div>
                        </div>
                      </div>

                      {/* Hover Border */}
                      <motion.div
                        className={`absolute inset-0 rounded-2xl border-2 border-transparent`}
                        animate={{
                          borderColor:
                            hoveredId === item.id ? glow : "transparent",
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Regular News - Compact Grid */}
        {regularNews.length > 0 && (
          <div>
            <motion.div
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Sparkles
                className={`w-6 h-6 ${
                  isDark ? "text-purple-400" : "text-purple-600"
                }`}
              />
              <h3
                className={`text-2xl ${
                  isDark ? "text-purple-300" : "text-purple-700"
                }`}
              >
                {language === "uz" ? "Boshqa Yangiliklar" : "Другие Новости"}
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {regularNews.map((item, index) => {
                const {
                  icon: Icon,
                  gradient,
                  glow,
                } = getCategoryConfig(item.category);

                return (
                  <motion.div
                    key={item.id}
                    className="group cursor-pointer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedNews(item)}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <motion.div
                      className={`relative h-[280px] rounded-xl overflow-hidden ${
                        isDark
                          ? ""
                          : "shadow-lg hover:shadow-2xl transition-shadow duration-300"
                      }`}
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Image */}
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          scale: hoveredId === item.id ? 1.15 : 1,
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>

                      {/* Gradient */}
                      <div
                        className={`absolute inset-0 ${
                          isDark
                            ? "bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"
                            : "bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent"
                        }`}
                      />

                      {/* Glow */}
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(circle at 50% 100%, ${glow}, transparent 70%)`,
                        }}
                        animate={{
                          opacity: hoveredId === item.id ? 1 : 0,
                        }}
                      />

                      {/* Content */}
                      <div className="absolute inset-0 p-4 flex flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <Badge
                            className={`bg-gradient-to-r ${gradient} text-white border-0 px-2 py-1 text-xs`}
                          >
                            <Icon className="w-3 h-3" />
                          </Badge>

                          <div className="flex items-center gap-1 text-xs text-purple-300">
                            <Zap className="w-3 h-3" />
                            {item.readTime}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-white text-base mb-2 line-clamp-3 leading-snug">
                            {item.title}
                          </h4>

                          <div className="flex items-center justify-between text-xs text-purple-300 mb-2">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {item.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {item.views}
                              </div>
                            </div>

                            <motion.button
                              onClick={(e) => toggleLike(item.id, e)}
                              className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${
                                likedNews.has(item.id)
                                  ? "bg-red-500/30 text-red-400"
                                  : "bg-white/10 text-white"
                              }`}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Heart
                                className={`w-3 h-3 ${
                                  likedNews.has(item.id) ? "fill-current" : ""
                                }`}
                              />
                              <span className="text-xs">
                                {item.likes + (likedNews.has(item.id) ? 1 : 0)}
                              </span>
                            </motion.button>
                          </div>

                          {/* Read indicator */}
                          <motion.div
                            className="h-0.5 bg-white/10 rounded-full overflow-hidden"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                          >
                            <motion.div
                              className={`h-full bg-gradient-to-r ${gradient}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: "100%" }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.05, duration: 1 }}
                            />
                          </motion.div>
                        </div>
                      </div>

                      {/* Border */}
                      <motion.div
                        className="absolute inset-0 rounded-xl border-2 border-transparent"
                        animate={{
                          borderColor:
                            hoveredId === item.id ? glow : "transparent",
                        }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal - Sleek & Compact */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 backdrop-blur-md z-60 flex items-center justify-center p-4 ${
              isDark ? "bg-black/20" : "bg-slate-900/30"
            }`}
            onClick={() => setSelectedNews(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`border rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl ${
                isDark
                  ? "bg-gradient-to-br from-slate-900/95 to-purple-900/80 border-purple-500/30"
                  : "bg-gradient-to-br from-white via-purple-50/50 to-pink-50/30 border-purple-300/40"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image */}
              <div className="relative h-64 rounded-t-2xl overflow-hidden">
                <Swiper
                  spaceBetween={30}
                  effect={"fade"}
                  navigation={true}
                  loop={true}
                  pagination={{
                    dynamicBullets: true,
                  }}
                  modules={[EffectFade, Navigation, Pagination]}
                  className="h-full w-full"
                >
                  <SwiperSlide className="w-full h-full">
                    <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-full object-cover rounded-2xl" />
                  </SwiperSlide>
                  {selectedNews.images &&
                    selectedNews.images.map((img, idx) => (
                      <SwiperSlide key={idx} className="w-full h-full">
                        <img
                          src={img}
                          alt={`${selectedNews.title} - Image ${idx + 1}`}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />

                {/* Close */}
                <motion.button
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-4 right-4 w-10 h-10 z-20 bg-red-500/20 backdrop-blur-xl hover:bg-red-500/40 rounded-full flex items-center justify-center border border-red-500/40"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-red-400" />
                </motion.button>

                {/* Category */}
                <div className="absolute top-4 left-4 z-20">
                  {(() => {
                    const { icon: Icon, gradient } = getCategoryConfig(
                      selectedNews.category
                    );
                    return (
                      <Badge
                        className={`bg-gradient-to-r ${gradient} text-white border-0 px-3 py-1.5`}
                      >
                        <Icon className="w-4 h-4 mr-1" />
                        {selectedNews.category}
                      </Badge>
                    );
                  })()}
                </div>
              </div>

              {/* Content */}
              <div className="px-4 py-2">
                <h2
                  className={`text-2xl mb-3 ${
                    isDark ? "text-purple-300" : "text-purple-700"
                  }`}
                >
                  {selectedNews.title}
                </h2>

                <div
                  className={`flex items-center gap-4 text-sm mb-4 pb-4 border-b ${
                    isDark
                      ? "text-purple-300/70 border-purple-500/20"
                      : "text-purple-600/70 border-purple-300/30"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedNews.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {selectedNews.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    {selectedNews.readTime}
                  </div>
                </div>

                <p
                  className={`text-md leading-relaxed mb-4 ${
                    isDark ? "text-purple-200/80" : "text-gray-700"
                  }`}
                >
                  {selectedNews.excerpt}
                </p>

                {/* Like Button */}
                <motion.button
                  onClick={(e) => toggleLike(selectedNews.id, e)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors ${
                    likedNews.has(selectedNews.id)
                      ? "bg-red-500/20 text-red-400"
                      : isDark
                      ? "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                      : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      likedNews.has(selectedNews.id) ? "fill-current" : ""
                    }`}
                  />
                  <span className="text-sm">
                    {selectedNews.likes +
                      (likedNews.has(selectedNews.id) ? 1 : 0)}
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
