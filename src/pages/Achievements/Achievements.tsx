import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { getTranslation } from '@/utils/translations';
import { Trophy, Medal, Award, Target, ChevronLeft, ChevronRight, Crown, Search, X, Crosshair, Users, Swords, Dumbbell, Waves, Shield, Zap, Activity, Footprints, Ship, Bike, Flame, Calendar, MapPin, Star } from 'lucide-react';
import { Badge } from '@/components/UI/badge';
import { Input } from '@/components/UI/input';

// Sport icon mapping
const getDisciplineIcon = (discipline: string) => {
  const disciplineLower = discipline.toLowerCase();
  
  if (disciplineLower.includes('vintovka') || disciplineLower.includes('rifle') || disciplineLower.includes('pnevmatik') || disciplineLower.includes('trap') || disciplineLower.includes('skeet')) {
    return { icon: Crosshair, color: 'text-red-500' };
  }
  if (disciplineLower.includes('kurash') || disciplineLower.includes('wrestling') || disciplineLower.includes('grappling')) {
    return { icon: Users, color: 'text-purple-500' };
  }
  if (disciplineLower.includes('boks') || disciplineLower.includes('boxing')) {
    return { icon: Flame, color: 'text-orange-500' };
  }
  if (disciplineLower.includes('judo')) {
    return { icon: Swords, color: 'text-indigo-500' };
  }
  if (disciplineLower.includes('swimming') || disciplineLower.includes('polo')) {
    return { icon: Waves, color: 'text-cyan-500' };
  }
  
  return { icon: Target, color: 'text-amber-500' };
};

interface Achievement {
  name: string;
  event: string;
  medal: string;
  score: string;
  discipline: string;
  date?: string;
  location?: string;
  details?: string;
}

