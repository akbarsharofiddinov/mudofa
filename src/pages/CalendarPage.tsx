import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import { Calendar as CalendarIcon, MapPin, Users, Clock, ChevronLeft, ChevronRight, Trophy, Target, Crosshair, Flame, Shield, Swords, X, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/UI/tabs';
import { ScrollArea } from '@/components/UI/scroll-area';

type CalendarView = 'month' | 'week' | 'year';

interface EventData {
  date: { day: number; month: number; year: number };
  title: string;
  location: string;
  participants: number;
  time: string;
  color: string;
  category: string;
  sport: string;
  teams: Array<{ name: string; logo?: string; country: string }>;
  description: string;
}

// Sport icon mapping
const getSportIcon = (sport: string) => {
  const sportLower = sport.toLowerCase();
  
  if (sportLower.includes('otishma') || sportLower.includes('shooting')) {
    return { icon: Crosshair, color: 'text-red-500' };
  }
  if (sportLower.includes('kurash') || sportLower.includes('wrestling')) {
    return { icon: Users, color: 'text-purple-500' };
  }
  if (sportLower.includes('box') || sportLower.includes('boxing')) {
    return { icon: Flame, color: 'text-orange-500' };
  }
  if (sportLower.includes('judo')) {
    return { icon: Swords, color: 'text-indigo-500' };
  }
  if (sportLower.includes('atletika') || sportLower.includes('athletics')) {
    return { icon: Target, color: 'text-green-500' };
  }
  
  return { icon: Trophy, color: 'text-amber-500' };
};

interface CalendarPageProps {
  onClose: () => void;
}

export function CalendarPage({ onClose }: CalendarPageProps) {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [calendarView, setCalendarView] = useState<CalendarView>('month');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];
  const monthsShort = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];
  const daysOfWeek = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];

  const events: EventData[] = [
    {
      date: { day: 15, month: 2, year: 2025 },
      title: 'Milliy Chempionat - Yengil atletika',
      sport: 'Yengil atletika',
      location: 'Toshkent, O\'zbekiston',
      participants: 320,
      time: '09:00 - 18:00',
      color: 'from-blue-500 to-cyan-500',
      category: 'monthly',
      teams: [
        { name: 'Toshkent jamoasi', country: 'O\'zbekiston' },
        { name: 'Samarqand jamoasi', country: 'O\'zbekiston' },
        { name: 'Buxoro jamoasi', country: 'O\'zbekiston' },
      ],
      description: 'Milliy chempionat yengil atletika bo\'yicha. Barcha viloyatlar ishtirok etadi.',
    },
    {
      date: { day: 22, month: 2, year: 2025 },
      title: 'MDH Kubogi - Kurash',
      sport: 'Kurash',
      location: 'Samarqand, O\'zbekiston',
      participants: 250,
      time: '10:00 - 19:00',
      color: 'from-emerald-500 to-green-500',
      category: 'monthly',
      teams: [
        { name: 'O\'zbekiston', country: 'O\'zbekiston' },
        { name: 'Qozog\'iston', country: 'Qozog\'iston' },
        { name: 'Rossiya', country: 'Rossiya' },
        { name: 'Belarus', country: 'Belarus' },
      ],
      description: 'MDH mamlakatlari o\'rtasida kurash bo\'yicha kubokli musobaqa.',
    },
    {
      date: { day: 5, month: 3, year: 2025 },
      title: 'Osiyo Chempionati - Judo',
      sport: 'Judo',
      location: 'Seul, Janubiy Koreya',
      participants: 480,
      time: '08:00 - 20:00',
      color: 'from-purple-500 to-pink-500',
      category: 'yearly',
      teams: [
        { name: 'O\'zbekiston', country: 'O\'zbekiston' },
        { name: 'Janubiy Koreya', country: 'Janubiy Koreya' },
        { name: 'Yaponiya', country: 'Yaponiya' },
        { name: 'Xitoy', country: 'Xitoy' },
        { name: 'Qozog\'iston', country: 'Qozog\'iston' },
      ],
      description: 'Osiyo judo chempionati. Eng yaxshi judochilar ishtirok etadi.',
    },
    {
      date: { day: 18, month: 3, year: 2025 },
      title: 'Jahon Kubogi - Box',
      sport: 'Box',
      location: 'London, Angliya',
      participants: 520,
      time: '14:00 - 22:00',
      color: 'from-red-500 to-orange-500',
      category: 'yearly',
      teams: [
        { name: 'O\'zbekiston', country: 'O\'zbekiston' },
        { name: 'Angliya', country: 'Angliya' },
        { name: 'AQSH', country: 'AQSH' },
        { name: 'Kuba', country: 'Kuba' },
        { name: 'Rossiya', country: 'Rossiya' },
      ],
      description: 'Professional boks bo\'yicha jahon kubogi musobaqasi.',
    },
    {
      date: { day: 10, month: 4, year: 2025 },
      title: 'Olimpiya Tanlov - Suzish',
      sport: 'Suzish',
      location: 'Parij, Fransiya',
      participants: 380,
      time: '07:00 - 19:00',
      color: 'from-cyan-500 to-blue-500',
      category: 'yearly',
      teams: [
        { name: 'O\'zbekiston', country: 'O\'zbekiston' },
        { name: 'Fransiya', country: 'Fransiya' },
        { name: 'AQSH', country: 'AQSH' },
        { name: 'Avstraliya', country: 'Avstraliya' },
      ],
      description: 'Olimpiya o\'yinlariga tanlov musobaqasi - suzish.',
    },
    {
      date: { day: 25, month: 2, year: 2025 },
      title: 'Haftalik Tayyorgarlik - Otishma',
      sport: 'Otishma',
      location: 'Toshkent, O\'zbekiston',
      participants: 50,
      time: '10:00 - 14:00',
      color: 'from-amber-500 to-yellow-500',
      category: 'weekly',
      teams: [
        { name: 'Mudofaa Vazirligi jamoasi', country: 'O\'zbekiston' },
        { name: 'Dinamo jamoasi', country: 'O\'zbekiston' },
      ],
      description: 'Haftalik mashg\'ulot va tayyorgarlik musobaqasi.',
    },
    {
      date: { day: 28, month: 2, year: 2025 },
      title: 'Yoshlar Chempionati - Kurash',
      sport: 'Kurash',
      location: 'Toshkent, O\'zbekiston',
      participants: 180,
      time: '09:00 - 17:00',
      color: 'from-purple-500 to-pink-500',
      category: 'monthly',
      teams: [
        { name: 'U-18 Toshkent', country: 'O\'zbekiston' },
        { name: 'U-18 Samarqand', country: 'O\'zbekiston' },
        { name: 'U-18 Farg\'ona', country: 'O\'zbekiston' },
      ],
      description: '18 yoshgacha bo\'lgan yoshlar kurash chempionati.',
    },
  ];

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.day === date.getDate() &&
      event.date.month === date.getMonth() + 1 &&
      event.date.year === date.getFullYear()
    );
  };

  // Get days in month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  // Navigate months
  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Get week days for week view
  const getWeekDays = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  // Get months for year view
  const getMonthsForYear = () => {
    return Array.from({ length: 12 }, (_, i) => i);
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto transition-colors duration-300 ${
      isDark
        ? 'bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900'
        : 'bg-gradient-to-br from-slate-50 via-emerald-50 to-white'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {isDark ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.15),transparent_40%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.15),transparent_40%)]"></div>
          </>
        ) : (
          <>
            <motion.div
              className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.3, 0.4],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="calendar-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <circle cx="30" cy="30" r="2" fill="rgb(16, 185, 129)" opacity="0.4"/>
                  <circle cx="10" cy="10" r="1" fill="rgb(251, 191, 36)" opacity="0.3"/>
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgb(16, 185, 129)" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#calendar-grid)" />
            </svg>
          </>
        )}
      </div>

      <div className="relative z-10 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-4">
              <motion.button
                onClick={onClose}
                className="p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-xl transition-colors border border-amber-500/30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft className="w-6 h-6 text-amber-400" />
              </motion.button>
              
              <div>
                <h1 className="text-4xl md:text-5xl bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent flex items-center gap-3">
                  <CalendarIcon className="w-10 h-10 text-amber-400" />
                  {language === 'uz' ? 'Tadbirlar Taqvimi' : 'Календарь Мероприятий'}
                </h1>
                <p className="text-amber-200/60 mt-2">{language === 'uz' ? 'Barcha sport tadbirlari' : 'Все спортивные мероприятия'}</p>
              </div>
            </div>

            <motion.button
              onClick={onClose}
              className="p-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-colors border border-red-500/40"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6 text-red-400" />
            </motion.button>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs value={calendarView} onValueChange={(v) => setCalendarView(v as CalendarView)}>
              <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 bg-slate-800/50 mb-8">
                <TabsTrigger value="month" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-emerald-500">
                  {language === 'uz' ? 'Oylik' : 'Месяц'}
                </TabsTrigger>
                <TabsTrigger value="week" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-emerald-500">
                  {language === 'uz' ? 'Haftalik' : 'Неделя'}
                </TabsTrigger>
                <TabsTrigger value="year" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-emerald-500">
                  {language === 'uz' ? 'Yillik' : 'Год'}
                </TabsTrigger>
              </TabsList>

              {/* Month View */}
              <TabsContent value="month">
                <div className="space-y-6">
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-6 bg-slate-800/50 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-4">
                    <motion.button
                      onClick={previousMonth}
                      className="p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl transition-colors"
                      whileHover={{ scale: 1.1, x: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft className="w-6 h-6 text-amber-400" />
                    </motion.button>
                    
                    <h3 className="text-3xl text-emerald-400">
                      {months[currentMonth]} {currentYear}
                    </h3>
                    
                    <motion.button
                      onClick={nextMonth}
                      className="p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl transition-colors"
                      whileHover={{ scale: 1.1, x: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="w-6 h-6 text-amber-400" />
                    </motion.button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="bg-slate-800/30 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-6">
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {/* Day Headers */}
                      {daysOfWeek.map(day => (
                        <div key={day} className="text-center text-amber-400 p-3 rounded-xl bg-slate-800/50">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {/* Calendar Days */}
                      {generateCalendarDays().map((day, index) => {
                        if (!day) {
                          return <div key={`empty-${index}`} className="p-2 min-h-[100px]" />;
                        }

                        const date = new Date(currentYear, currentMonth, day);
                        const dayEvents = getEventsForDate(date);
                        const isToday = 
                          day === new Date().getDate() &&
                          currentMonth === new Date().getMonth() &&
                          currentYear === new Date().getFullYear();

                        return (
                          <motion.div
                            key={day}
                            className={`relative p-3 rounded-xl cursor-pointer transition-all min-h-[100px] ${
                              isToday
                                ? 'bg-gradient-to-br from-amber-500/30 to-emerald-500/30 border-2 border-amber-500'
                                : dayEvents.length > 0
                                ? 'bg-slate-800/50 hover:bg-slate-700/50 border border-amber-500/20'
                                : 'bg-slate-800/30 hover:bg-slate-700/30'
                            }`}
                            onClick={() => {
                              setSelectedDate(date);
                              if (dayEvents.length === 1) {
                                setSelectedEvent(dayEvents[0]);
                              }
                            }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="text-lg text-amber-200 mb-2">{day}</div>
                            {dayEvents.length > 0 && (
                              <div className="mt-1">
                                <div className="flex items-center gap-1 mb-2">
                                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                  <span className="text-xs text-emerald-400">{dayEvents.length}</span>
                                </div>
                                {dayEvents.slice(0, 2).map((event, idx) => (
                                  <div
                                    key={idx}
                                    className={`text-xs text-white/90 truncate px-2 py-1 rounded-lg bg-gradient-to-r ${event.color} mb-1 shadow-lg`}
                                  >
                                    {event.title.split('-')[0].trim()}
                                  </div>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Selected Date Events */}
                  {selectedDate && getEventsForDate(selectedDate).length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-6 bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-amber-500/30"
                    >
                      <h4 className="text-2xl text-amber-300 mb-6 flex items-center gap-3">
                        <CalendarIcon className="w-6 h-6" />
                        {selectedDate.getDate()} {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                      </h4>
                      <div className="space-y-3">
                        {getEventsForDate(selectedDate).map((event, idx) => {
                          const { icon: SportIcon } = getSportIcon(event.sport);
                          return (
                            <motion.div
                              key={idx}
                              className="p-5 bg-slate-900/50 rounded-2xl border border-emerald-500/20 cursor-pointer hover:border-emerald-500/40 transition-colors"
                              whileHover={{ x: 10, scale: 1.02 }}
                              onClick={() => setSelectedEvent(event)}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${event.color} flex items-center justify-center shadow-xl`}>
                                  <SportIcon className="w-7 h-7 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h5 className="text-lg text-emerald-400 mb-1">{event.title}</h5>
                                  <p className="text-sm text-amber-200/60">{event.time} • {event.location}</p>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </div>
              </TabsContent>

              {/* Week View */}
              <TabsContent value="week">
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    <h3 className="text-2xl text-emerald-400 mb-4">
                      {language === 'uz' ? 'Hafta' : 'Неделя'}: {selectedDate.toLocaleDateString()}
                    </h3>
                    
                    <div className="grid grid-cols-7 gap-3">
                      {getWeekDays(selectedDate).map((day, index) => {
                        const dayEvents = getEventsForDate(day);
                        const isToday = day.toDateString() === new Date().toDateString();
                        
                        return (
                          <div key={index} className="space-y-2">
                            <div className={`text-center p-4 rounded-xl ${
                              isToday ? 'bg-gradient-to-br from-amber-500/30 to-emerald-500/30 border-2 border-amber-500' : 'bg-slate-800/50'
                            }`}>
                              <div className="text-xs text-amber-400">{daysOfWeek[day.getDay()]}</div>
                              <div className="text-2xl text-white my-1">{day.getDate()}</div>
                              <div className="text-xs text-emerald-400">{monthsShort[day.getMonth()]}</div>
                            </div>
                            
                            <div className="space-y-2">
                              {dayEvents.map((event, idx) => {
                                const { icon: SportIcon } = getSportIcon(event.sport);
                                return (
                                  <motion.div
                                    key={idx}
                                    className={`p-3 rounded-xl bg-gradient-to-r ${event.color} cursor-pointer shadow-lg`}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setSelectedEvent(event)}
                                  >
                                    <div className="flex items-center gap-2 mb-2">
                                      <SportIcon className="w-4 h-4 text-white" />
                                      <div className="text-xs text-white font-medium truncate">{event.title.split('-')[0]}</div>
                                    </div>
                                    <div className="text-xs text-white/80">{event.time.split('-')[0]}</div>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Year View */}
              <TabsContent value="year">
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    <h3 className="text-3xl text-emerald-400 mb-6">{currentYear}</h3>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {getMonthsForYear().map(monthIndex => {
                        const monthEvents = events.filter(
                          e => e.date.month === monthIndex + 1 && e.date.year === currentYear
                        );
                        
                        return (
                          <motion.div
                            key={monthIndex}
                            className="p-5 bg-slate-800/50 rounded-2xl border border-amber-500/20 cursor-pointer hover:border-amber-500/40 transition-colors"
                            whileHover={{ scale: 1.05, y: -5 }}
                            onClick={() => {
                              setCurrentMonth(monthIndex);
                              setCalendarView('month');
                            }}
                          >
                            <h4 className="text-xl text-amber-300 mb-4">{months[monthIndex]}</h4>
                            
                            {monthEvents.length > 0 ? (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-emerald-400">
                                  <CalendarIcon className="w-5 h-5" />
                                  <span>{monthEvents.length} {language === 'uz' ? 'tadbir' : 'событий'}</span>
                                </div>
                                
                                {monthEvents.slice(0, 3).map((event, idx) => {
                                  const { icon: SportIcon } = getSportIcon(event.sport);
                                  return (
                                    <div key={idx} className={`p-3 rounded-xl bg-gradient-to-r ${event.color} text-sm text-white flex items-center gap-2 shadow-lg`}>
                                      <SportIcon className="w-4 h-4" />
                                      <span className="truncate">{event.date.day} - {event.title.split('-')[0]}</span>
                                    </div>
                                  );
                                })}
                                
                                {monthEvents.length > 3 && (
                                  <div className="text-sm text-amber-400">
                                    +{monthEvents.length - 3} {language === 'uz' ? 'ko\'proq' : 'больше'}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="text-amber-200/50">{language === 'uz' ? 'Tadbirlar yo\'q' : 'Нет событий'}</div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>

      {/* Event Details Dialog */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-slate-900/98 to-emerald-900/80 border-2 border-amber-500/40 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    {(() => {
                      const { icon: SportIcon } = getSportIcon(selectedEvent.sport);
                      return (
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedEvent.color} flex items-center justify-center shadow-2xl`}>
                          <SportIcon className="w-8 h-8 text-white" />
                        </div>
                      );
                    })()}
                    <div>
                      <h3 className="text-3xl text-amber-300">{selectedEvent.title}</h3>
                      <p className="text-emerald-400 mt-1">{selectedEvent.sport}</p>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => setSelectedEvent(null)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-colors"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6 text-red-400" />
                  </motion.button>
                </div>

                {/* Event Info */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-amber-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <CalendarIcon className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm text-amber-200/60">{language === 'uz' ? 'Sana' : 'Дата'}</span>
                    </div>
                    <p className="text-lg text-emerald-400">
                      {selectedEvent.date.day} {months[selectedEvent.date.month - 1]} {selectedEvent.date.year}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-800/50 rounded-xl border border-amber-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm text-amber-200/60">{language === 'uz' ? 'Vaqt' : 'Время'}</span>
                    </div>
                    <p className="text-lg text-emerald-400">{selectedEvent.time}</p>
                  </div>

                  <div className="p-4 bg-slate-800/50 rounded-xl border border-amber-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm text-amber-200/60">{language === 'uz' ? 'Joylashuv' : 'Место'}</span>
                    </div>
                    <p className="text-lg text-emerald-400">{selectedEvent.location}</p>
                  </div>

                  <div className="p-4 bg-slate-800/50 rounded-xl border border-amber-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm text-amber-200/60">{language === 'uz' ? 'Ishtirokchilar' : 'Участники'}</span>
                    </div>
                    <p className="text-lg text-emerald-400">{selectedEvent.participants}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="p-4 bg-slate-800/50 rounded-xl border border-amber-500/20 mb-6">
                  <h4 className="text-lg text-amber-300 mb-3">{language === 'uz' ? 'Tavsif' : 'Описание'}</h4>
                  <p className="text-amber-200/80">{selectedEvent.description}</p>
                </div>

                {/* Teams */}
                <div className="p-4 bg-slate-800/50 rounded-xl border border-amber-500/20">
                  <h4 className="text-lg text-amber-300 mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    {language === 'uz' ? 'Ishtirok Etuvchi Jamoalar' : 'Участвующие Команды'}
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedEvent.teams.map((team, idx) => (
                      <motion.div
                        key={idx}
                        className={`p-4 rounded-xl bg-gradient-to-r ${selectedEvent.color} bg-opacity-20 border border-amber-500/30 hover:border-amber-500/60 transition-colors`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedEvent.color} flex items-center justify-center text-white text-xl shadow-lg`}>
                            {team.name[0]}
                          </div>
                          <div>
                            <h5 className="text-emerald-400">{team.name}</h5>
                            <p className="text-sm text-amber-200/60">{team.country}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Match Preview (if 2 teams) */}
                {selectedEvent.teams.length === 2 && (
                  <div className="p-6 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-xl border-2 border-amber-500/40 mt-6">
                    <h4 className="text-xl text-amber-300 mb-6 text-center">
                      {language === 'uz' ? 'Musobaqa Ko\'rinishi' : 'Предварительный Просмотр Матча'}
                    </h4>
                    
                    <div className="flex items-center justify-between">
                      <motion.div
                        className="flex-1 text-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className={`w-24 h-24 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${selectedEvent.color} flex items-center justify-center text-white text-4xl shadow-2xl`}>
                          {selectedEvent.teams[0].name[0]}
                        </div>
                        <h5 className="text-2xl text-emerald-400 mb-1">{selectedEvent.teams[0].name}</h5>
                        <p className="text-amber-200/60">{selectedEvent.teams[0].country}</p>
                      </motion.div>

                      <div className="px-6">
                        <div className="text-4xl text-amber-400">VS</div>
                      </div>

                      <motion.div
                        className="flex-1 text-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className={`w-24 h-24 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${selectedEvent.color} flex items-center justify-center text-white text-4xl shadow-2xl`}>
                          {selectedEvent.teams[1].name[0]}
                        </div>
                        <h5 className="text-2xl text-emerald-400 mb-1">{selectedEvent.teams[1].name}</h5>
                        <p className="text-amber-200/60">{selectedEvent.teams[1].country}</p>
                      </motion.div>
                    </div>
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
