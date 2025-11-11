import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { MapPin, Users, Clock, Search, X, CalendarDays, Trophy, Crosshair, Swords } from 'lucide-react';
import { Input } from 'antd';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/UI/dialog';
import { CalendarPage } from '../CalendarPage';
import { FaRunning } from 'react-icons/fa';
import { GiBoxingGlove } from 'react-icons/gi';
import { MdOutlineSportsKabaddi } from 'react-icons/md';
import { FaPersonSwimming } from "react-icons/fa6";

// Sport icon mapping
const getSportIcon = (sport: string) => {
  const sportLower = sport.toLowerCase();
  if (sportLower.includes('otish') || sportLower.includes('shooting')) {
    return { icon: Crosshair, color: 'text-red-500' };
  }
  if (sportLower.includes('kurash') || sportLower.includes('wrestling')) {
    return { icon: MdOutlineSportsKabaddi, color: 'text-purple-500' };
  }
  if (sportLower.includes('boks') || sportLower.includes('boxing')) {
    return { icon: GiBoxingGlove, color: 'text-orange-500' };
  }
  if (sportLower.includes('judo')) {
    return { icon: MdOutlineSportsKabaddi, color: 'text-indigo-500' };
  }
  if (sportLower.includes('atletika') || sportLower.includes('athletics')) {
    return { icon: FaRunning, color: 'text-green-500' };
  }
  if(sportLower.includes('suzish') || sportLower.includes('swimming')) {
    return { icon: FaPersonSwimming, color: 'text-blue-500' };
  }
  return { icon: Swords, color: 'text-gray-500' };
};

interface Event {
  date: { day: number; month: number; year: number };
  title: string;
  sport: string;
  location: string;
  participants: number;
  time: string;
  color: string;
  participantsList: string[];
}