const Achievements: React.FC = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = getTranslation(language);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  
  const isDark = theme === 'dark';

  const years = [2024, 2023, 2022];

  const achievementsByYear: Record<number, Achievement[]> = {
    2024: [
      { 
        name: 'Doniyor Islamov', 
        event: 'ISSF Jahon Kubogi', 
        medal: 'gold', 
        score: '628.5', 
        discipline: '50m Vintovka',
        date: '15 Iyun 2024',
        location: 'Seul, Janubiy Koreya',
        details: 'Jahon rekordi o\'rnatib, olimpiya quotasi oldi. Final bosqichida 628.5 ball to\'pladi va ISSF reytingida birinchi o\'rinni egalladi.'
      },
      { 
        name: 'Sevara Nematova', 
        event: 'Osiyo Chempionati', 
        medal: 'gold', 
        score: '251.8', 
        discipline: '10m Pnevmatik',
        date: '22 May 2024',
        location: 'Tokio, Yaponiya',
        details: 'Osiyoda birinchi o\'rinni qo\'lga kiritib, milliy rekordni yangiladi. 10m pnevmatik miltiq turidagi musobaqada ajoyib natija ko\'rsatdi.'
      },
      { 
        name: 'Mirjalol Khasanov', 
        event: 'Osiyo O\'yinlari', 
        medal: 'gold', 
        score: '48/50', 
        discipline: 'Trap',
        date: '8 Aprel 2024',
        location: 'Gonkong',
        details: 'Osiyo o\'yinlarida Trap bo\'yicha oltin medalni qo\'lga kiritdi. Final bosqichida 50 maqsaddan 48 tasini to\'g\'ri nishonga oldi.'
      },
      { 
        name: 'Yulduz Tursunova', 
        event: 'ISSF Kubogi', 
        medal: 'silver', 
        score: '45/50', 
        discipline: 'Skeet',
        date: '12 Mart 2024',
        location: 'Kairo, Misr',
        details: 'ISSF Kubogi musobaqasida kumush medal sohibi bo\'ldi. Skeet bo\'yicha ajoyib ko\'rsatkich qayd etdi.'
      },
      { 
        name: 'Bekzod Rahimov', 
        event: 'Jahon Chempionati', 
        medal: 'bronze', 
        score: '620.1', 
        discipline: 'Vintovka 3x40',
        date: '5 Fevral 2024',
        location: 'Rio-de-Janeyro, Braziliya',
        details: 'Jahon chempionatida bronza medal oldi. 3x40 vintovka bo\'yicha yuqori natija ko\'rsatdi va podyumga chiqdi.'
      },
      { 
        name: 'Dilnoza Karimova', 
        event: 'Osiyo Kubogi', 
        medal: 'silver', 
        score: '247.9', 
        discipline: 'Pnevmatik',
        date: '18 Yanvar 2024',
        location: 'Bangkok, Tailand',
        details: 'Osiyo kubogida kumush medal qo\'lga kiritdi. Pnevmatik miltiq bo\'yicha yuqori malaka namoyish etdi.'
      },
      { 
        name: 'Jasur Aliyev', 
        event: 'Grand Prix', 
        medal: 'gold', 
        score: '47/50', 
        discipline: 'Trap',
        date: '30 Dekabr 2024',
        location: 'Dubai, BAA',
        details: 'Grand Prix musobaqasida g\'olib bo\'ldi. Trap bo\'yicha 47/50 ball to\'plab oltin medal oldi.'
      },
      { 
        name: 'Madina Azimova', 
        event: 'Chempionlar ligi', 
        medal: 'bronze', 
        score: '44/50', 
        discipline: 'Skeet',
        date: '20 Noyabr 2024',
        location: 'London, Buyuk Britaniya',
        details: 'Chempionlar ligasida bronza medal qo\'lga kiritdi. Skeet bo\'yicha yaxshi natija ko\'rsatdi.'
      },
    ],
    2023: [
      { 
        name: 'Sevara Nematova', 
        event: 'Osiyo Chempionati', 
        medal: 'silver', 
        score: '249.2', 
        discipline: '10m Pnevmatik',
        date: '10 Iyul 2023',
        location: 'Pekin, Xitoy',
        details: 'Osiyo chempionatida kumush medal oldi. Pnevmatik miltiq bo\'yicha ajoyib natija qayd etdi.'
      },
      { 
        name: 'Mirjalol Khasanov', 
        event: 'ISSF Grand Prix', 
        medal: 'gold', 
        score: '47/50', 
        discipline: 'Trap',
        date: '3 Iyun 2023',
        location: 'Parij, Fransiya',
        details: 'ISSF Grand Prix musobaqasida oltin medal qo\'lga kiritdi. Trap bo\'yicha yuqori malaka namoyish etdi.'
      },
      { 
        name: 'Doniyor Islamov', 
        event: 'Jahon Kubogi', 
        medal: 'bronze', 
        score: '615.3', 
        discipline: '50m Vintovka',
        date: '25 May 2023',
        location: 'Myunxen, Germaniya',
        details: 'Jahon kubogida bronza medal oldi. 50m vintovka bo\'yicha podyumga chiqdi.'
      },
      { 
        name: 'Bekzod Rahimov', 
        event: 'Osiyo O\'yinlari', 
        medal: 'silver', 
        score: '617.8', 
        discipline: 'Vintovka',
        date: '14 Aprel 2023',
        location: 'Gonkong',
        details: 'Osiyo o\'yinlarida kumush medal sohibi bo\'ldi. Vintovkadan otishda yuqori natija ko\'rsatdi.'
      },
    ],
    2022: [
      { 
        name: 'Yulduz Tursunova', 
        event: 'Osiyo Kubogi', 
        medal: 'gold', 
        score: '46/50', 
        discipline: 'Skeet',
        date: '20 Sentyabr 2022',
        location: 'Kuala-Lumpur, Malayziya',
        details: 'Osiyo kubogida oltin medal qo\'lga kiritdi. Skeet bo\'yicha g\'olib bo\'ldi.'
      },
      { 
        name: 'Bekzod Rahimov', 
        event: 'ISSF Chempionati', 
        medal: 'silver', 
        score: '618.7', 
        discipline: 'Vintovka',
        date: '5 Avgust 2022',
        location: 'Rim, Italiya',
        details: 'ISSF chempionatida kumush medal oldi. Vintovka bo\'yicha ajoyib natija qayd etdi.'
      },
      { 
        name: 'Jasur Aliyev', 
        event: 'Jahon Kubogi', 
        medal: 'bronze', 
        score: '46/50', 
        discipline: 'Trap',
        date: '12 Iyul 2022',
        location: 'Madrida, Ispaniya',
        details: 'Jahon kubogida bronza medal qo\'lga kiritdi. Trap bo\'yicha podyumga chiqdi.'
      },
    ],
  };

  const getMedalColor = (medal: string) => {
    switch (medal) {
      case 'gold': return 'from-yellow-400 to-amber-600';
      case 'silver': return 'from-gray-300 to-gray-500';
      case 'bronze': return 'from-orange-400 to-orange-700';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getMedalIcon = (medal: string) => {
    switch (medal) {
      case 'gold': return Crown;
      case 'silver': return Medal;
      case 'bronze': return Award;
      default: return Trophy;
    }
  };

  const currentAchievements = achievementsByYear[selectedYear] || [];
  
  // Reverse the order to show most recent first
  const reversedAchievements = [...currentAchievements].reverse();

  // Filter by search query
  const filteredAchievements = reversedAchievements.filter(achievement => 
    searchQuery === '' || 
    achievement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    achievement.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
    achievement.discipline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalMedals = {
    gold: currentAchievements.filter(a => a.medal === 'gold').length,
    silver: currentAchievements.filter(a => a.medal === 'silver').length,
    bronze: currentAchievements.filter(a => a.medal === 'bronze').length,
  };

  const currentYearIndex = years.indexOf(selectedYear);
  const canGoPrev = currentYearIndex > 0;
  const canGoNext = currentYearIndex < years.length - 1;

  const handlePrevYear = () => {
    if (canGoPrev) {
      setSelectedYear(years[currentYearIndex - 1]);
    }
  };

  const handleNextYear = () => {
    if (canGoNext) {
      setSelectedYear(years[currentYearIndex + 1]);
    }
  };

  return (
    <div className={`min-h-screen pt-10 pb-30 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300 ${
      isDark
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950'
        : 'bg-gradient-to-br from-amber-50 via-white to-emerald-50'
    }`}>
      {/* Animated Target Rings */}
      <div className="absolute inset-0">
        {isDark ? (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-500/10"
                style={{ width: 200 + i * 150, height: 200 + i * 150 }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  delay: i * 0.3,
                }}
              />
            ))}
          </>
        ) : (
          <>
            {/* Light mode animated shapes */}
            <motion.div
              className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-1/3 right-20 w-80 h-80 bg-gradient-to-br from-emerald-200/30 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-br from-yellow-200/20 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Target rings pattern for light mode */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/20"
                style={{ width: 250 + i * 180, height: 250 + i * 180 }}
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  delay: i * 0.4,
                }}
              />
            ))}
            {/* Enhanced target and grid pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="achievements-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <circle cx="30" cy="30" r="2" fill="rgb(251, 191, 36)" opacity="0.4"/>
                  <circle cx="10" cy="10" r="1" fill="rgb(16, 185, 129)" opacity="0.3"/>
                  <circle cx="50" cy="50" r="1" fill="rgb(245, 158, 11)" opacity="0.3"/>
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgb(251, 191, 36)" strokeWidth="0.6" opacity="0.3"/>
                  <path d="M 0 60 L 60 0" fill="none" stroke="rgb(16, 185, 129)" strokeWidth="0.4" opacity="0.2"/>
                </pattern>
                <pattern id="target-circles" width="120" height="120" patternUnits="userSpaceOnUse">
                  <circle cx="60" cy="60" r="25" fill="none" stroke="rgb(251, 191, 36)" strokeWidth="0.6" opacity="0.2"/>
                  <circle cx="60" cy="60" r="40" fill="none" stroke="rgb(16, 185, 129)" strokeWidth="0.5" opacity="0.15"/>
                  <circle cx="60" cy="60" r="3" fill="rgb(239, 68, 68)" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#achievements-grid)" />
              <rect width="100%" height="100%" fill="url(#target-circles)" />
            </svg>
            {/* Crosshair decorative elements */}
            <div className="absolute top-1/4 left-10 w-32 h-32 opacity-10">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
              <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-emerald-500 to-transparent"></div>
            </div>
            <div className="absolute bottom-1/4 right-10 w-32 h-32 opacity-10">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
              <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-emerald-500 to-transparent"></div>
            </div>
          </>
        )}
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10">
        {/* Search and Year Navigation Side by Side */}
        <div className="flex items-center justify-between gap-6 mb-12">
          {/* Search Button */}
          <motion.div
            className="relative"
            initial={{ width: 60 }}
            animate={{ width: searchOpen ? 350 : 60 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {searchOpen ? (
              <div className="relative">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'uz' ? 'Qidirish...' : 'Поиск...'}
                  className={`pl-12 pr-12 py-4 border-2 rounded-3xl shadow-lg ${
                    isDark 
                      ? 'bg-slate-900/80 border-amber-500/50 text-amber-200 placeholder:text-amber-200/40 focus:border-amber-500/80'
                      : 'bg-white/90 border-amber-400/50 text-gray-800 placeholder:text-gray-400 focus:border-amber-500'
                  }`}
                  autoFocus
                />
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSearchOpen(false);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-amber-500/20 rounded-full transition-colors"
                >
                  <X className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                </button>
              </div>
            ) : (
              <motion.button
                onClick={() => setSearchOpen(true)}
                className="w-16 h-16 bg-gradient-to-br from-amber-500 via-yellow-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <Search className="w-7 h-7 text-white relative z-10" />
              </motion.button>
            )}
          </motion.div>

          {/* Year Navigation with Podium */}
          <div className="flex items-center gap-6 flex-1 justify-center">
          {/* Left Arrow */}
          <motion.button
            onClick={handlePrevYear}
            disabled={!canGoPrev}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
              canGoPrev
                ? 'bg-gradient-to-r from-amber-500 to-emerald-500 text-white shadow-lg'
                : 'bg-slate-800/40 text-slate-600 cursor-not-allowed'
            }`}
            whileHover={canGoPrev ? { scale: 1.1, rotate: -15 } : {}}
            whileTap={canGoPrev ? { scale: 0.9 } : {}}
          >
            <ChevronLeft className="w-8 h-8" />
          </motion.button>

          {/* Center: Year Display + Podium */}
          <div className="flex flex-col items-center">
            {/* Year Display */}
            <motion.div
              key={selectedYear}
              className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotateY: 90 }}
              transition={{ type: 'spring', duration: 0.8 }}
            >
              {selectedYear}
            </motion.div>

            {/* Podium */}
            <div className="flex justify-center items-end gap-4">
              {/* Silver - 2nd */}
              <motion.div
                key={`silver-${selectedYear}`}
                className="flex-1 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center shadow-xl"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Medal className="w-8 h-8 text-white" />
                </motion.div>
                <div className="bg-gradient-to-br from-gray-400 to-gray-600 rounded-t-2xl p-4 h-28 flex flex-col justify-center min-w-[100px]">
                  <div className="text-3xl text-white mb-1">{totalMedals.silver}</div>
                  <div className="text-xs text-gray-200">{language === 'uz' ? 'Kumush' : 'Серебро'}</div>
                </div>
              </motion.div>

              {/* Gold - 1st (Tallest) */}
              <motion.div
                key={`gold-${selectedYear}`}
                className="flex-1 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <motion.div
                  className="w-20 h-20 mx-auto mb-2 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-2xl"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(251, 191, 36, 0.5)',
                      '0 0 40px rgba(251, 191, 36, 0.8)',
                      '0 0 20px rgba(251, 191, 36, 0.5)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                >
                  <Crown className="w-10 h-10 text-white" />
                </motion.div>
                <div className="bg-gradient-to-br from-yellow-400 to-amber-600 rounded-t-2xl p-4 h-40 flex flex-col justify-center min-w-[120px]">
                  <div className="text-4xl text-white mb-1">{totalMedals.gold}</div>
                  <div className="text-xs text-yellow-100 mb-2">{language === 'uz' ? 'Oltin' : 'Золото'}</div>
                  <Trophy className="w-6 h-6 text-white mx-auto" />
                </div>
              </motion.div>

              {/* Bronze - 3rd */}
              <motion.div
                key={`bronze-${selectedYear}`}
                className="flex-1 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-orange-400 to-orange-700 flex items-center justify-center shadow-xl"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Award className="w-8 h-8 text-white" />
                </motion.div>
                <div className="bg-gradient-to-br from-orange-400 to-orange-700 rounded-t-2xl p-4 h-24 flex flex-col justify-center min-w-[100px]">
                  <div className="text-3xl text-white mb-1">{totalMedals.bronze}</div>
                  <div className="text-xs text-orange-200">{language === 'uz' ? 'Bronza' : 'Бронза'}</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Arrow */}
          <motion.button
            onClick={handleNextYear}
            disabled={!canGoNext}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
              canGoNext
                ? 'bg-gradient-to-r from-amber-500 to-emerald-500 text-white shadow-lg'
                : 'bg-slate-800/40 text-slate-600 cursor-not-allowed'
            }`}
            whileHover={canGoNext ? { scale: 1.1, rotate: 15 } : {}}
            whileTap={canGoNext ? { scale: 0.9 } : {}}
          >
            <ChevronRight className="w-8 h-8" />
          </motion.button>
          </div>
        </div>

        {/* Achievements List - Reversed Order (Most Recent First) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedYear}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredAchievements.map((achievement, index) => {
              const MedalIcon = getMedalIcon(achievement.medal);
              
              return (
                <motion.div
                  key={index}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    rotateY: 0,
                    scale: 1,
                  }}
                  transition={{ 
                    delay: index * 0.08,
                    type: 'spring',
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    z: 50,
                  }}
                  onClick={() => setSelectedAchievement(achievement)}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className={`relative ${
                    isDark
                      ? 'bg-gradient-to-br from-slate-900/90 to-emerald-900/70 border-amber-500/30'
                      : 'bg-gradient-to-br from-white/95 via-amber-50/40 to-emerald-50/50 border-amber-300/60 shadow-amber-200/50'
                  } backdrop-blur-sm rounded-2xl p-5 border shadow-xl overflow-hidden h-full transition-all duration-300 hover:shadow-amber-300/70 hover:border-emerald-400/70`}>
                    {/* Diagonal Accent */}
                    <div 
                      className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getMedalColor(achievement.medal)}`}
                      style={{ transform: 'skewY(-2deg)' }}
                    />

                    {/* Sport Icon in Top Right */}
                    <motion.div
                      className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm flex items-center justify-center border border-amber-500/30"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                    >
                      {(() => {
                        const { icon: Icon, color } = getDisciplineIcon(achievement.discipline);
                        return <Icon className={`w-5 h-5 ${color}`} />;
                      })()}
                    </motion.div>

                    {/* Medal Icon */}
                    <div className="flex items-start gap-3 mb-4">
                      <motion.div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getMedalColor(achievement.medal)} flex items-center justify-center shadow-lg flex-shrink-0`}
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                      >
                        <MedalIcon className="w-7 h-7 text-white" />
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <h3 className={`${isDark ? 'text-amber-300' : 'text-gray-800'} mb-1 line-clamp-1`}>{achievement.name}</h3>
                        <Badge className={`bg-gradient-to-r ${getMedalColor(achievement.medal)} text-white border-0 text-xs`}>
                          {achievement.medal === 'gold' ? '🥇' : achievement.medal === 'silver' ? '🥈' : '🥉'}
                        </Badge>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm line-clamp-1 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{achievement.event}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-sm line-clamp-1 ${isDark ? 'text-amber-200/70' : 'text-gray-600'}`}>{achievement.discipline}</span>
                        <Badge className={`${isDark ? 'bg-slate-800/50 text-amber-400 border-amber-500/30' : 'bg-amber-100 text-amber-700 border-amber-300'} border flex-shrink-0`}>
                          <Target className="w-3 h-3 mr-1" />
                          {achievement.score}
                        </Badge>
                      </div>
                    </div>

                    {/* Hover Glow */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${getMedalColor(achievement.medal)} opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className={`${
                isDark
                  ? 'bg-gradient-to-br from-slate-900/95 to-emerald-900/90'
                  : 'bg-gradient-to-br from-white/98 via-amber-50/30 to-emerald-50/40'
              } border ${isDark ? 'border-amber-500/30' : 'border-emerald-400/60'} rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <div className="sticky top-0 z-10 flex justify-end p-4">
                <motion.button
                  onClick={() => setSelectedAchievement(null)}
                  className={`w-12 h-12 ${
                    isDark ? 'bg-red-500/20 hover:bg-red-500/40' : 'bg-red-100 hover:bg-red-200'
                  } backdrop-blur-xl rounded-full flex items-center justify-center border ${
                    isDark ? 'border-red-500/40' : 'border-red-300'
                  }`}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className={`w-6 h-6 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                </motion.button>
              </div>

              {/* Content */}
              <div className="px-8 pb-8 -mt-4">
                {/* Header with Medal */}
                <div className="flex items-start gap-6 mb-8">
                  <motion.div
                    className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${getMedalColor(selectedAchievement.medal)} flex items-center justify-center shadow-2xl flex-shrink-0`}
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(251, 191, 36, 0.3)',
                        '0 0 40px rgba(251, 191, 36, 0.6)',
                        '0 0 20px rgba(251, 191, 36, 0.3)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {(() => {
                      const MedalIcon = getMedalIcon(selectedAchievement.medal);
                      return <MedalIcon className="w-12 h-12 text-white" />;
                    })()}
                  </motion.div>

                  <div className="flex-1">
                    <h2 className={`text-3xl mb-2 ${isDark ? 'text-amber-300' : 'text-gray-800'}`}>
                      {selectedAchievement.name}
                    </h2>
                    <Badge className={`bg-gradient-to-r ${getMedalColor(selectedAchievement.medal)} text-white border-0 px-4 py-1.5 text-base`}>
                      {selectedAchievement.medal === 'gold' ? '🥇 Oltin Medal' : selectedAchievement.medal === 'silver' ? '🥈 Kumush Medal' : '🥉 Bronza Medal'}
                    </Badge>
                  </div>
                </div>

                {/* Event Details */}
                <div className={`${
                  isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-gray-50 border-gray-200'
                } rounded-2xl p-6 mb-6 border`}>
                  <h3 className={`text-xl mb-4 flex items-center gap-2 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    <Trophy className="w-6 h-6" />
                    {selectedAchievement.event}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Date */}
                    {selectedAchievement.date && (
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl ${
                          isDark ? 'bg-purple-500/20' : 'bg-purple-100'
                        } flex items-center justify-center`}>
                          <Calendar className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                        </div>
                        <div>
                          <div className={`text-xs ${isDark ? 'text-amber-200/60' : 'text-gray-500'}`}>
                            {language === 'uz' ? 'Sana' : 'Дата'}
                          </div>
                          <div className={`${isDark ? 'text-amber-200' : 'text-gray-800'}`}>
                            {selectedAchievement.date}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Location */}
                    {selectedAchievement.location && (
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl ${
                          isDark ? 'bg-blue-500/20' : 'bg-blue-100'
                        } flex items-center justify-center`}>
                          <MapPin className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                        </div>
                        <div>
                          <div className={`text-xs ${isDark ? 'text-amber-200/60' : 'text-gray-500'}`}>
                            {language === 'uz' ? 'Joylashuv' : 'Место'}
                          </div>
                          <div className={`${isDark ? 'text-amber-200' : 'text-gray-800'}`}>
                            {selectedAchievement.location}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Discipline & Score */}
                <div className={`${
                  isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200'
                } rounded-2xl p-6 mb-6 border`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {(() => {
                        const { icon: Icon, color } = getDisciplineIcon(selectedAchievement.discipline);
                        return <Icon className={`w-6 h-6 ${color}`} />;
                      })()}
                      <span className={`text-lg ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
                        {selectedAchievement.discipline}
                      </span>
                    </div>
                    <Badge className={`${
                      isDark ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-amber-100 text-amber-700 border-amber-300'
                    } border px-4 py-2 text-base`}>
                      <Star className="w-4 h-4 mr-1" />
                      {selectedAchievement.score}
                    </Badge>
                  </div>
                </div>

                {/* Details/Description */}
                {selectedAchievement.details && (
                  <div className={`${
                    isDark ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'
                  } rounded-2xl p-6 border`}>
                    <h4 className={`text-lg mb-3 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      {language === 'uz' ? 'Yutuq haqida' : 'О достижении'}
                    </h4>
                    <p className={`leading-relaxed ${isDark ? 'text-amber-200/80' : 'text-gray-700'}`}>
                      {selectedAchievement.details}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Achievements