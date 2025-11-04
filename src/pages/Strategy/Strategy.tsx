import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { getTranslation } from '@/utils/translations';
import { Target, TrendingUp, Award, Users, Lightbulb, Rocket, Zap, Globe, Brain, Star, CheckCircle, Sparkles, Crosshair, Trophy, Shield, Flame } from 'lucide-react';
import { Badge } from '@/components/UI/badge';

export function Strategy() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const t = getTranslation(language);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const strategies = [
    {
      icon: Target,
      title: language === 'uz' ? 'Maqsad' : language === 'ru' ? 'Цель' : 'Мақсад',
      description: language === 'uz' ? 'Xalqaro darajadagi sportchilarni tayyorlash va yuqori natijalarga erishish' : language === 'ru' ? 'Подготовка спортсменов международного уровня и достижение высоких результатов' : 'Халқаро даражадаги спортчиларни тайёрлаш ва юқори натижаларга эришиш',
      color: 'from-amber-500 to-orange-500',
      stats: '2028 Olimpiada',
      progress: 75,
      details: [
        language === 'uz' ? 'Olimpiya o\'yinlariga tayyorgarlik' : language === 'ru' ? 'Подготовка к Олимпийским играм' : 'Олимпия ўйинларига тайёргарлик',
        language === 'uz' ? 'Xalqaro musobaqalarda ishtirok' : language === 'ru' ? 'Участие в международных соревнованиях' : 'Халқаро мусобақаларда иштирок',
        language === 'uz' ? 'Professional sportchilar tayyorlash' : language === 'ru' ? 'Подготовка профессиональных спортсменов' : 'Профессионал спортчилар тайёрлаш',
      ],
    },
    {
      icon: Award,
      title: language === 'uz' ? 'Yutuqlar' : language === 'ru' ? 'Достижения' : 'Ютуқлар',
      description: language === 'uz' ? 'Xalqaro musobaqalarda ishtirok etish va g\'alaba qozonish' : language === 'ru' ? 'Участие в международных соревнованиях и достижение побед' : 'Халқаро мусобақаларда иштирок етиш ва ғалаба қозониш',
      color: 'from-blue-500 to-cyan-500',
      stats: '500+ medallar',
      progress: 90,
      details: [
        language === 'uz' ? 'Xalqaro medallar qo\'lga kiritish' : language === 'ru' ? 'Завоевание международных медалей' : 'Халқаро медаллар қўлга киритиш',
        language === 'uz' ? 'Rekordlar o\'rnatish' : language === 'ru' ? 'Установление рекордов' : 'Рекордлар ўрнатиш',
        language === 'uz' ? 'Yuqori natijalarga erishish' : language === 'ru' ? 'Достижение высоких результатов' : 'Юқори натижаларга эришиш',
      ],
    },
    {
      icon: Users,
      title: language === 'uz' ? 'Jamoa' : language === 'ru' ? 'Команда' : 'Жамоа',
      description: language === 'uz' ? 'Professional murabbiylar va mutaxassislar jalbi' : language === 'ru' ? 'Привлечение профессиональных тренеров и специалистов' : 'Профессионал мураббийлар ва мутахассислар жалби',
      color: 'from-purple-500 to-pink-500',
      stats: '120+ murabbiylar',
      progress: 88,
      details: [
        language === 'uz' ? 'Malakali murabbiylarni jalb qilish' : language === 'ru' ? 'Привлечение квалифицированных тренеров' : 'Малакали мураббийларни жалб қилиш',
        language === 'uz' ? 'Xalqaro mutaxassislar bilan hamkorlik' : language === 'ru' ? 'Сотрудничество с международными специалистами' : 'Халқаро мутахассислар билан ҳамкорлик',
        language === 'uz' ? 'Kadrlar malakasini oshirish' : language === 'ru' ? 'Повышение квалификации кадров' : 'Кадрлар малакасини ошириш',
      ],
    },
    {
      icon: Lightbulb,
      title: language === 'uz' ? 'Innovatsiya' : language === 'ru' ? 'Инновации' : 'Инновация',
      description: language === 'uz' ? 'Ilmiy yondashuv va zamonaviy trening metodlari' : language === 'ru' ? 'Научный подход и современные методы тренировок' : 'Илмий ёндашув ва замонавий тренинг методлари',
      color: 'from-yellow-500 to-amber-500',
      stats: '15+ dasturlar',
      progress: 78,
      details: [
        language === 'uz' ? 'Ilmiy tadqiqotlar o\'tkazish' : language === 'ru' ? 'Проведение научных исследований' : 'Илмий тадқиқотлар ўтказиш',
        language === 'uz' ? 'Innovatsion metodlarni qo\'llash' : language === 'ru' ? 'Применение инновационных методов' : 'Инновацион методларни қўллаш',
        language === 'uz' ? 'Sport psixologiyasidan foydalanish' : language === 'ru' ? 'Использование спортивной психологии' : 'Спорт психологиясидан фойдаланиш',
      ],
    },
    {
      icon: Rocket,
      title: language === 'uz' ? 'Kelajak' : language === 'ru' ? 'Будущее' : 'Келажак',
      description: language === 'uz' ? 'Yosh iqtidorlarni qo\'llab-quvvatlash va rivojlantirish' : language === 'ru' ? 'Поддержка и развитие молодых талантов' : 'Ёш иқтидорларни қўллаб-қувватлаш ва ривожлантириш',
      color: 'from-red-500 to-orange-500',
      stats: '200+ yosh sportchilar',
      progress: 85,
      details: [
        language === 'uz' ? 'Yoshlar bilan ishlash dasturlari' : language === 'ru' ? 'Программы работы с молодежью' : 'Ёшлар билан ишлаш дастурлари',
        language === 'uz' ? 'Iqtidorli bolalarni qo\'llab-quvvatlash' : language === 'ru' ? 'Поддержка одаренных детей' : 'Иқтидорли болаларни қўллаб-қувватлаш',
        language === 'uz' ? 'Kelajak jamoasini shakllantiris' : language === 'ru' ? 'Формирование команды будущего' : 'Келажак жамоасини шакллантириш',
      ],
    },
  ];

  const roadmap = [
    { 
      year: 2025, 
      title: language === 'uz' ? 'Infratuzilmani modernizatsiya qilish' : language === 'ru' ? 'Модернизация инфраструктуры' : 'Инфрат��зилмани модернизация қилиш',
      progress: 75,
      icon: Zap,
    },
    { 
      year: 2026, 
      title: language === 'uz' ? 'Xalqaro hamkorlikni kengaytirish' : language === 'ru' ? 'Расширение международного сотрудничества' : 'Халқаро ҳамкорликни кенгайтириш',
      progress: 50,
      icon: Globe,
    },
    { 
      year: 2027, 
      title: language === 'uz' ? 'Yangi sport turlari bo\'yicha dasturlar' : language === 'ru' ? 'Программы по новым видам спорта' : 'Янги спорт турлари бўйича дастурлар',
      progress: 30,
      icon: Brain,
    },
    { 
      year: 2028, 
      title: language === 'uz' ? 'Olimpiya o\'yinlarida qatnashish' : language === 'ru' ? 'Участие в Олимпийских играх' : 'Олимпия ўйинларида қатнашиш',
      progress: 10,
      icon: Star,
    },
  ];

  return (
    <div className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300 ${
      isDark
        ? 'bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900'
        : 'bg-gradient-to-br from-blue-50 via-white to-emerald-50'
    }`}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        {isDark ? (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            ></motion.div>
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
              animate={{
                x: [0, -100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            ></motion.div>
          </>
        ) : (
          <>
            {/* Light mode animated shapes */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-transparent rounded-full blur-3xl"
              animate={{
                x: [0, -100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />
            <motion.div
              className="absolute top-1/2 right-1/3 w-80 h-80 bg-gradient-to-br from-amber-200/20 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Hexagonal pattern for light mode */}
            <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hexagon-pattern" width="100" height="87" patternUnits="userSpaceOnUse">
                  <polygon points="50,3 95,25.5 95,70.5 50,93 5,70.5 5,25.5" fill="none" stroke="rgb(16, 185, 129)" strokeWidth="0.8" opacity="0.4"/>
                  <circle cx="50" cy="48" r="2" fill="rgb(251, 191, 36)" opacity="0.5"/>
                </pattern>
                <pattern id="dots-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                  <circle cx="15" cy="15" r="1.5" fill="rgb(59, 130, 246)" opacity="0.3"/>
                  <circle cx="5" cy="5" r="1" fill="rgb(16, 185, 129)" opacity="0.2"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hexagon-pattern)" />
              <rect width="100%" height="100%" fill="url(#dots-pattern)" />
            </svg>
            {/* Decorative lines */}
            <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="20%" x2="100%" y2="20%" stroke="rgb(16, 185, 129)" strokeWidth="1" strokeDasharray="5,10" opacity="0.5"/>
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgb(251, 191, 36)" strokeWidth="1" strokeDasharray="8,12" opacity="0.4"/>
              <line x1="0" y1="80%" x2="100%" y2="80%" stroke="rgb(59, 130, 246)" strokeWidth="1" strokeDasharray="5,10" opacity="0.5"/>
            </svg>
          </>
        )}
        
        {/* Floating Sport Icons */}
        {[
          { Icon: Crosshair, position: { top: '10%', right: '15%' }, delay: 0, color: 'text-red-500/10' },
          { Icon: Trophy, position: { top: '60%', left: '8%' }, delay: 1, color: 'text-yellow-500/10' },
          { Icon: Shield, position: { bottom: '15%', right: '20%' }, delay: 2, color: 'text-pink-500/10' },
          { Icon: Flame, position: { top: '35%', right: '10%' }, delay: 1.5, color: 'text-orange-500/10' },
        ].map(({ Icon, position, delay, color }, idx) => (
          <motion.div
            key={idx}
            className={`absolute ${color}`}
            style={position}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Icon className="w-24 h-24" strokeWidth={0.5} />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
            {t.strategy.title}
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto rounded-full"></div>
          <p className={`text-xl mt-6 max-w-3xl mx-auto ${isDark ? 'text-amber-200/70' : 'text-gray-600'}`}>
            {language === 'uz' ? 'Sport Markazining yo\'nalishi va kelajak rejalari' : language === 'ru' ? 'Направление и будущие планы Спортивного центра' : 'Спорт Марказининг йўналиши ва келажак режалари'}
          </p>
        </motion.div>

        {/* Hexagonal Strategy Cards */}
        <div className="mb-20">
          <div className="relative flex items-center justify-center flex-wrap gap-8">
            {strategies.map((strategy, index) => {
              const Icon = strategy.icon;
              const isActive = activeIndex === index;
              const isHovered = hoveredIndex === index;
              const angle = (index * 60) - 30;
              const radius = 280;

              return (
                <motion.div
                  key={index}
                  className="relative cursor-pointer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  onHoverStart={() => {
                    setHoveredIndex(index);
                    setActiveIndex(index);
                  }}
                  onHoverEnd={() => setHoveredIndex(null)}
                  style={{
                    width: '200px',
                  }}
                >
                  {/* Glow Effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${strategy.color} blur-2xl rounded-full`}
                    animate={{
                      opacity: isActive || isHovered ? 0.6 : 0.2,
                      scale: isActive || isHovered ? 1.3 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Hexagon Shape */}
                  <motion.div
                    className="relative"
                    animate={{
                      scale: isActive || isHovered ? 1.1 : 1,
                      rotateY: isHovered ? 10 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Hexagon Container */}
                    <div className="relative aspect-square">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <defs>
                          <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" className={`text-${strategy.color.split('-')[1]}-500`} stopColor="currentColor" />
                            <stop offset="100%" className={`text-${strategy.color.split('-')[3]}-500`} stopColor="currentColor" />
                          </linearGradient>
                        </defs>
                        <polygon
                          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
                          className={`transition-all ${
                            isDark
                              ? `fill-slate-900/95 stroke-amber-500/40 ${isActive || isHovered ? 'stroke-amber-500 stroke-2' : 'stroke-1'}`
                              : `fill-white/95 stroke-2 ${isActive || isHovered ? 'stroke-emerald-500' : 'stroke-emerald-300/50'}`
                          }`}
                          strokeWidth={isActive || isHovered ? 2 : 1}
                          style={{
                            filter: isDark ? 'none' : 'drop-shadow(0 4px 12px rgba(16, 185, 129, 0.15))'
                          }}
                        />
                      </svg>

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                        {/* Icon */}
                        <motion.div
                          className={`w-16 h-16 rounded-full bg-gradient-to-br ${strategy.color} flex items-center justify-center mb-3 shadow-xl`}
                          animate={{
                            rotate: isHovered ? 360 : 0,
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>

                        {/* Title */}
                        <h3 className={`text-lg mb-2 text-center ${isDark ? 'text-amber-300' : 'text-gray-800'}`}>
                          {strategy.title}
                        </h3>

                        {/* Progress Circle */}
                        <div className="relative w-12 h-12 mb-2">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <circle
                              cx="18"
                              cy="18"
                              r="16"
                              fill="none"
                              className="stroke-slate-700"
                              strokeWidth="2"
                            />
                            <motion.circle
                              cx="18"
                              cy="18"
                              r="16"
                              fill="none"
                              className={`stroke-current text-amber-500`}
                              strokeWidth="2"
                              strokeDasharray="100"
                              initial={{ strokeDashoffset: 100 }}
                              animate={{ strokeDashoffset: 100 - strategy.progress }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </svg>
                          <div className={`absolute inset-0 flex items-center justify-center text-xs ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                            {strategy.progress}%
                          </div>
                        </div>

                        {/* Stats */}
                        <Badge className={`bg-gradient-to-r ${strategy.color} text-white border-0 text-xs`}>
                          {strategy.stats}
                        </Badge>
                      </div>

                      {/* Sparkles */}
                      {(isActive || isHovered) && (
                        <>
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 bg-amber-400 rounded-full"
                              style={{
                                top: '50%',
                                left: '50%',
                              }}
                              animate={{
                                x: Math.cos((i * Math.PI * 2) / 6) * 60,
                                y: Math.sin((i * Math.PI * 2) / 6) * 60,
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.1,
                              }}
                            />
                          ))}
                        </>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Active Strategy Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className={`mt-12 backdrop-blur-xl border-2 rounded-3xl p-8 shadow-2xl ${
                isDark
                  ? 'bg-gradient-to-br from-slate-900/90 to-emerald-900/60 border-amber-500/40'
                  : 'bg-white/80 border-blue-300/40'
              }`}
            >
              <div className="flex items-start gap-6">
                <motion.div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${strategies[activeIndex].color} flex items-center justify-center shadow-xl flex-shrink-0`}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  {(() => {
                    const Icon = strategies[activeIndex].icon;
                    return <Icon className="w-10 h-10 text-white" />;
                  })()}
                </motion.div>

                <div className="flex-1">
                  <h3 className={`text-3xl mb-3 ${isDark ? 'text-amber-300' : 'text-gray-800'}`}>{strategies[activeIndex].title}</h3>
                  <p className={`mb-6 leading-relaxed ${isDark ? 'text-amber-200/70' : 'text-gray-600'}`}>{strategies[activeIndex].description}</p>

                  <div className="grid md:grid-cols-3 gap-4">
                    {strategies[activeIndex].details.map((detail, detailIndex) => (
                      <motion.div
                        key={detailIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: detailIndex * 0.1 }}
                        className={`flex items-center gap-3 rounded-xl p-4 border ${
                          isDark
                            ? 'bg-slate-800/50 border-emerald-500/20'
                            : 'bg-white border-emerald-300/30 shadow-sm'
                        }`}
                      >
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        <span className={`text-sm ${isDark ? 'text-amber-200/90' : 'text-gray-700'}`}>{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Roadmap Timeline (Keeping the same style) */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={`backdrop-blur-xl border-2 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden ${
            isDark
              ? 'bg-gradient-to-br from-slate-900/95 to-emerald-900/60 border-amber-500/40'
              : 'bg-white/80 border-blue-300/40'
          }`}>
            <motion.h3
              className={`text-3xl mb-8 text-center flex items-center justify-center gap-3 ${isDark ? 'text-amber-300' : 'text-gray-800'}`}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Star className="w-8 h-8" />
              {language === 'uz' ? '2025-2028 Yo\'l Xaritasi' : language === 'ru' ? 'Дорожная карта 2025-2028' : '2025-2028 Йўл харитаси'}
              <Star className="w-8 h-8" />
            </motion.h3>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 via-emerald-500 to-amber-500 rounded-full hidden md:block"></div>

              <div className="space-y-16">
                {roadmap.map((milestone, index) => {
                  const Icon = milestone.icon;
                  const isEven = index % 2 === 0;

                  return (
                    <motion.div
                      key={index}
                      className={`relative flex items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15, duration: 0.6 }}
                    >
                      {/* Content */}
                      <motion.div
                        className="flex-1"
                        whileHover={{ scale: 1.03, x: isEven ? 10 : -10 }}
                      >
                        <div className={`backdrop-blur-xl border rounded-2xl p-6 shadow-xl ${
                          isDark
                            ? 'bg-gradient-to-br from-slate-800/90 to-emerald-900/50 border-amber-500/30'
                            : 'bg-white/90 border-blue-300/30'
                        }`}>
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className={`text-xl mb-1 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{milestone.title}</h4>
                              <p className={`text-sm ${isDark ? 'text-amber-200/60' : 'text-gray-500'}`}>{language === 'uz' ? 'Bajarish muddati' : language === 'ru' ? 'Срок выполнения' : 'Бажариш муддати'}: {milestone.year}</p>
                            </div>
                            <Badge className="bg-gradient-to-r from-amber-500 to-emerald-500 text-white border-0">
                              {milestone.progress}%
                            </Badge>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-slate-700/50' : 'bg-gray-200'}`}>
                            <motion.div
                              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full relative"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${milestone.progress}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, delay: 0.3 }}
                            >
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                              ></motion.div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Year Badge (Center) */}
                      <motion.div
                        className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-amber-500 to-emerald-500 flex flex-col items-center justify-center text-white shadow-2xl z-10 relative"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500 to-emerald-500 blur-xl"
                          animate={{
                            opacity: [0.5, 0.8, 0.5],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <Icon className="w-8 h-8 mb-1 relative z-10" />
                        <div className="text-sm relative z-10">{milestone.year}</div>
                      </motion.div>

                      {/* Spacer for alignment */}
                      <div className="hidden md:block flex-1"></div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