const PlannedEvents: React.FC = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCalendarPage, setShowCalendarPage] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];

  const events: Event[] = [
    {
      date: { day: 15, month: 2, year: 2025 },
      title: 'Respublika Chempionati - Yengil atletika',
      sport: 'Yengil atletika',
      location: 'Toshkent, O\'zbekiston',
      participants: 320,
      time: '09:00 - 18:00',
      color: 'from-blue-500 to-cyan-500',
      participantsList: ['Sarvar Ganikhanov', 'Eldor Shomurodov', 'Bekzod Normatov', 'Jasur Yodgorov', 'Nodirbek Abdusattorov', 'Farkhod Negmatov', 'Islom Tukhtasinov'],
    },
    {
      date: { day: 22, month: 2, year: 2025 },
      title: 'MDH Kubogi - Kurash',
      sport: 'Kurash',
      location: 'Samarqand, O\'zbekiston',
      participants: 250,
      time: '10:00 - 19:00',
      color: 'from-emerald-500 to-green-500',
      participantsList: ['Davlat Bobonov', 'Muhammadkodir Yusupov', 'Sardorbek Bozorov', 'Bekzod Nazarov', 'Islom Karimov', 'Sukhrob Kholmatov'],
    },
    {
      date: { day: 5, month: 3, year: 2025 },
      title: 'Osiyo Chempionati - Judo',
      sport: 'Judo',
      location: 'Seul, Janubiy Koreya',
      participants: 480,
      time: '08:00 - 20:00',
      color: 'from-purple-500 to-pink-500',
      participantsList: ['Diyorbek Urozboev', 'Sharofiddin Lutfillaev', 'Kemran Nurillaev', 'Sardor Nurillayev', 'Muzaffarbek Turoboyev'],
    },
    {
      date: { day: 18, month: 3, year: 2025 },
      title: 'Jahon Kubogi - Boks',
      sport: 'Boks',
      location: 'London, Angliya',
      participants: 520,
      time: '14:00 - 22:00',
      color: 'from-red-500 to-orange-500',
      participantsList: ['Hasanboy Dusmatov', 'Shakhram Giyosov', 'Bakhodir Jalolov', 'Murodjon Akhmadaliev', 'Shahobiddin Zoirov', 'Nodirjon Mirzahmedov'],
    },
    {
      date: { day: 10, month: 4, year: 2025 },
      title: 'Olimpiya Tanlov - Suzish',
      sport: 'Suzish',
      location: 'Parij, Fransiya',
      participants: 380,
      time: '07:00 - 19:00',
      color: 'from-cyan-500 to-blue-500',
      participantsList: ['Izatullo Nematov', 'Maftuna Shoyimardonova', 'Komiljon Tukhtasinov', 'Nigora Tursunova', 'Shohruh Sharipov'],
    },
    {
      date: { day: 25, month: 2, year: 2025 },
      title: 'Haftalik Tayyorgarlik - O\'q otish',
      sport: 'O\'q otish',
      location: 'Toshkent, O\'zbekiston',
      participants: 50,
      time: '10:00 - 14:00',
      color: 'from-amber-500 to-yellow-500',
      participantsList: ['Doniyor Islamov', 'Sevara Nematova', 'Mirjalol Khasanov', 'Yulduz Tursunova', 'Bekzod Rahimov', 'Dilnoza Karimova', 'Jasur Aliyev'],
    },
  ];

  // Filter events by search
  const filteredEvents = events.filter(event => 
    searchQuery === '' || 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showCalendarPage) {
    return <CalendarPage onClose={() => setShowCalendarPage(false)} />;
  }

  return (
    <div className={`min-h-screen pt-10 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300 ${
      isDark
        ? 'bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-900'
        : 'bg-gradient-to-br from-emerald-50 via-white to-amber-50'
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
            {/* Animated shapes for light mode */}
            <motion.div
              className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-emerald-200/30 to-transparent rounded-full blur-3xl"
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
              className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-transparent rounded-full blur-3xl"
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
              className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-green-200/20 to-transparent rounded-full blur-3xl"
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
            {/* Enhanced decorative patterns */}
            <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="events-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <circle cx="25" cy="25" r="1.5" fill="rgb(16, 185, 129)" opacity="0.4"/>
                  <circle cx="5" cy="5" r="1" fill="rgb(59, 130, 246)" opacity="0.3"/>
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgb(16, 185, 129)" strokeWidth="0.5" opacity="0.3"/>
                  <path d="M 0 50 L 50 0" fill="none" stroke="rgb(251, 191, 36)" strokeWidth="0.3" opacity="0.2"/>
                </pattern>
                <pattern id="calendar-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="9" y="9" width="2" height="2" fill="rgb(16, 185, 129)" opacity="0.2"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#events-grid)" />
              <rect width="100%" height="100%" fill="url(#calendar-dots)" />
            </svg>
            {/* Decorative wave lines */}
            <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 100 Q 250 50 500 100 T 1000 100 T 1500 100 T 2000 100" fill="none" stroke="rgb(16, 185, 129)" strokeWidth="2"/>
              <path d="M 0 200 Q 250 150 500 200 T 1000 200 T 1500 200 T 2000 200" fill="none" stroke="rgb(59, 130, 246)" strokeWidth="2"/>
              <path d="M 0 300 Q 250 250 500 300 T 1000 300 T 1500 300 T 2000 300" fill="none" stroke="rgb(251, 191, 36)" strokeWidth="2"/>
            </svg>
          </>
        )}
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl mb-4 bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
            {language === 'uz' ? 'Rejalashtirilgan Tadbirlar' : 'Запланированные мероприятия'}
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Search & Calendar Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          {/* Search Button */}
          <motion.div
            className="relative"
            initial={{ width: 60 }}
            animate={{ width: searchOpen ? 350 : 60 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {searchOpen ? (
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'uz' ? 'Qidirish...' : 'Поиск...'}
                  className="pl-12 pr-12 py-4 bg-slate-900/80 border-2 border-emerald-500/50 rounded-3xl text-amber-200 placeholder:text-amber-200/40 focus:border-emerald-500/80 shadow-lg"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSearchOpen(false);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-emerald-500/20 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-emerald-400" />
                </button>
              </div>
            ) : (
              <motion.button
                onClick={() => setSearchOpen(true)}
                className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-green-400 to-teal-500 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden"
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
                <Search className="w-4 h-4 text-white relative z-10" />
              </motion.button>
            )}
          </motion.div>

          {/* Calendar View Button */}
          <motion.button
            onClick={() => setShowCalendarPage(true)}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-emerald-500 text-white rounded-3xl flex items-center gap-2 shadow-2xl relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CalendarDays className="w-4 h-4" />
            <span className="text-sm">{language === 'uz' ? 'Taqvim' : 'Календарь'}</span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.button>
        </div>

        {/* Events Grid - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.map((event, index) => {
            const { icon: SportIcon } = getSportIcon(event.sport);
            
            return (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 group"
                  whileHover={{ scale: 1.01 }}
                >
                  {/* 3D Date Card */}
                  <motion.div
                    className="sm:w-28 flex-shrink-0"
                    whileHover={{ rotateY: 10, scale: 1.05 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="relative">
                      {/* Glow */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${event.color} opacity-30 blur-2xl rounded-3xl`}></div>
                      
                      {/* Calendar Card */}
                      <div className={`relative bg-gradient-to-br ${event.color} rounded-2xl overflow-hidden shadow-2xl`}>
                        <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 text-center text-white text-xs">
                          {months[event.date.month - 1]}
                        </div>
                        <div className="p-3 text-center">
                          <div className="text-3xl text-white mb-0.5">{event.date.day}</div>
                          <div className="text-white/80 text-xs">{event.date.year}</div>
                        </div>
                        
                        {/* Sport Icon */}
                        <div className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <SportIcon className="w-4 h-4 text-white" />
                        </div>
                        
                        {/* Corner Fold Effect */}
                        <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-t-white/20 border-l-[20px] border-l-transparent"></div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Event Details Card */}
                  <motion.div
                    className="flex-1 cursor-pointer"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="relative h-full">
                      {/* Glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-emerald-500/10 blur-xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      {/* Card */}
                      <div className={`relative backdrop-blur-xl border rounded-3xl p-4 shadow-2xl h-full transition-all duration-300 ${
                        isDark
                          ? 'bg-gradient-to-br from-slate-900/90 to-emerald-900/50 border-amber-500/30'
                          : 'bg-gradient-to-br from-white/95 via-emerald-50/30 to-white/95 border-emerald-200/60 shadow-emerald-200/50 hover:shadow-emerald-300/70 hover:border-emerald-300/80'
                      }`}>
                        {/* Title */}
                        <h3 className={`text-lg mb-1 line-clamp-2 ${isDark ? 'text-amber-300' : 'text-gray-800'}`}>{event.title}</h3>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 gap-1">
                          <motion.div
                            className={`flex items-center gap-3 ${isDark ? 'text-amber-200/70' : 'text-gray-600'}`}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                          >
                            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${event.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                              <MapPin className="w-4 h-4 text-white" />
                            </div>
                            <div className="min-w-0">
                              <div className={`text-[10px] ${isDark ? 'text-amber-200/50' : 'text-gray-500'}`}>
                                {language === 'uz' ? 'Manzil' : language === 'ru' ? 'Местоположение' : 'Манзил'}
                              </div>
                              <div className="text-sm truncate">{event.location}</div>
                            </div>
                          </motion.div>

                          <motion.div
                            className={`flex items-center gap-3 ${isDark ? 'text-amber-200/70' : 'text-gray-600'}`}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                          >
                            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${event.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                              <Users className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className={`text-[10px] ${isDark ? 'text-amber-200/50' : 'text-gray-500'}`}>
                                {language === 'uz' ? 'Ishtirokchilar' : language === 'ru' ? 'Участники' : 'Иштирокчилар'}
                              </div>
                              <div className="text-sm">{event.participants}</div>
                            </div>
                          </motion.div>

                          <motion.div
                            className={`flex items-center gap-3 ${isDark ? 'text-amber-200/70' : 'text-gray-600'}`}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                          >
                            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${event.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                              <Clock className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className={`text-[10px] ${isDark ? 'text-amber-200/50' : 'text-gray-500'}`}>
                                {language === 'uz' ? 'Vaqt' : language === 'ru' ? 'Время' : 'Вақт'}
                              </div>
                              <div className="text-sm">{event.time}</div>
                            </div>
                          </motion.div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4 relative">
                          <div className={`text-[10px] mb-2 ${isDark ? 'text-amber-200/50' : 'text-gray-500'}`}>
                            Tayyorgarlik darajasi
                          </div>
                          <div className={`h-2 rounded-full overflow-hidden ${
                            isDark ? 'bg-slate-800/50' : 'bg-gray-200/70'
                          }`}>
                            <motion.div
                              className={`h-full bg-gradient-to-r ${event.color} rounded-full relative shadow-md`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${65 + index * 5}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.5 }}
                            >
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                              ></motion.div>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Participants Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className={`max-w-3xl max-h-[80vh] overflow-y-auto border-amber-500/40 ${
          isDark
            ? 'bg-gradient-to-br from-slate-900/98 to-emerald-900/95 text-white'
            : 'bg-gradient-to-br from-white/98 to-emerald-50/95 text-gray-900'
        }`}>
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className={`text-2xl md:text-3xl flex items-center gap-3 ${isDark ? 'text-amber-300' : 'text-gray-800'}`}>
                  <Trophy className="w-8 h-8" />
                  {selectedEvent.title}
                </DialogTitle>
                <DialogDescription className={`text-lg ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  {selectedEvent.sport}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-6">
                {/* Event Info */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className={`rounded-xl p-4 border text-center ${
                    isDark ? 'bg-slate-800/50 border-amber-500/20' : 'bg-white border-amber-400/30 shadow-md'
                  }`}>
                    <MapPin className={`w-6 h-6 mx-auto mb-2 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <p className={`text-sm mb-1 ${isDark ? 'text-amber-200' : 'text-gray-700'}`}>{selectedEvent.location}</p>
                    <p className={`text-xs ${isDark ? 'text-amber-200/50' : 'text-gray-500'}`}>{language === 'uz' ? 'Joylashuv' : 'Место'}</p>
                  </div>
                  <div className={`rounded-xl p-4 border text-center ${
                    isDark ? 'bg-slate-800/50 border-amber-500/20' : 'bg-white border-amber-400/30 shadow-md'
                  }`}>
                    <Clock className={`w-6 h-6 mx-auto mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    <p className={`text-sm mb-1 ${isDark ? 'text-amber-200' : 'text-gray-700'}`}>{selectedEvent.time}</p>
                    <p className={`text-xs ${isDark ? 'text-amber-200/50' : 'text-gray-500'}`}>{language === 'uz' ? 'Vaqt' : 'Время'}</p>
                  </div>
                  <div className={`rounded-xl p-4 border text-center ${
                    isDark ? 'bg-slate-800/50 border-amber-500/20' : 'bg-white border-amber-400/30 shadow-md'
                  }`}>
                    <Users className={`w-6 h-6 mx-auto mb-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                    <p className={`text-sm mb-1 ${isDark ? 'text-amber-200' : 'text-gray-700'}`}>{selectedEvent.participants}</p>
                    <p className={`text-xs ${isDark ? 'text-amber-200/50' : 'text-gray-500'}`}>{language === 'uz' ? 'Ishtirokchi' : 'Участников'}</p>
                  </div>
                </div>

                {/* Participants List */}
                <div>
                  <h3 className={`text-xl mb-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    {language === 'uz' ? 'Ishtirokchilar ro\'yxati' : 'Список участников'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedEvent.participantsList.map((participant, index) => (
                      <motion.div
                        key={index}
                        className={`flex items-center gap-3 rounded-xl p-3 border ${
                          isDark
                            ? 'bg-slate-800/50 border-amber-500/20'
                            : 'bg-white border-amber-400/30 shadow-sm'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-emerald-500 flex items-center justify-center text-white flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`truncate ${isDark ? 'text-amber-300' : 'text-gray-800'}`}>{participant}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PlannedEvents