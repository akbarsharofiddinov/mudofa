/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { getTranslation } from '@/utils/translations';
import { MapPin, Calendar, Users, Trophy, Target, Medal, Award, ChevronDown, Crosshair, Swords, Dumbbell, Waves, Shield, Zap, Activity, Footprints, Ship, Bike, Flame } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/UI/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/UI/tabs';
import { Badge } from '@/components/UI/badge';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

type CompetitionType = 'international' | 'republican';

interface Competition {
  id: number;
  type: CompetitionType;
  year: number;
  name: string;
  sport: string;
  location: string;
  participants: number;
  medals: { gold: number; silver: number; bronze: number };
  date: string;
  images: string[];
  videos: string[];
  participantsList: Array<{ name: string; category: string; result: string }>;
  results: string;
  description: string;
}

// Sport icon mapping
const getSportIcon = (sport: string) => {
  const sportLower = sport.toLowerCase();
  
  if (sportLower.includes('otishma') || sportLower.includes('shooting') || sportLower.includes('rifle') || sportLower.includes('vintovka') || sportLower.includes('trap') || sportLower.includes('skeet') || sportLower.includes('pnevmatik')) {
    return { icon: Crosshair, color: 'text-red-500' };
  }
  if (sportLower.includes('kurash') || sportLower.includes('wrestling') || sportLower.includes('борьба') || sportLower.includes('greco')) {
    return { icon: Users, color: 'text-purple-500' };
  }
  if (sportLower.includes('boks') || sportLower.includes('boxing') || sportLower.includes('бокс')) {
    return { icon: Flame, color: 'text-orange-500' };
  }
  if (sportLower.includes('judo') || sportLower.includes('дзюдо')) {
    return { icon: Swords, color: 'text-indigo-500' };
  }
  if (sportLower.includes('suv') || sportLower.includes('water') || sportLower.includes('polo') || sportLower.includes('suzish') || sportLower.includes('swimming')) {
    return { icon: Waves, color: 'text-cyan-500' };
  }
  if (sportLower.includes('harbiy') || sportLower.includes('military') || sportLower.includes('pentathlon') || sportLower.includes('yamalaq')) {
    return { icon: Target, color: 'text-green-500' };
  }
  if (sportLower.includes('aralash') || sportLower.includes('mma') || sportLower.includes('mixed')) {
    return { icon: Shield, color: 'text-pink-500' };
  }
  if (sportLower.includes('jiu-jitsu') || sportLower.includes('джиу-джитсу')) {
    return { icon: Zap, color: 'text-yellow-500' };
  }
  if (sportLower.includes('yugurish') || sportLower.includes('running') || sportLower.includes('бег') || sportLower.includes('athletics')) {
    return { icon: Footprints, color: 'text-blue-500' };
  }
  if (sportLower.includes('velosiped') || sportLower.includes('cycling') || sportLower.includes('велоспорт')) {
    return { icon: Bike, color: 'text-emerald-500' };
  }
  if (sportLower.includes('yengil') || sportLower.includes('weightlifting') || sportLower.includes('тяжелая')) {
    return { icon: Dumbbell, color: 'text-slate-500' };
  }
  if (sportLower.includes('harbiy') || sportLower.includes('naval') || sportLower.includes('dengiz')) {
    return { icon: Ship, color: 'text-blue-600' };
  }
  
  // Default
  return { icon: Activity, color: 'text-amber-500' };
};

