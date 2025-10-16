import { motion } from 'framer-motion';
// import { useLanguage } from '../hooks/useLanguage';
// import { getTranslation } from '../utils/translations';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

export function PlannedEventsSection() {
  // const { language } = useLanguage();
  // const t = getTranslation(language);

  const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];

  const events = [
    {
      date: { day: 15, month: 2, year: 2025 },
      title: 'Milliy Chempionat - Yengil atletika',
      location: 'Toshkent, O\'zbekiston',
      participants: 320,
      time: '09:00 - 18:00',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      date: { day: 22, month: 3, year: 2025 },
      title: 'MDH Kubogi - Kurash',
      location: 'Samarqand, O\'zbekiston',
      participants: 250,
      time: '10:00 - 19:00',
      color: 'from-emerald-500 to-green-500',
    },
    {
      date: { day: 5, month: 4, year: 2025 },
      title: 'Osiyo Chempionati - Judo',
      location: 'Seul, Janubiy Koreya',
      participants: 480,
      time: '08:00 - 20:00',
      color: 'from-purple-500 to-pink-500',
    },
    {
      date: { day: 18, month: 5, year: 2025 },
      title: 'Jahon Kubogi - Box',
      location: 'London, Angliya',
      participants: 520,
      time: '14:00 - 22:00',
      color: 'from-red-500 to-orange-500',
    },
    {
      date: { day: 10, month: 6, year: 2025 },
      title: 'Olimpiya Tanlov - Suzish',
      location: 'Parij, Fransiya',
      participants: 380,
      time: '07:00 - 19:00',
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.15),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.15),transparent_40%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
            {t.planned.title}
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto rounded-full"></div>
        </motion.div> */}

        {/* Calendar Timeline */}
        <div className="space-y-6 mt-20">
          {events.map((event, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div
                className="flex flex-col md:flex-row gap-6 group"
                whileHover={{ scale: 1.01 }}
              >
                {/* 3D Date Card */}
                <motion.div
                  className="md:w-40 flex-shrink-0"
                  whileHover={{ rotateY: 10, scale: 1.05 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative">
                    {/* Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${event.color} opacity-30 blur-2xl rounded-3xl`}></div>

                    {/* Calendar Card */}
                    <div className={`relative bg-gradient-to-br ${event.color} rounded-3xl overflow-hidden shadow-2xl`}>
                      <div className="bg-white/20 backdrop-blur-sm px-4 py-2 text-center text-white">
                        {months[event.date.month - 1]}
                      </div>
                      <div className="p-6 text-center">
                        <div className="text-6xl text-white mb-1">{event.date.day}</div>
                        <div className="text-white/80">{event.date.year}</div>
                      </div>

                      {/* Corner Fold Effect */}
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-t-white/20 border-l-[30px] border-l-transparent"></div>
                    </div>
                  </div>
                </motion.div>

                {/* Event Details Card */}
                <motion.div
                  className="flex-1"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-full">
                    {/* Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-emerald-500/10 blur-xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    {/* Card */}
                    <div className="relative bg-gradient-to-br from-slate-900/90 to-emerald-900/50 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-6 shadow-2xl h-full">
                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl text-amber-300 mb-4">{event.title}</h3>

                      {/* Details Grid */}
                      <div className="grid md:grid-cols-3 gap-4">
                        <motion.div
                          className="flex items-center gap-3 text-amber-200/70"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${event.color} flex items-center justify-center shadow-lg`}>
                            <MapPin className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-xs text-amber-200/50">Location</div>
                            <div className="text-sm">{event.location}</div>
                          </div>
                        </motion.div>

                        <motion.div
                          className="flex items-center gap-3 text-amber-200/70"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${event.color} flex items-center justify-center shadow-lg`}>
                            <Users className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-xs text-amber-200/50">Participants</div>
                            <div className="text-sm">{event.participants}</div>
                          </div>
                        </motion.div>

                        <motion.div
                          className="flex items-center gap-3 text-amber-200/70"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 }}
                        >
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${event.color} flex items-center justify-center shadow-lg`}>
                            <Clock className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-xs text-amber-200/50">Time</div>
                            <div className="text-sm">{event.time}</div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4 relative">
                        <div className="text-xs text-amber-200/50 mb-2">Tayyorgarlik darajasi</div>
                        <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${event.color} rounded-full relative`}
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

                {/* 3D Date Card */}
                <motion.div
                  className="md:w-40  h-full flex-shrink-0"
                  whileHover={{ rotateY: 10, scale: 1.05 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative">
                    {/* Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${event.color} opacity-30 blur-2xl rounded-3xl`}></div>

                    {/* Calendar Card */}
                    <div className={`relative bg-gradient-to-br ${event.color} rounded-3xl overflow-hidden shadow-2xl`}>
                      <div className="bg-white/20 backdrop-blur-sm px-4 py-2 text-center text-white">
                        {months[event.date.month - 1]}
                      </div>
                      <div className="p-6 text-center">
                        <div className="text-6xl text-white mb-1">{event.date.day}</div>
                        <div className="text-white/80">{event.date.year}</div>
                      </div>

                      {/* Corner Fold Effect */}
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-t-white/20 border-l-[30px] border-l-transparent"></div>
                    </div>
                  </div>
                </motion.div>

                {/* Event Details Card */}
                <motion.div
                  className="flex-1"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-full">
                    {/* Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-emerald-500/10 blur-xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    {/* Card */}
                    <div className="relative bg-gradient-to-br from-slate-900/90 to-emerald-900/50 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-6 shadow-2xl h-full">
                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl text-amber-300 mb-4">{event.title}</h3>

                      {/* Details Grid */}
                      <div className="grid md:grid-cols-3 gap-4">
                        <motion.div
                          className="flex items-center gap-3 text-amber-200/70"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${event.color} flex items-center justify-center shadow-lg`}>
                            <MapPin className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-xs text-amber-200/50">Location</div>
                            <div className="text-sm">{event.location}</div>
                          </div>
                        </motion.div>

                        <motion.div
                          className="flex items-center gap-3 text-amber-200/70"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${event.color} flex items-center justify-center shadow-lg`}>
                            <Users className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-xs text-amber-200/50">Participants</div>
                            <div className="text-sm">{event.participants}</div>
                          </div>
                        </motion.div>

                        <motion.div
                          className="flex items-center gap-3 text-amber-200/70"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 }}
                        >
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${event.color} flex items-center justify-center shadow-lg`}>
                            <Clock className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-xs text-amber-200/50">Time</div>
                            <div className="text-sm">{event.time}</div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4 relative">
                        <div className="text-xs text-amber-200/50 mb-2">Tayyorgarlik darajasi</div>
                        <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${event.color} rounded-full relative`}
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
          ))}
        </div>
      </div>
    </div>
  );
}