const Competetions: React.FC = () => {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'international' | 'republican'>('all');

  const competitions: Competition[] = [
    // 2025 Competitions
    {
      id: 101,
      type: 'international',
      year: 2025,
      name: 'ISSF Jahon Chempionati - Otishma',
      sport: '50m Vintovka, Trap, Skeet',
      location: 'Lima, Peru',
      participants: 520,
      medals: { gold: 4, silver: 5, bronze: 3 },
      date: '20-30 Sentyabr 2025',
      images: [
        'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1596367407372-96cb88503db6?w=600&h=400&fit=crop',
      ],
      videos: ['https://www.youtube.com/embed/dQw4w9WgXcQ'],
      participantsList: [
        { name: 'Doniyor Islamov', category: '50m Vintovka', result: 'Oltin medal - 633.2' },
        { name: 'Mirjalol Khasanov', category: 'Trap', result: 'Oltin medal - 49/50' },
        { name: 'Sevara Nematova', category: '10m Pnevmatik', result: 'Kumush medal - 252.7' },
        { name: 'Bekzod Rahimov', category: 'Vintovka 3x40', result: 'Bronza medal - 625.8' },
      ],
      results: 'Jami 12 ta medal: 4 oltin, 5 kumush, 3 bronza. O\'zbekiston jamoasi umumiy hisobda 3-o\'rinni egalladi.',
      description: 'ISSF Jahon Chempionati Peruning Lima shahrida o\'tkazilmoqda. O\'zbekiston otishma jamoasi rekord natijalar ko\'rsatmoqda.',
    },
    {
      id: 102,
      type: 'international',
      year: 2025,
      name: 'Osiyo Kubogi - Otishma',
      sport: 'Barcha turlar',
      location: 'Doha, Qatar',
      participants: 380,
      medals: { gold: 6, silver: 4, bronze: 5 },
      date: '10-18 Avgust 2025',
      images: [
        'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=600&h=400&fit=crop',
      ],
      videos: [],
      participantsList: [
        { name: 'Yulduz Tursunova', category: 'Skeet', result: 'Oltin medal - 47/50' },
        { name: 'Jasur Aliyev', category: 'Trap', result: 'Oltin medal - 48/50' },
        { name: 'Dilnoza Karimova', category: 'Pnevmatik', result: 'Kumush medal - 249.8' },
      ],
      results: 'Jami 15 ta medal: 6 oltin, 4 kumush, 5 bronza. O\'zbekiston jamoasi 1-o\'rinni egalladi.',
      description: 'Qatarning Doha shahrida bo\'lib o\'tgan Osiyo kubogida O\'zbekiston sportchilari ajoyib natijalar ko\'rsatdi.',
    },
    {
      id: 103,
      type: 'republican',
      year: 2025,
      name: 'O\'zbekiston Milliy Chempionati',
      sport: 'Barcha turlar',
      location: 'Toshkent, O\'zbekiston',
      participants: 250,
      medals: { gold: 10, silver: 10, bronze: 10 },
      date: '15-22 May 2025',
      images: [
        'https://images.unsplash.com/photo-1596367407372-96cb88503db6?w=600&h=400&fit=crop',
      ],
      videos: [],
      participantsList: [
        { name: 'Sardor Yusupov', category: 'Pnevmatik vintovka', result: 'Chempion - 635.4' },
        { name: 'Nodira Rahimova', category: 'Pnevmatik pistolet', result: 'Chempion - 585.9' },
        { name: 'Aziz Tursunov', category: 'Vintovka yotgan', result: 'Chempion - 628.1' },
      ],
      results: 'Respublika bo\'ylab 250 ta sportchi ishtirok etdi. Ko\'plab yangi rekordlar o\'rnatildi.',
      description: 'Milliy jamoaga a\'zolarni tanlash uchun eng muhim musobaqa. 2026-yil xalqaro turnirlariga tayyorgarlik.',
    },
    {
      id: 104,
      type: 'republican',
      year: 2025,
      name: 'Yoshlar Olimpiya Umidlari',
      sport: '10m Pnevmatik, 50m Vintovka',
      location: 'Buxoro, O\'zbekiston',
      participants: 180,
      medals: { gold: 8, silver: 8, bronze: 8 },
      date: '3-10 Aprel 2025',
      images: [
        'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=600&h=400&fit=crop',
      ],
      videos: [],
      participantsList: [
        { name: 'Shohruh Karimov (U21)', category: 'Pnevmatik', result: 'Oltin - 631.8' },
        { name: 'Malika Azimova (U19)', category: 'Vintovka', result: 'Oltin - 618.5' },
      ],
      results: 'Kelajakdagi chempionlar aniqlandi. 24 ta medal taqsimlandi.',
      description: 'Yoshlar o\'rtasida o\'tkazilgan eng yirik musobaqa. Milliy jamoa uchun talantlar zaxirasi.',
    },
    // 2024 Competitions
    {
      id: 1,
      type: 'international',
      year: 2024,
      name: 'ISSF Jahon Kubogi - Otishma',
      sport: '50m Vintovka, 10m Pnevmatik',
      location: 'Rio de Janeiro, Braziliya',
      participants: 450,
      medals: { gold: 3, silver: 4, bronze: 2 },
      date: '15-22 Sentyabr 2024',
      images: [
        'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1596367407372-96cb88503db6?w=600&h=400&fit=crop',
      ],
      videos: ['https://www.youtube.com/embed/dQw4w9WgXcQ'],
      participantsList: [
        { name: 'Doniyor Islamov', category: '50m Vintovka', result: 'Oltin medal - 628.5' },
        { name: 'Sevara Nematova', category: '10m Pnevmatik', result: 'Kumush medal - 251.8' },
        { name: 'Bekzod Rahimov', category: '50m Yotgan', result: 'Bronza medal - 463.2' },
      ],
      results: 'Jami 9 ta medal: 3 oltin, 4 kumush, 2 bronza. O\'zbekiston jamoasi umumiy hisobda 5-o\'rinni egalladi.',
      description: 'ISSF Jahon Kubogi Braziliyaning Rio de Janeiro shahrida muvaffaqiyatli o\'tkazildi. O\'zbekiston otishma jamoasi a\'lo darajadagi natijalar ko\'rsatdi.',
    },
    {
      id: 2,
      type: 'international',
      year: 2024,
      name: 'Osiyo Otishma Chempionati',
      sport: 'Trap, Skeet, Vintovka',
      location: 'Toshkent, O\'zbekiston',
      participants: 320,
      medals: { gold: 5, silver: 3, bronze: 4 },
      date: '5-12 Avgust 2024',
      images: [
        'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=600&h=400&fit=crop',
      ],
      videos: ['https://www.youtube.com/embed/dQw4w9WgXcQ'],
      participantsList: [
        { name: 'Mirjalol Khasanov', category: 'Trap', result: 'Oltin medal - 48/50' },
        { name: 'Yulduz Tursunova', category: 'Skeet', result: 'Oltin medal - 46/50' },
        { name: 'Dilnoza Karimova', category: 'Pnevmatik', result: 'Kumush medal - 248.3' },
      ],
      results: 'Jami 12 ta medal: 5 oltin, 3 kumush, 4 bronza. O\'zbekiston jamoasi 1-o\'rinni egalladi.',
      description: 'Uy meydoni - Toshkentda o\'tgan Osiyo chempionatida O\'zbekiston jamoasi ajoyib natijalar ko\'rsatdi.',
    },
    {
      id: 3,
      type: 'international',
      year: 2024,
      name: 'Osiyo O\'yinlari - Otishma',
      sport: 'Barcha turlar',
      location: 'Hangzhou, Xitoy',
      participants: 580,
      medals: { gold: 2, silver: 5, bronze: 3 },
      date: '20-28 Iyun 2024',
      images: [
        'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=600&h=400&fit=crop',
      ],
      videos: [],
      participantsList: [
        { name: 'Jasur Aliyev', category: 'Trap', result: 'Oltin medal' },
        { name: 'Madina Azimova', category: 'Skeet', result: 'Kumush medal' },
      ],
      results: 'Jami 10 ta medal qo\'lga kiritildi. O\'zbekiston jamoasi otishma bo\'yicha 4-o\'rinni egalladi.',
      description: 'Xitoyning Hangzhou shahrida bo\'lib o\'tgan Osiyo O\'yinlarida ishtirok etildi.',
    },
    {
      id: 4,
      type: 'republican',
      year: 2024,
      name: 'O\'zbekiston Chempionati - Pnevmatik',
      sport: '10m Pnevmatik Vintovka/Pistolet',
      location: 'Toshkent, O\'zbekiston',
      participants: 180,
      medals: { gold: 8, silver: 8, bronze: 8 },
      date: '10-15 Mart 2024',
      images: [
        'https://images.unsplash.com/photo-1596367407372-96cb88503db6?w=600&h=400&fit=crop',
      ],
      videos: [],
      participantsList: [
        { name: 'Sardor Yusupov', category: 'Pnevmatik vintovka', result: 'Chempion - 632.1' },
        { name: 'Nodira Rahimova', category: 'Pnevmatik pistolet', result: 'Chempion - 581.4' },
      ],
      results: 'Respublika bo\'ylab 180 ta sportchi ishtirok etdi. Yangi rekordlar o\'rnatildi.',
      description: 'Milliy jamoaga a\'zolarni tanlash uchun muhim musobaqa.',
    },
    {
      id: 5,
      type: 'republican',
      year: 2024,
      name: 'Yoshlar Chempionati - Vintovka',
      sport: '50m Vintovka',
      location: 'Samarqand, O\'zbekiston',
      participants: 200,
      medals: { gold: 6, silver: 6, bronze: 6 },
      date: '5-10 Aprel 2024',
      images: [
        'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=600&h=400&fit=crop',
      ],
      videos: [],
      participantsList: [
        { name: 'Aziz Tursunov (U21)', category: 'Vintovka yotgan', result: 'Oltin - 625.3' },
        { name: 'Dilshod Aliyev (U19)', category: 'Vintovka tik', result: 'Oltin - 618.7' },
      ],
      results: 'Kelajakdagi yulduzlar aniqlandi. 18 ta medal taqsimlandi.',
      description: 'Yoshlar o\'rtasida katta qiziqish uyg\'otgan musobaqa.',
    },
    {
      id: 6,
      type: 'republican',
      year: 2024,
      name: 'Harbiy Birlashma Kubogi',
      sport: 'Aralash turlar',
      location: 'Toshkent, O\'zbekiston',
      participants: 150,
      medals: { gold: 5, silver: 5, bronze: 5 },
      date: '1-7 May 2024',
      images: [
        'https://images.unsplash.com/photo-1596367407372-96cb88503db6?w=600&h=400&fit=crop',
      ],
      videos: [],
      participantsList: [
        { name: 'Mudofaa vazirlig jamoasi', category: 'Jamoaviy', result: '1-o\'rin' },
        { name: 'Ichki ishlar jamoasi', category: 'Jamoaviy', result: '2-o\'rin' },
      ],
      results: 'Mudofaa vazirlig birlashmalariga qarashli jamoalar o\'rtasida musobaqa.',
      description: 'Harbiy xizmatchilar o\'rtasida yillik an\'anaviy turnir.',
    },
    // 2023 Competitions
    {
      id: 201,
      type: 'international',
      year: 2023,
      name: 'ISSF Jahon Kubogi - Baku',
      sport: 'Trap, Skeet, Vintovka',
      location: 'Baku, Ozarbayjon',
      participants: 410,
      medals: { gold: 2, silver: 3, bronze: 4 },
      date: '18-25 Sentyabr 2023',
      images: [
        'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=600&h=400&fit=crop',
      ],
      videos: [],
      participantsList: [
        { name: 'Mirjalol Khasanov', category: 'Trap', result: 'Oltin medal - 47/50' },
        { name: 'Doniyor Islamov', category: '50m Vintovka', result: 'Kumush medal - 621.4' },
        { name: 'Bekzod Rahimov', category: 'Vintovka yotgan', result: 'Bronza medal - 458.7' },
      ],
      results: 'Jami 9 ta medal: 2 oltin, 3 kumush, 4 bronza. Osiyo mintaqasidan eng yaxshi natija.',
      description: 'Ozarbayjonning Baku shahrida o\'tgan ISSF Jahon Kubogida O\'zbekiston sportchilari yaxshi ko\'rsatkich ko\'rsatdi.',
    },
    {
      id: 202,
      type: 'international',
      year: 2023,
      name: 'Osiyo Chempionati',
      sport: '10m Pnevmatik, 50m Vintovka',
      location: 'Kuala-Lumpur, Malayziya',
      participants: 350,
      medals: { gold: 4, silver: 2, bronze: 3 },
      date: '12-20 Avgust 2023',
      images: [
        'https://images.unsplash.com/photo-1596367407372-96cb88503db6?w=600&h=400&fit=crop',
      ],
      videos: [],
      participantsList: [
        { name: 'Sevara Nematova', category: '10m Pnevmatik', result: 'Oltin medal - 249.2' },
        { name: 'Yulduz Tursunova', category: 'Skeet', result: 'Oltin medal - 45/50' },
        { name: 'Dilnoza Karimova', category: 'Pnevmatik', result: 'Kumush medal - 246.5' },
      ],
      results: 'Jami 9 ta medal: 4 oltin, 2 kumush, 3 bronza. Osiyo chempionlaridan biri.',
      description: 'Malayziyada bo\'lib o\'tgan Osiyo chempionatida O\'zbekiston jamoasi 2-o\'rinni egalladi.',
    },
    {
      id: 203,
      type: 'republican',
      year: 2023,
      name: 'O\'zbekiston Chempionati',
      sport: 'Barcha turlar',
      location: 'Toshkent, O\'zbekiston',
      participants: 220,
      medals: { gold: 9, silver: 9, bronze: 9 },
      date: '20-28 May 2023',
      images: [
        'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=600&h=400&fit=crop',
      ],
      videos: [],
      participantsList: [
        { name: 'Sardor Yusupov', category: 'Pnevmatik vintovka', result: 'Chempion - 629.3' },
        { name: 'Nodira Rahimova', category: 'Pnevmatik pistolet', result: 'Chempion - 579.6' },
        { name: 'Jasur Aliyev', category: 'Trap', result: 'Chempion - 46/50' },
      ],
      results: 'Respublika bo\'ylab 220 ta sportchi ishtirok etdi. Milliy jamoa tarkibi yangilandi.',
      description: 'Milliy chempionat. 2024-yil xalqaro musobaqalariga tayyorgarlik.',
    },
    {
      id: 204,
      type: 'republican',
      year: 2023,
      name: 'Yoshlar Kubogi',
      sport: '10m Pnevmatik',
      location: 'Samarqand, O\'zbekiston',
      participants: 160,
      medals: { gold: 7, silver: 7, bronze: 7 },
      date: '8-15 Aprel 2023',
      images: [
        'https://images.unsplash.com/photo-1596367407372-96cb88503db6?w=600&h=400&fit=crop',
      ],
      videos: [],
      participantsList: [
        { name: 'Aziz Tursunov (U21)', category: 'Pnevmatik', result: 'Oltin - 627.4' },
        { name: 'Shohruh Karimov (U19)', category: 'Pnevmatik', result: 'Oltin - 623.1' },
      ],
      results: 'Yoshlar o\'rtasida 21 ta medal taqsimlandi. Ko\'plab talantlar aniqlandi.',
      description: 'Yoshlar kubogi - kelajak chempionlar uchun boshlang\'ich platforma.',
    },
    // 2022 Competitions
    {
      id: 301,
      type: 'international',
      year: 2022,
      name: 'Osiyo O\'yinlari',
      sport: 'Barcha turlar',
      location: 'Guangzhou, Xitoy',
      participants: 500,
      medals: { gold: 3, silver: 4, bronze: 2 },
      date: '15-25 Sentyabr 2022',
      images: [
        'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=600&h=400&fit=crop',
      ],
      videos: [],
      participantsList: [
        { name: 'Doniyor Islamov', category: '50m Vintovka', result: 'Oltin medal - 625.8' },
        { name: 'Mirjalol Khasanov', category: 'Trap', result: 'Kumush medal - 46/50' },
        { name: 'Sevara Nematova', category: 'Pnevmatik', result: 'Bronza medal - 247.9' },
      ],
      results: 'Jami 9 ta medal: 3 oltin, 4 kumush, 2 bronza. O\'zbekiston 5-o\'rinni egalladi.',
      description: 'Xitoyning Guangzhou shahrida bo\'lib o\'tgan Osiyo O\'yinlarida ishtirok etildi.',
    },
    {
      id: 302,
      type: 'international',
      year: 2022,
      name: 'ISSF Jahon Chempionati',
      sport: '50m Vintovka, Trap',
      location: 'Kairo, Misr',
      participants: 480,
      medals: { gold: 1, silver: 3, bronze: 3 },
      date: '10-20 Oktyabr 2022',
      images: [
        'https://images.unsplash.com/photo-1596367407372-96cb88503db6?w=600&h=400&fit=crop',
      ],
      videos: [],
      participantsList: [
        { name: 'Yulduz Tursunova', category: 'Skeet', result: 'Oltin medal - 44/50' },
        { name: 'Bekzod Rahimov', category: 'Vintovka', result: 'Kumush medal - 619.3' },
        { name: 'Dilnoza Karimova', category: 'Pnevmatik', result: 'Bronza medal - 245.2' },
      ],
      results: 'Jami 7 ta medal: 1 oltin, 3 kumush, 3 bronza.',
      description: 'Misrning Kairo shahrida o\'tkazilgan jahon chempionatida ishtirok etildi.',
    },
    {
      id: 303,
      type: 'republican',
      year: 2022,
      name: 'O\'zbekiston Milliy Chempionati',
      sport: 'Barcha turlar',
      location: 'Toshkent, O\'zbekiston',
      participants: 200,
      medals: { gold: 8, silver: 8, bronze: 8 },
      date: '25 May - 2 Iyun 2022',
      images: [
        'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=600&h=400&fit=crop',
      ],
      videos: [],
      participantsList: [
        { name: 'Sardor Yusupov', category: 'Pnevmatik', result: 'Chempion - 626.7' },
        { name: 'Nodira Rahimova', category: 'Pistolet', result: 'Chempion - 576.3' },
        { name: 'Jasur Aliyev', category: 'Trap', result: 'Chempion - 45/50' },
      ],
      results: 'Respublika bo\'ylab 200 ta sportchi qatnashdi. Milliy jamoa shakllandi.',
      description: 'Milliy jamoa tarkibini aniqlash uchun asosiy musobaqa.',
    },
    {
      id: 304,
      type: 'republican',
      year: 2022,
      name: 'Yoshlar Chempionati',
      sport: '10m Pnevmatik, 50m Vintovka',
      location: 'Buxoro, O\'zbekiston',
      participants: 150,
      medals: { gold: 6, silver: 6, bronze: 6 },
      date: '10-17 Aprel 2022',
      images: [
        'https://images.unsplash.com/photo-1596367407372-96cb88503db6?w=600&h=400&fit=crop',
      ],
      videos: [],
      participantsList: [
        { name: 'Aziz Tursunov (U21)', category: 'Vintovka', result: 'Oltin - 622.5' },
        { name: 'Malika Azimova (U19)', category: 'Pnevmatik', result: 'Oltin - 615.8' },
      ],
      results: 'Yoshlar o\'rtasida 18 ta medal taqsimlandi.',
      description: 'Yoshlar chempionati - kelgusi yulduzlarni aniqlash.',
    },
  ];

  const years = [2025, 2024, 2023, 2022];
  
  const filteredCompetitions = competitions.filter(comp => {
    const yearMatch = comp.year === selectedYear;
    const typeMatch = filterType === 'all' || comp.type === filterType;
    return yearMatch && typeMatch;
  });

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300 ${
      isDark
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950'
        : 'bg-gradient-to-br from-emerald-50 via-white to-amber-50'
    }`}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        {isDark ? (
          <div className="opacity-5">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(251,191,36,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.2)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
          </div>
        ) : (
          <>
            {/* Light mode animated shapes */}
            <motion.div
              className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 50, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-amber-200/30 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-green-200/20 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Floating Sport Characters/Icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Trophy Characters */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`trophy-${i}`}
                  className="absolute"
                  style={{
                    left: `${5 + i * 12}%`,
                    top: `${10 + (i % 4) * 22}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.15, 0.35, 0.15],
                  }}
                  transition={{
                    duration: 8 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  <Trophy 
                    size={50 + i * 5} 
                    strokeWidth={1.5} 
                    className="text-amber-500/30"
                  />
                </motion.div>
              ))}
              
              {/* Target/Crosshair Characters */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`target-${i}`}
                  className="absolute"
                  style={{
                    right: `${8 + i * 15}%`,
                    top: `${15 + (i % 3) * 25}%`,
                  }}
                  animate={{
                    scale: [1, 1.4, 1],
                    rotate: [0, 360],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 10 + i,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                >
                  <Crosshair 
                    size={45 + i * 4} 
                    strokeWidth={1.5} 
                    className="text-red-500/30"
                  />
                </motion.div>
              ))}
              
              {/* Medal Characters */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={`medal-${i}`}
                  className="absolute"
                  style={{
                    left: `${10 + i * 10}%`,
                    bottom: `${8 + (i % 5) * 18}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 20, -20, 0],
                    opacity: [0.15, 0.35, 0.15],
                  }}
                  transition={{
                    duration: 7 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  <Medal 
                    size={40 + i * 3} 
                    strokeWidth={1.5} 
                    className="text-purple-500/30"
                  />
                </motion.div>
              ))}
              
              {/* Activity/Sports Characters */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`activity-${i}`}
                  className="absolute"
                  style={{
                    right: `${15 + i * 18}%`,
                    bottom: `${10 + i * 15}%`,
                  }}
                  animate={{
                    x: [0, 20, 0],
                    y: [0, -15, 0],
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 9 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  <Activity 
                    size={48 + i * 4} 
                    strokeWidth={1.5} 
                    className="text-emerald-500/30"
                  />
                </motion.div>
              ))}
              
              {/* Award Characters */}
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={`award-${i}`}
                  className="absolute"
                  style={{
                    left: `${20 + i * 13}%`,
                    top: `${50 + (i % 3) * 15}%`,
                  }}
                  animate={{
                    y: [0, 25, 0],
                    rotate: [0, -10, 10, 0],
                    opacity: [0.15, 0.3, 0.15],
                  }}
                  transition={{
                    duration: 6 + i * 0.4,
                    repeat: Infinity,
                    delay: i * 0.35,
                  }}
                >
                  <Award 
                    size={44 + i * 3} 
                    strokeWidth={1.5} 
                    className="text-blue-500/30"
                  />
                </motion.div>
              ))}
              
              {/* Flame Characters */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`flame-${i}`}
                  className="absolute"
                  style={{
                    right: `${5 + i * 16}%`,
                    top: `${40 + (i % 3) * 18}%`,
                  }}
                  animate={{
                    y: [0, -35, 0],
                    scale: [1, 1.25, 1],
                    opacity: [0.2, 0.45, 0.2],
                  }}
                  transition={{
                    duration: 5 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  <Flame 
                    size={42 + i * 4} 
                    strokeWidth={1.5} 
                    className="text-orange-500/30"
                  />
                </motion.div>
              ))}
              
              {/* Zap/Energy Characters */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`zap-${i}`}
                  className="absolute"
                  style={{
                    left: `${30 + i * 15}%`,
                    bottom: `${40 + i * 10}%`,
                  }}
                  animate={{
                    x: [0, -15, 0],
                    y: [0, -25, 0],
                    rotate: [0, 180, 360],
                    opacity: [0.15, 0.35, 0.15],
                  }}
                  transition={{
                    duration: 7 + i,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                >
                  <Zap 
                    size={46 + i * 3} 
                    strokeWidth={1.5} 
                    className="text-yellow-500/30"
                  />
                </motion.div>
              ))}
              
              {/* Users/Team Characters */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`users-${i}`}
                  className="absolute"
                  style={{
                    right: `${25 + i * 20}%`,
                    bottom: `${55 + i * 8}%`,
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 10, -10, 0],
                    opacity: [0.15, 0.3, 0.15],
                  }}
                  transition={{
                    duration: 8 + i,
                    repeat: Infinity,
                    delay: i * 0.6,
                  }}
                >
                  <Users 
                    size={50 + i * 4} 
                    strokeWidth={1.5} 
                    className="text-indigo-500/30"
                  />
                </motion.div>
              ))}
              
              {/* Shield Characters */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`shield-${i}`}
                  className="absolute"
                  style={{
                    left: `${15 + i * 18}%`,
                    top: `${70 + i * 5}%`,
                  }}
                  animate={{
                    y: [0, -18, 0],
                    x: [0, 12, 0],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 9 + i,
                    repeat: Infinity,
                    delay: i * 0.45,
                  }}
                >
                  <Shield 
                    size={48 + i * 3} 
                    strokeWidth={1.5} 
                    className="text-cyan-500/30"
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Enhanced decorative patterns */}
            <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="competitions-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <circle cx="30" cy="30" r="2" fill="rgb(16, 185, 129)" opacity="0.4"/>
                  <circle cx="10" cy="10" r="1" fill="rgb(251, 191, 36)" opacity="0.3"/>
                  <circle cx="50" cy="50" r="1" fill="rgb(59, 130, 246)" opacity="0.3"/>
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgb(251, 191, 36)" strokeWidth="0.6" opacity="0.3"/>
                  <path d="M 0 60 L 60 0" fill="none" stroke="rgb(16, 185, 129)" strokeWidth="0.4" opacity="0.2"/>
                </pattern>
                <pattern id="trophy-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
                  <circle cx="40" cy="40" r="15" fill="none" stroke="rgb(251, 191, 36)" strokeWidth="0.5" opacity="0.15"/>
                  <circle cx="40" cy="40" r="8" fill="none" stroke="rgb(16, 185, 129)" strokeWidth="0.5" opacity="0.15"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#competitions-grid)" />
              <rect width="100%" height="100%" fill="url(#trophy-pattern)" />
            </svg>
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-48 h-48 border-l-2 border-t-2 border-emerald-300/20 rounded-tl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 border-r-2 border-b-2 border-amber-300/20 rounded-br-3xl"></div>
          </>
        )}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Year and Filter Selectors */}
        <div className="flex flex-col items-center gap-6 mb-16">
          {/* Year Selector */}
          <div className="flex justify-center gap-3">
            {years.map((year) => (
              <motion.button
                key={year}
                onClick={() => setSelectedYear(year)}
                className="relative px-8 py-4 rounded-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {selectedYear === year && (
                  <motion.div
                    layoutId="year-active-comp"
                    className="absolute inset-0 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-2xl"
                    transition={{ type: 'spring', bounce: 0.2 }}
                  />
                )}
                <span className={`relative z-10 text-2xl ${
                  selectedYear === year ? 'text-white' : 'text-amber-200/60'
                }`}>
                  {year}
                </span>
                {selectedYear !== year && (
                  <div className="absolute inset-0 bg-slate-800/40 border border-amber-500/20 rounded-2xl" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 flex-wrap justify-center">
            {[
              { value: 'all' as const, label: language === 'uz' ? 'Hammasi' : 'Все', icon: Calendar },
              { value: 'international' as const, label: language === 'uz' ? 'Xalqaro' : 'Международные', icon: Trophy },
              { value: 'republican' as const, label: language === 'uz' ? 'Respublika' : 'Республиканские', icon: Medal },
            ].map(({ value, label, icon: Icon }) => (
              <motion.button
                key={value}
                onClick={() => setFilterType(value)}
                className="relative px-6 py-3 rounded-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filterType === value && (
                  <motion.div
                    layoutId="filter-active-comp"
                    className="absolute inset-0 bg-gradient-to-r from-amber-500/80 to-emerald-500/80 rounded-xl"
                    transition={{ type: 'spring', bounce: 0.2 }}
                  />
                )}
                <span className={`relative z-10 flex items-center gap-2 text-sm ${
                  filterType === value ? 'text-white' : 'text-amber-200/60'
                }`}>
                  <Icon className="w-4 h-4" />
                  {label}
                </span>
                {filterType !== value && (
                  <div className="absolute inset-0 bg-slate-800/40 border border-amber-500/20 rounded-xl" />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Map Path Layout */}
        <div className="relative">
          {/* Central Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2" style={{ zIndex: 0 }}>
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-amber-500 via-emerald-500 to-amber-500 opacity-30"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{ transformOrigin: 'top' }}
            />
            
            {/* Central Icon - Middle of the line */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 via-emerald-500 to-cyan-500 flex items-center justify-center shadow-2xl border-4 border-white/20 z-10"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.2, rotate: 360 }}
            >
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>

            {/* Top Icon */}
            <motion.div
              className="absolute left-1/2 top-0 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-2xl border-3 border-white/20 z-10"
              initial={{ scale: 0, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.3, type: 'spring' }}
              whileHover={{ scale: 1.15, rotate: 180 }}
            >
              <Crosshair className="w-7 h-7 text-white" />
            </motion.div>

            {/* Bottom Icon */}
            <motion.div
              className="absolute left-1/2 bottom-0 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl border-3 border-white/20 z-10"
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.7, type: 'spring' }}
              whileHover={{ scale: 1.15, rotate: -180 }}
            >
              <Users className="w-7 h-7 text-white" />
            </motion.div>

            {/* Additional Icon Markers along the line */}
            {[25, 75].map((position, idx) => {
              const icons = [Shield, Flame];
              const colors = ['from-pink-500 to-red-500', 'from-orange-500 to-yellow-500'];
              const Icon = icons[idx];
              
              return (
                <motion.div
                  key={idx}
                  className={`absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br ${colors[idx]} flex items-center justify-center shadow-xl border-2 border-white/20 z-10`}
                  style={{ top: `${position}%` }}
                  initial={{ scale: 0, rotate: idx % 2 === 0 ? -90 : 90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4 + idx * 0.2, type: 'spring' }}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
              );
            })}
            
            {/* Animated Dot Moving Along Line */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-400 rounded-full shadow-lg z-5"
              animate={{
                y: ['0%', '100%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>

          {/* Connecting Path Line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <motion.path
              d={filteredCompetitions.map((_, index) => {
                const isEven = index % 2 === 0;
                const yPos = 50 + index * 320;
                const xStart = isEven ? '15%' : '85%';
                const xEnd = isEven ? '85%' : '15%';
                
                if (index === 0) return `M ${xStart} ${yPos}`;
                return `L ${xStart} ${yPos}`;
              }).join(' ')}
              stroke="url(#pathGradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="10 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>
          </svg>

          {/* Competition Cards */}
          <div className="relative space-y-12">
            {filteredCompetitions.map((comp, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={comp.id}
                  className={`flex ${isLeft ? 'justify-start' : 'justify-end'} relative`}
                  initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Milestone Marker */}
                  <motion.div
                    className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? 'right-0 -mr-8' : 'left-0 -ml-8'} w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-emerald-500 flex items-center justify-center shadow-2xl z-20`}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                  >
                    {(() => {
                      const { icon: Icon } = getSportIcon(comp.sport);
                      return <Icon className="w-8 h-8 text-white" />;
                    })()}
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    className="w-full max-w-md cursor-pointer group"
                    whileHover={{ scale: 1.03, y: -5 }}
                    onClick={() => setSelectedCompetition(comp)}
                  >
                    <div className={`relative backdrop-blur-lg border-2 rounded-3xl overflow-hidden transition-all duration-300 ${
                      isDark
                        ? 'bg-gradient-to-br from-slate-900/95 to-emerald-900/70 border-amber-500/40 shadow-2xl'
                        : 'bg-gradient-to-br from-white/95 via-amber-50/30 to-emerald-50/40 border-emerald-300/60 shadow-[0_8px_32px_rgba(16,185,129,0.15)] hover:shadow-[0_20px_60px_rgba(16,185,129,0.25)] hover:border-amber-400/70'
                    }`}>
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/20 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity ${
                        isDark ? '' : 'via-amber-300/30'
                      }`} />

                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <ImageWithFallback
                            src={comp.images[0]}
                            alt={comp.name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                        
                        {/* Type Badge */}
                        <Badge className={`absolute top-4 ${isLeft ? 'right-4' : 'left-4'} ${
                          comp.type === 'international'
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                            : 'bg-gradient-to-r from-purple-500 to-pink-500'
                        } text-white border-0 shadow-lg px-4 py-2`}>
                          {comp.type === 'international' ? (language === 'uz' ? 'Xalqaro' : 'Международные') : (language === 'uz' ? 'Respublika' : 'Республиканские')}
                        </Badge>

                        {/* Sport Icon */}
                        <motion.div
                          className={`absolute bottom-4 ${isLeft ? 'left-4' : 'right-4'} w-12 h-12 rounded-full bg-slate-900/90 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-amber-500/40`}
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.6 }}
                        >
                          {(() => {
                            const { icon: Icon, color } = getSportIcon(comp.sport);
                            return <Icon className={`w-6 h-6 ${color}`} />;
                          })()}
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <h3 className={`text-xl leading-tight min-h-[3rem] ${
                          isDark ? 'text-amber-300' : 'text-gray-800'
                        }`}>
                          {comp.name}
                        </h3>
                        
                        <p className={`text-sm ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{comp.sport}</p>

                        {/* Info Grid */}
                        <div className="space-y-2 text-sm">
                          <div className={`flex items-center gap-2 ${isDark ? 'text-amber-200/70' : 'text-gray-600'}`}>
                            <Calendar className={`w-4 h-4 ${isDark ? 'text-amber-500' : 'text-amber-600'}`} />
                            {comp.date}
                          </div>
                          <div className={`flex items-center gap-2 ${isDark ? 'text-amber-200/70' : 'text-gray-600'}`}>
                            <MapPin className={`w-4 h-4 ${isDark ? 'text-emerald-500' : 'text-emerald-600'}`} />
                            {comp.location}
                          </div>
                          <div className={`flex items-center gap-2 ${isDark ? 'text-amber-200/70' : 'text-gray-600'}`}>
                            <Users className={`w-4 h-4 ${isDark ? 'text-blue-500' : 'text-blue-600'}`} />
                            {comp.participants} {language === 'uz' ? 'ishtirokchi' : 'участников'}
                          </div>
                        </div>

                        {/* Medals */}
                        <div className={`flex gap-2 pt-3 border-t ${isDark ? 'border-amber-500/20' : 'border-amber-400/30'}`}>
                          <div className={`flex-1 text-center py-2 rounded-lg border ${
                            isDark ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-yellow-50 border-yellow-400/40'
                          }`}>
                            <div className={`text-lg ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>{comp.medals.gold}</div>
                            <div className="text-xs opacity-70">🥇</div>
                          </div>
                          <div className={`flex-1 text-center py-2 rounded-lg border ${
                            isDark ? 'bg-gray-400/10 border-gray-400/20' : 'bg-gray-100 border-gray-400/40'
                          }`}>
                            <div className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{comp.medals.silver}</div>
                            <div className="text-xs opacity-70">🥈</div>
                          </div>
                          <div className={`flex-1 text-center py-2 rounded-lg border ${
                            isDark ? 'bg-orange-500/10 border-orange-500/20' : 'bg-orange-50 border-orange-400/40'
                          }`}>
                            <div className={`text-lg ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>{comp.medals.bronze}</div>
                            <div className="text-xs opacity-70">🥉</div>
                          </div>
                        </div>

                        {/* Arrow Indicator */}
                        <motion.div
                          className="flex justify-center pt-2"
                          animate={{ y: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ChevronDown className={`w-5 h-5 opacity-50 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Competition Details Modal */}
      <Dialog open={!!selectedCompetition} onOpenChange={() => setSelectedCompetition(null)}>
        <DialogContent className={`max-w-7xl max-h-[90vh] overflow-y-auto border-amber-500/40 text-white ${
          isDark
            ? 'bg-gradient-to-br from-slate-900/98 to-emerald-900/95'
            : 'bg-gradient-to-br from-white/98 to-emerald-50/95 text-gray-900'
        }`}>
          {selectedCompetition && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl text-amber-300 flex items-center gap-3">
                  <Trophy className="w-8 h-8" />
                  {selectedCompetition.name}
                </DialogTitle>
                <DialogDescription className="text-emerald-400 text-lg">
                  {selectedCompetition.sport}
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="participants" className="mt-6">
                <TabsList className={`grid w-full grid-cols-2 ${isDark ? 'bg-slate-800/50' : 'bg-gray-100'}`}>
                  <TabsTrigger value="participants" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">
                    {language === 'uz' ? 'Ishtirokchilar' : 'Участники'}
                  </TabsTrigger>
                  <TabsTrigger value="media" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">
                    {language === 'uz' ? 'Media' : 'Медиа'}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="participants" className="mt-6">
                  <div className="space-y-3">
                    {selectedCompetition.participantsList.map((participant, index) => (
                      <motion.div
                        key={index}
                        className={`flex items-center justify-between rounded-xl p-4 border ${
                          isDark
                            ? 'bg-slate-800/50 border-amber-500/20'
                            : 'bg-white border-amber-400/30'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5, backgroundColor: isDark ? 'rgba(251, 191, 36, 0.1)' : 'rgba(251, 191, 36, 0.05)' }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-emerald-500 flex items-center justify-center text-white flex-shrink-0">
                            {index + 1}
                          </div>
                          <div>
                            <h5 className={isDark ? 'text-amber-300' : 'text-gray-800'}>{participant.name}</h5>
                            <p className={`text-sm ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{participant.category}</p>
                          </div>
                        </div>
                        <Badge className="bg-gradient-to-r from-amber-500 to-emerald-500 text-white border-0">
                          {participant.result}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="media" className="mt-6 space-y-6">
                  {/* Images */}
                  {selectedCompetition.images.length > 0 && (
                    <div>
                      <h4 className={`mb-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{language === 'uz' ? 'Rasmlar' : 'Фотографии'}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedCompetition.images.map((image, index) => (
                          <motion.div 
                            key={index} 
                            className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ImageWithFallback src={image} alt={`${selectedCompetition.name} ${index + 1}`} className="w-full h-full object-cover" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Videos */}
                  {selectedCompetition.videos.length > 0 && (
                    <div>
                      <h4 className={`mb-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{language === 'uz' ? 'Videolar' : 'Видео'}</h4>
                      <div className="space-y-6">
                        {selectedCompetition.videos.map((video, index) => (
                          <div key={index} className="relative w-full rounded-xl overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                              src={video}
                              className="absolute top-0 left-0 w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedCompetition.images.length === 0 && selectedCompetition.videos.length === 0 && (
                    <div className={`text-center py-12 ${isDark ? 'text-amber-200/50' : 'text-gray-500'}`}>
                      {language === 'uz' ? 'Media hozircha mavjud emas' : 'Медиа пока недоступно'}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Competetions