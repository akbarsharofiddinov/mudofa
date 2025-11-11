/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useCallback } from "react";
import { useGesture } from "@use-gesture/react";
import logoImage from "@/assets/mudofaLogo.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Images
import sport1 from "@/assets/sportsmen/adashbayeva_regina__ogir-atletika.jpg";
import sport2 from "@/assets/sportsmen/aysunov_jasur__taekvondo.jpg";
import sport3 from "@/assets/sportsmen/ergashev_adxam__ogir-atletika.jpg";
// import sport4 from "@/assets/sportsmen/isomidinov__kurash.jpg";
// import sport5 from "@/assets/sportsmen/null__parayengil-atletika.jpg";
import sport6 from "@/assets/sportsmen/olmirzayev_shaxboz__akademik-eshkak-eshish.jpg";
import sport7 from "@/assets/sportsmen/osipova_svetlana__taekvondo.jpg";
// import sport8 from "@/assets/sportsmen/otojonov_omonjon__taekvondo.jpg";
import sport9 from "@/assets/sportsmen/rashidov_ulugbek__taekvondo.jpg";
import sport10 from "@/assets/sportsmen/sadullayeva_svetlana__yengil-atletika.jpg";
import sport11 from "@/assets/sportsmen/zafarjonov_sarvar__null.png";

import man from "@/assets/SVGs/man.svg";
import woman from "@/assets/SVGs/women.svg";

import DotGrid from "@/components/UI/DotGrid";
import { Award, Medal, Trophy } from "lucide-react";

type ImageItem = string | { src: string; alt?: string; desc?: string };

type DomeGalleryProps = {
  images?: ImageItem[];
  fit?: number;
  fitBasis?: "auto" | "min" | "max" | "width" | "height";
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  enlargeTransitionMs?: number;
  segments?: number;
  dragDampening?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  grayscale?: boolean;
};

type ItemDef = {
  src: string;
  alt: string;
  desc: string;
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
};

const DEFAULT_IMAGES: ImageItem[] = [
  {
    src: sport1,
    alt: sport1.split("/")[4].split("__")[0].split("_").join(" "),
    desc: `
      <div class="max-w-2xl mx-auto text-gray-800">
        <h3 class="text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-3 mb-2 mt-3">
          Енгил атлетика бўйича халқаро тоифадаги спорт устаси
        </h3>
        <ul class="list-disc list-inside space-y-2 marker:text-yellow-500">
          <li>2018 йил – Енгил атлетика бўйича Осиё чемпионати – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2018 йил – Енгил атлетика бўйича ўсмирлар Олимпидаси – <span class="font-bold text-yellow-600">4-ўрин</span></li>
          <li>2019 йил – Енгил атлетика бўйича Туркия халқаро турнири – <span class="font-bold text-yellow-600">3-ўрин</span></li>
          <li>2019 йил – Енгил атлетика бўйича Ўрта осиё очиқ чемпионати – <span class="font-bold text-yellow-600">1-ўрин</span></li>
        </ul>

        <h3 class="text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-3 mb-2 mt-3">
          Оғир атлетика бўйича халқаро тоифадаги спорт устаси
        </h3>
        <ul class="list-disc list-inside space-y-2 marker:text-yellow-500">
          <li>2021 йил – Оғир атлетика бўйича Ўзбекистон чемпионати – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2022 йил – V ислом ўйинларида – <span class="font-bold text-yellow-600">3-ўрин</span></li>
          <li>2022 йил – Бурсаклар ўйинларида – <span class="font-bold text-yellow-600">1, 2-ўрин</span></li>
          <li>2023 йил – Кореяда Осиё чемпионати – <span class="font-bold text-yellow-600">2, 3-ўрин</span></li>
          <li>2023 йил – Беларуссияда МДҲ ўйинларида – <span class="font-bold text-yellow-600">2-ўрин</span></li>
          <li>2024 йил – Тошкент шаҳрида Осиё чемпионати – <span class="font-bold text-yellow-600">2-ўрин</span></li>
          <li>2024 йил – 33-Олимпия иштирокчиси (Франция)</li>
          <li>2025 йил – Ўзбекистон чемпионати – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2025 йил – Осиё чемпионати (Хитой) – <span class="font-bold text-yellow-600">3-ўрин</span></li>
          <li>2025 йил – Ўзбекистон кубоги – <span class="font-bold text-yellow-600">1-ўрин</span></li>
        </ul>
      </div>

    `,
  },
  {
    src: sport2,
    alt: sport2.split("/")[4].split("__")[0].split("_").join(" "),
    desc: `
      <div class="max-w-2xl mx-auto text-gray-800">
        <h3 class="text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-3 mb-3 mt-6">
          Таэквондо бўйича халқаро тоифадаги спорт устаси
        </h3>
        <ul class="list-disc list-inside space-y-2 marker:text-yellow-500">
          <li>2018 йил – “Корея-Опен” турини – <span class="font-bold text-yellow-600">совриндори</span></li>
          <li>2019 йил – Ўсмирлар ўртасида Осиё чемпионати – <span class="font-bold text-yellow-600">ғолиби (Маскат)</span></li>
          <li>2019 йил – “Туркиш-Опен” халқаро турнир – иштирокчиси</li>
          <li>2019 йил – 7- Бутунжаҳон армия ўйинлари – иштирокчиси</li>
          <li>2020 йил – Ўзбекистон Республикаси – <span class="font-bold text-yellow-600">ғолиби</span></li>
          <li>2021 йил – Осиё чемпионати – <span class="font-bold text-yellow-600">бронза медали совриндори (Бейрут)</span></li>
          <li>2021 йил – “Бейрут Опен” Халкаро турнири – <span class="font-bold text-yellow-600">кумуш медали совриндори</span></li>
          <li>2022 йил – “Туркиш-Опен” халқаро туринир – <span class="font-bold text-yellow-600">совриндори</span></li>
          <li>2022 йил – Ўзбекистон чемпионати – <span class="font-bold text-yellow-600">совриндори</span></li>
          <li>2022 йил – “Бейрут-опен” турнири – <span class="font-bold text-yellow-600">совриндори</span></li>
          <li>2022 йил – Фужейро опен халқаро турнири – иштирокчиси</li>
          <li>2022 йил – Осиё чемпионати – иштирокчиси (Техрон)</li>
          <li>2022 йил – Осиё Таэквондо Федерацияси Президент Кубоги – иштирокчиси (Техрон)</li>
          <li>2022 йил – XXV Осиё чемпионати – <span class="font-bold text-yellow-600">ғолиби (Жанубий Корея)</span></li>
          <li>2022 йил – V Ислом бирдамлиги ўйинлари – <span class="font-bold text-yellow-600">бронза медали совриндори</span></li>
          <li>2023 йил – “Дач опен” халқаро турнири – <span class="font-bold text-yellow-600">ғолиби (Нидерландия)</span></li>
          <li>2023 йил – “Катта дубулға” халқаро турнири – <span class="font-bold text-yellow-600">ғолиби (Хитой)</span></li>
          <li>2023 йил – Туркиш опен – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2023 йил – Осиё ўйинлари жамоавий белашув – <span class="font-bold text-yellow-600">3-ўрин (Хитой)</span></li>
          <li>2023 йил – Катта дубулға – <span class="font-bold text-yellow-600">2-ўрин (Хитой)</span></li>
          <li>2024 йил – “Фужеро Опен” халқаро турнири – <span class="font-bold text-yellow-600">1-ўрин (Фужайра)</span></li>
          <li>2024 йил – Осиё литцензион турнирида – йўлланма қўлга киритди</li>
          <li>2024 йил – Осиё чемпионати – <span class="font-bold text-yellow-600">1-ўрин (Ветнам)</span></li>
          <li>2024 йил – 33-Олимпия ўйинлари – иштирокчиси (Франция)</li>
          <li>2024 йил – Ўзбекистон чемпионати – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2024 йил – Катта дубулға халқаро турнири – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2025 йил – Фужайра опен халқаро турнири – <span class="font-bold text-yellow-600">1-ўрин (БАА)</span></li>
          <li>2025 йил – Бутунжаҳон таэквондо президенти кубоги – <span class="font-bold text-yellow-600">1-ўрин (Хитой)</span></li>
          <li>2025 йил – Албания Опен халқаро турнири – <span class="font-bold text-yellow-600">1-ўрин (Албания)</span></li>
        </ul>
      </div>
    `,
  },
  {
    src: sport3,
    alt: sport3.split("/")[4].split("__")[0].split("_").join(" "),
    desc: `
      <div class="max-w-2xl mx-auto text-gray-800">
        <h3 class="text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-3 mb-4">
          Оғир атлетика бўйича халқаро тоифадаги спорт устаси
        </h3>
        <ul class="list-disc list-inside space-y-2 marker:text-yellow-500">
          <li>2021 йил – <span class="font-bold text-yellow-600">Шухрат медали соҳиби</span></li>
          <li>2014 йил – Ёшлар ўртасида Олимпия ўйинлари совриндори</li>
          <li>2014 ва 2015 йиллар – Ёшлар ўртасида <span class="font-bold text-yellow-600">Жаҳон чемпиони</span></li>
          <li>2016 йил – <span class="font-bold text-yellow-600">Жаҳон чемпиони</span></li>
          <li>2016 йил – Осиё чемпионати ғолиби</li>
          <li>2017 йил – Осиё биринчилиги ғолиби</li>
          <li>2018 йил – Осиё ўйинлари бронза медали совриндори (<span class="italic">Жакарта</span>) – <span class="font-bold text-yellow-600">3-ўрин</span></li>
          <li>2019 йил – Ўсмирлар ўртасида жаҳон чемпионати ғолиби</li>
          <li>2019 йил – Катталар ўртасида жаҳон чемпионати бронза медали совриндори</li>
          <li>2019 йил – Гран-При халқаро турнири ғолиби</li>
          <li>2020 йил – Токио Олимпия ўйинлари иштирокчиси – <span class="font-bold text-yellow-600">5-ўрин</span></li>
          <li>2021 йил – Осиё чемпионати бронза медали совриндори</li>
          <li>2022 йил – Жаҳон чемпионати бронза медали совриндори (<span class="italic">Тошкент</span>) – <span class="font-bold text-yellow-600">3-ўрин</span></li>
          <li>2022 йил – V ислом ўйинлари бирдамлиги кумуш ва 2 нафар <span class="font-bold text-yellow-600">олтин медали соҳиби</span></li>
          <li>2022 йил – Ўзбекистон кубоги <span class="font-bold text-yellow-600">олтин медал ғолиби</span></li>
          <li>2022 йил – Осиё чемпионати <span class="font-bold text-yellow-600">олтин медал ғолиби</span></li>
          <li>2023 йил – Ўзбекистон чемпионати ғолиби</li>
          <li>2023 йил – Осиё чемпионати <span class="font-bold text-yellow-600">кумуш медал совриндори</span></li>
          <li>2025 йил – Ўзбекистон чемпионати – <span class="font-bold text-yellow-600">3-ўрин</span></li>
          <li>Халқаро ва республика мусобоқалар кўп карра ғолиби ва совриндори</li>
        </ul>
      </div>
    `,
  },
  // {
  //   src: sport4,
  //   alt: sport4.split("/")[4].split("__")[0].split("_").join(" "),
  //   desc: "<p>Fazliddin Erkinboyev (2005-yil 6-avgustda tugʻilgan) — oʻzbek bokschisi. U 2025-yilgi jahon chempionatida o‘rta vazn (75 kg) toifasida oltin medal sohibi boʻldi. Shuningdek, u Boks bo‘yicha Jahon kubogida ham g‘oliblikni qo‘lga kiritgan. Erkinboyev hozirda O‘zbekiston terma jamoasining istiqbolli yosh bokschilaridan biri hisoblanadi.</p>",
  // },
  // {
  //   src: sport5,
  //   alt: sport5.split("/")[4].split("__")[0].split("_").join(" "),
  //   desc: "<div><h4>Diyora Keldiyorova o‘zbek dzyudosi tarixida ilk bor oltin medalni qo‘lga kiritgan sportchiga aylandi</h4> <p>28-iyul kuni dzyudo bo‘yicha O‘zbekiston terma jamoasi aʼzosi Diyora Keldiyorova -52 kg vazn toifasida Parij Olimpiadasida g‘oliblikni qo‘lga kiritdi. Diyora o‘zbekistonlik dzyudochilar orasida birinchi bo‘lib Olimpiada g‘olibiga aylandi. O‘zbekistonlik dzyudochilardan Armen Bagdasarov (Atlanta—1996) va Abdullo Tangriyev (Pekin—2008) Olimpiya o‘yinlarida kumush, Rishod Sobirov uch marotaba bronza medalini qo‘lga kiritgan. Shuningdek, Diyorbek O‘rozboyev va Davlat Bobonov hisobida ham bittadan bronza medali bor. Keldiyorova ushbu natija orqali o‘zbekistonlik ayol sportchilar orasida yozgi Olimpiadalarda birinchi oltin medalni qo‘lga kiritgan ilk sportchiga aylandi. Bungacha o‘zbekistonlik ayol sportchilardan faqatgina trampolindan sakrash bahslarida Yekaterina Xilko (2008-yil, bronza) Olimpiada sovrindori bo‘lgan edi.</p></div>",
  // },
  {
    src: sport6,
    alt: sport6.split("/")[4].split("__")[0].split("_").join(" "),
    desc: `
      <div class="max-w-2xl mx-auto text-gray-800">
        <h3 class="text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-3 mb-4">
          Академик эшкак эшиш бўйича халқаро тоифадаги спорт устаси
        </h3>
        
        <ul class="list-disc list-inside space-y-2 marker:text-yellow-500">
          <li>“<span class="font-bold text-yellow-600">Мард ўғлон</span>” давлат мукофоти соҳиби</li>
          <li>Байдарка ва каноэда эшкак эшиш бўйича халқаро тоифадаги спорт устаси</li>
          <li>2016 йил – Олимпиада иштирокчиси</li>
          <li>2016 йил – Осиё чемпионати совриндори – <span class="font-bold text-yellow-600">2-ўрин</span></li>
          <li>2017 йил – Осиё чемпионати совриндори – <span class="font-bold text-yellow-600">3-ўрин</span></li>
          <li>2017 йил – “Катта регата” халқаро турнири совриндори – <span class="font-bold text-yellow-600">1-ўрин</span> (<span class="italic">одиночка</span>)</li>
          <li>2017 йил – “Катта регата” халқаро турнири совриндори – <span class="font-bold text-yellow-600">2-ўрин</span> (<span class="italic">четвёрка</span>)</li>
          <li>2018 йил – Осиё ўйинлари ғолиби (<span class="italic">Жакарта</span>)</li>
          <li>Кўп карра Осиё чемпионати ғолиби</li>
          <li>2019 йил – Осиё чемпионати совриндори – <span class="font-bold text-yellow-600">2-ўрин</span></li>
          <li>2019 йил – Осиё чемпионати совриндори – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2020 йил – Токио Олимпия ўйинлари иштирокчиси – <span class="font-bold text-yellow-600">8-ўрин</span></li>
          <li>2021 йил – Осиё чемпионати совриндори – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2021 йил – Осиё чемпионати совриндори – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2022 йил – “Катта регата” халқаро турнири совриндори – <span class="font-bold text-yellow-600">2-ўрин</span></li>
          <li>2022 йил – 1-босқич Жаҳон кубогида бронза медали совриндори (<span class="italic">Белград, Сербия</span>) – <span class="font-bold text-yellow-600">3-ўрин</span></li>
          <li>2022 йил – Жаҳон кубоги бронза медали совриндори (<span class="italic">Москва, Россия</span>) – <span class="font-bold text-yellow-600">3-ўрин</span></li>
          <li>2022 йил – Осиё чемпионати кумуш медали совриндори (<span class="italic">Пантея, Тайланд</span>) – <span class="font-bold text-yellow-600">2-ўрин</span></li>
          <li>2023 йил – Осиё ўйинлари – <span class="font-bold text-yellow-600">2-ўрин</span> (<span class="italic">Хитой</span>)</li>
          <li>2024 йил – Ўзбекистон чемпионати – <span class="font-bold text-yellow-600">1-ўрин</span></li>
        </ul>
      </div>

    `,
  },
  {
    src: sport7,
    alt: sport7.split("/")[4].split("__")[0].split("_").join(" "),
    desc: `
      <div class="max-w-2xl mx-auto text-gray-800">
        <h3 class="text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-3 mb-3 mt-6">
          Таэквондо бўйича халқаро тоифадаги спорт устаси
        </h3>
        <ul class="list-disc list-inside space-y-2 marker:text-yellow-500">
          <li>2024 йил – “Ўзбекистон Республикасида хизмат кўрсатган спортчи” фахрий унвони</li>
          <li>2016 йил – “Туркиш-Опен” турнири – <span class="font-bold text-yellow-600">2-ўрин</span></li>
          <li>2016 йил – “Фужайра-Опен” турнири – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2016 йил – “Дутш-Опен” турнири – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2016 йил – “Корея-Опен” турнири – <span class="font-bold text-yellow-600">совриндори</span></li>
          <li>2016 йил – Корея элчихонаси кубоги – <span class="font-bold text-yellow-600">совриндори</span></li>
          <li>2017 йил – Ёпиқ иншоотларда ўтказилган 5-Осиё ўйинлари – <span class="font-bold text-yellow-600">2-ўрин</span></li>
          <li>2017 йил – Катталар ўртасида Ўзбекистон чемпиони</li>
          <li>2018 йил – Осиё ўйинлари (Жакарта) – <span class="font-bold text-yellow-600">3-ўрин</span></li>
          <li>2018 йил – “Париж-Опен” турнири – <span class="font-bold text-yellow-600">3-ўрин</span></li>
          <li>2019 йил – Ўзбекистон чемпионати – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2019 йил – “Туркиш-Опен” турнири – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2019 йил – “Фужайра-Опен” турнири – <span class="font-bold text-yellow-600">2-ўрин</span></li>
          <li>2019 йил – Осиё Президенти Кубоги – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2019 йил – “Корея-Опен” турнири – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2019 йил – Киёнг кубоги – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2019 йил – 7-Бутунжаҳон армия ўйинлари – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2019 йил – Чиба Гран-При турнири – <span class="font-bold text-yellow-600">3-ўрин</span></li>
          <li>2020 йил – Ўзбекистон чемпионати – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2020 йил – “Туркиш-Опен” турнири – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2021 йил – Токио Олимпия ўйинлари – <span class="font-bold text-yellow-600">4-ўрин</span></li>
          <li>2021 йил – Ўзбекистон чемпиони</li>
          <li>2022 йил – “Фужайра-Опен” турнири – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2022 йил – Осиё чемпионати (Техрон) – <span class="font-bold text-yellow-600">совриндори</span></li>
          <li>2022 йил – Осиё Таэквондо Федерацияси Президент Кубоги – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2022 йил – V Ислом бирдамлиги ўйинлари – <span class="font-bold text-yellow-600">олтин медал</span></li>
          <li>2022 йил – Жаҳон чемпионати (Гуаллахара, Мексика) – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2022 йил – Энг яхши аёл спортчи номинацияси ғолиби</li>
          <li>2023 йил – “Фужайра-Опен” турнири – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2023 йил – “Дач-Опен” халқаро турнири (Нидерландия) – <span class="font-bold text-yellow-600">3-ўрин</span></li>
          <li>2023 йил – “Катта дубулға” халқаро турнири – <span class="font-bold text-yellow-600">3-ўрин</span></li>
          <li>2023 йил – Жаҳон чемпионати (Озарбайжон) – <span class="font-bold text-yellow-600">2-ўрин</span></li>
          <li>2023 йил – Бутунжаҳон универсиада ўйинлари – <span class="font-bold text-yellow-600">3-ўрин</span></li>
          <li>2023 йил – Осиё ўйинлари (Хитой) – <span class="font-bold text-yellow-600">3-ўрин</span></li>
          <li>2024 йил – Осиё чемпионати (Ветнам) – <span class="font-bold text-yellow-600">3-ўрин</span></li>
          <li>2024 йил – 33-Олимпия ўйинлари (Франция) – <span class="font-bold text-yellow-600">2-ўрин</span></li>
          <li>2025 йил – Фужайра Опен (БАА) – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2025 йил – Бутунжаҳон Таэквондо Президенти Кубоги (Хитой) – <span class="font-bold text-yellow-600">3-ўрин</span></li>
          <li>2025 йил – Клублар ўртасида Осиё чемпионати (Хитой) – <span class="font-bold text-yellow-600">2-ўрин</span></li>
          <li>2025 йил – Австрия Опен (Австрия) – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2025 йил – Албания Опен (Албания) – <span class="font-bold text-yellow-600">1-ўрин</span></li>
        </ul>
      </div>
    `,
  },
  // {
  //   src: sport8,
  //   alt: sport8.split("/")[4].split("__")[0].split("_").join(" "),
  //   desc: "<div><h4>Diyora Keldiyorova o‘zbek dzyudosi tarixida ilk bor oltin medalni qo‘lga kiritgan sportchiga aylandi</h4> <p>28-iyul kuni dzyudo bo‘yicha O‘zbekiston terma jamoasi aʼzosi Diyora Keldiyorova -52 kg vazn toifasida Parij Olimpiadasida g‘oliblikni qo‘lga kiritdi. Diyora o‘zbekistonlik dzyudochilar orasida birinchi bo‘lib Olimpiada g‘olibiga aylandi. O‘zbekistonlik dzyudochilardan Armen Bagdasarov (Atlanta—1996) va Abdullo Tangriyev (Pekin—2008) Olimpiya o‘yinlarida kumush, Rishod Sobirov uch marotaba bronza medalini qo‘lga kiritgan. Shuningdek, Diyorbek O‘rozboyev va Davlat Bobonov hisobida ham bittadan bronza medali bor. Keldiyorova ushbu natija orqali o‘zbekistonlik ayol sportchilar orasida yozgi Olimpiadalarda birinchi oltin medalni qo‘lga kiritgan ilk sportchiga aylandi. Bungacha o‘zbekistonlik ayol sportchilardan faqatgina trampolindan sakrash bahslarida Yekaterina Xilko (2008-yil, bronza) Olimpiada sovrindori bo‘lgan edi.</p></div>",
  // },
  {
    src: sport9,
    alt: sport9.split("/")[4].split("__")[0].split("_").join(" "),
    desc: `
      <div class="max-w-2xl mx-auto text-gray-800">
        <h3 class="text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-3 mb-3 mt-6">
          Таэквондо бўйича халқаро тоифадаги спорт устаси
        </h3>
        <ul class="list-disc list-inside space-y-2 marker:text-yellow-500">
          <li>2021 йил – <span class="font-bold text-yellow-600">“Ўзбекистон ифтихори”</span></li>
          <li>2024 йил – <span class="font-bold text-yellow-600">“Эл юрт хурмати ордени”</span></li>
          <li>2017 йил – ўсмирлар ўртасида Осиё чемпионати – <span class="font-bold text-yellow-600">кумуш медали совриндори</span></li>
          <li>2018 йил – Гран-при – <span class="font-bold text-yellow-600">ғолиби</span></li>
          <li>2018 йил – ўсмирлар ўртасида Осиё чемпионати – <span class="font-bold text-yellow-600">бронза медали совриндори</span></li>
          <li>2018 йил – ўсмирлар ўртасидаги ёзги Олимпия ўйинлари – <span class="font-bold text-yellow-600">кумуш медали совриндори</span></li>
          <li>2019 йил – ўсмирлар ўртасида Осиё чемпионати – <span class="font-bold text-yellow-600">ғолиби</span></li>
          <li>2019 йил – Осиё Ассоциацияси Президенти Кубоги – <span class="font-bold text-yellow-600">ғолиби</span></li>
          <li>2019 йил – 7-Умумжаҳон армия ўйинлари – <span class="font-bold text-yellow-600">ғолиби</span></li>
          <li>2021 йил – “Туркиш опен” халқаро турнири (Истанбул) – <span class="font-bold text-yellow-600">ғолиби</span></li>
          <li>2021 йил – лицензион халқаро турнири – <span class="font-bold text-yellow-600">кумуш медали совриндори</span></li>
          <li>2020 йил – Токио Олимпия ўйинлари – <span class="font-bold text-yellow-600">ғолиби</span></li>
          <li>2022 йил – “Фужеро Опен” турнири (Фужайра) – <span class="font-bold text-yellow-600">ғолиби</span></li>
          <li>2022 йил – Клублар ўртасида Осиё чемпионати (Техрон) – <span class="font-bold text-yellow-600">ғолиби</span></li>
          <li>2022 йил – Осиё Таэквондо Федерацияси Президент Кубоги (Техрон) – <span class="font-bold text-yellow-600">ғолиби</span></li>
          <li>Ўзбекистон Республикаси Мудофаа вазирининг махсус қўл соати билан тақдирланган</li>
          <li>2022 йил – XXV Осиё чемпионати (Жанубий Корея) – <span class="font-bold text-yellow-600">ғолиби</span></li>
          <li>2022 йил – V Ислом бирдамлиги ўйинлари – <span class="font-bold text-yellow-600">олтин медали ғолиби</span></li>
          <li>2022 йил – Халқаро турнир Гран-при – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2023 йил – “Фужеро Опен” халқаро турнири (Фужайра) – <span class="font-bold text-yellow-600">ғолиби</span></li>
          <li>2023 йил – “Дач опен” халқаро турнири (Нидерландия) – <span class="font-bold text-yellow-600">3-ўрин</span></li>
          <li>2023 йил – “Белгия опен” халқаро турнири – <span class="font-bold text-yellow-600">ғолиби</span></li>
          <li>2023 йил – “Катта дубулға” халқаро турнири (Хитой) – <span class="font-bold text-yellow-600">ғолиби</span></li>
          <li>2023 йил – Жаҳон чемпионати (Озарбайжон) – <span class="font-bold text-yellow-600">бронза медали совриндори</span></li>
          <li>2023 йил – Гран-При халқаро турнир (Италия) – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2023 йил – Гран-При халқаро турнир Париж-2023 (Франция) – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2023 йил – Осиё ўйинлари (Хитой) – <span class="font-bold text-yellow-600">ғолиби</span></li>
          <li>2023 йил – Гран-При халқаро турнир (Хитой)</li>
          <li>2024 йил – “Фужеро Опен” халқаро турнири (Фужайра) – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2024 йил – 33-Олимпия ўйинлари (Франция) – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2024 йил – Жаҳоннинг энг яхши эркак таэквондочиси деб топилди</li>
          <li>Улуғбек Рашитов — дунё миқёсида <span class="font-bold text-yellow-600">“Йилнинг энг яхши эркак спортчиси”</span> деб топилди!</li>
        </ul>
      </div>
    `,
  },
  {
    src: sport10,
    alt: sport10.split("/")[4].split("__")[0].split("_").join(" "),
    desc: `
      <div class="max-w-2xl mx-auto text-gray-800">
        <h3 class="text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-3 mb-3 mt-6">
          Енгил атлетика бўйича халқаро тоифадаги спорт устаси
        </h3>
        <ul class="list-disc list-inside space-y-2 marker:text-yellow-500">
          <li>2021 йил – “Шухрат” медали соҳибаси</li>
          <li>2021 йил – “Келажак бунёдкори” медали соҳибаси</li>
          <li>2015 йил – Ёшлар орасида Осиё чемпиони (Доха)</li>
          <li>2017 йил – Ёпиқ иншоотларда ўтказилган 5-чи Осиё ўйинлари – <span class="font-bold text-yellow-600">кумуш медали совриндори</span> (Ашхабод)</li>
          <li>2017 йил – Касанова хотирасига бағишланган халқаро турнир – <span class="font-bold text-yellow-600">ғолиби</span> (Олмаота)</li>
          <li>2017 йил – Осиё давлатларида халқаро мусобокалар – <span class="font-bold text-yellow-600">ғолиби</span></li>
          <li>2018 йил – Ёпиқ иншоотлардаги Осиё чемпионати – <span class="font-bold text-yellow-600">иштирокчи 4-ўрин</span></li>
          <li>2019 йил – Ольга Рипакова халқаро турнир – <span class="font-bold text-yellow-600">ғолиби</span> (Усть-Каменогорск)</li>
          <li>2020 йил – Токио Олимпия ўйинлари – <span class="font-bold text-yellow-600">иштирокчи 6-ўрин</span></li>
          <li>2022 йил – “World Athletics Indoor Tour Silver” халқаро турнир – <span class="font-bold text-yellow-600">совриндори</span></li>
          <li>2022 йил – 57-th Relingen-Zirsburg International Pentekost Sport Meeting Rihlingen – <span class="font-bold text-yellow-600">ғолиби</span></li>
          <li>2022 йил – Осиё рекордчиси</li>
          <li>2022 йил – Жаҳон чемпионати – <span class="font-bold text-yellow-600">иштирокчи 5-ўрин</span> (шахсий рекорд 1.96)</li>
          <li>2022 йил – Бриллиант лига Халқаро мусобақаси – <span class="font-bold text-yellow-600">1-ўрин</span> (Польша)</li>
          <li>2022 йил – V Ислом бирдамлиги ўйинлари – <span class="font-bold text-yellow-600">1-ўрин</span> (Конья)</li>
          <li>2022 йил – Гран-при (Венгрия) – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2023 йил – Арзуманов Г.Г. хотирасига бағишланган халқаро турнир – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2023 йил – Осиё ўйинлари (Хитой) – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2024 йил – Meeting de Cobus халқаро турнири – <span class="font-bold text-yellow-600">3-ўрин</span></li>
          <li>2024 йил – Истония очиқ чемпионати – <span class="font-bold text-yellow-600">2-ўрин</span></li>
          <li>2024 йил – Марказий Осиё чемпионати (Ўзбекистон) – <span class="font-bold text-yellow-600">2-ўрин</span></li>
          <li>2024 йил – 33-Олимпия ўйинлари – иштирокчи (Франция)</li>
          <li>2025 йил – Jump Meeting Cottbus халқаро турнири – <span class="font-bold text-yellow-600">3-ўрин</span> (Германия)</li>
          <li>2025 йил – Orlen Cup халқаро турнири – <span class="font-bold text-yellow-600">3-ўрин</span> (Польша)</li>
          <li>2025 йил – Ўзбекистон чемпионати – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2025 йил – Халқаро турнир UNG Meeting – <span class="font-bold text-yellow-600">1-ўрин</span></li>
          <li>2025 йил – Халқаро турнир (Польша) – <span class="font-bold text-yellow-600">1-ўрин</span></li>
        </ul>
      </div>
    `,
  },
  {
    src: sport11,
    alt: sport11.split("/")[4].split("__")[0].split("_").join(" "),
    desc: `
    <div class="max-w-2xl mx-auto text-gray-800">
      <h3 class="text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-3 mb-3 mt-6">
        Оғир атлетика бўйича халқаро тоифадаги спорт устаси
      </h3>
      <ul class="list-disc list-inside space-y-2 marker:text-yellow-500">
        <li>2017 йил – Ўсмирлар ўртасида Осиё чемпиони</li>
        <li>2019 йил – Жаҳон кубоги – <span class="font-bold text-yellow-600">совриндори</span></li>
        <li>2020 йил – Осиё чемпионати – <span class="font-bold text-yellow-600">ғолиби</span></li>
        <li>2020 йил – Ўзбекистон Республикаси Мустақиллиги кубоги – <span class="font-bold text-yellow-600">совриндори</span></li>
        <li>2021 йил – Осиё чемпионати – <span class="font-bold text-yellow-600">совриндори</span></li>
        <li>2019 йил – Катталар ўртасида Жаҳон чемпионатининг бронза медали – <span class="font-bold text-yellow-600">совриндори</span></li>
        <li>2019 йил – Гран-При халқаро турнири – <span class="font-bold text-yellow-600">ғолиби</span></li>
        <li>2020 йил – Токио Олимпия ўйинлари – иштирокчи</li>
        <li>2021 йил – Осиё чемпионати – <span class="font-bold text-yellow-600">совриндори</span></li>
        <li>2021 йил – Жаҳон чемпионати – <span class="font-bold text-yellow-600">совриндори</span></li>
        <li>2022 йил – Ўзбекистон чемпионати – <span class="font-bold text-yellow-600">ғолиби</span></li>
        <li>2022 йил – V ислом бирдамлиги ўйинлари – <span class="font-bold text-yellow-600">3 нафар олтин медали ғолиби</span></li>
        <li>2022 йил – Ўзбекистон кубоги – <span class="font-bold text-yellow-600">олтин медал ғолиби</span></li>
        <li>2023 йил – Ўзбекистон чемпионати – <span class="font-bold text-yellow-600">олтин медал ғолиби</span></li>
        <li>2024 йил – Осиё чемпионати (Ўзбекистон) – <span class="font-bold text-yellow-600">1-ўрин</span></li>
        <li>2024 йил – Ўзбекистон чемпионати – <span class="font-bold text-yellow-600">1-ўрин</span></li>
        <li>2024 йил – Осиё чемпионати – <span class="font-bold text-yellow-600">3-ўрин</span></li>
        <li>2024 йил – Жаҳон чемпионати (Бахрайин) – <span class="font-bold text-yellow-600">3-ўрин</span></li>
      </ul>
    </div>
    `,
  },
];

const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 0,
  segments: 35,
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);
const normalizeAngle = (d: number) => ((d % 360) + 360) % 360;
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};
const getDataNumber = (el: HTMLElement, name: string, fallback: number) => {
  const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
  const n = attr == null ? NaN : parseFloat(attr);
  return Number.isFinite(n) ? n : fallback;
};

function buildItems(pool: ImageItem[], seg: number): ItemDef[] {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  if (pool.length === 0) {
    return coords.map((c) => ({ ...c, src: "", alt: "", desc: "" }));
  }
  if (pool.length > totalSlots) {
    console.warn(
      `[DomeGallery] Provided image count (${pool.length}) exceeds available tiles (${totalSlots}). Some images will not be shown.`
    );
  }

  const normalizedImages = pool.map((image) => {
    if (typeof image === "string") {
      return { src: image, alt: "", desc: "" };
    }
    return {
      src: image.src || "",
      alt: image.alt || "",
      desc: image.desc || "",
    };
  });

  const usedImages = Array.from(
    { length: totalSlots },
    (_, i) => normalizedImages[i % normalizedImages.length]
  );

  for (let i = 1; i < usedImages.length; i++) {
    if (usedImages[i].src === usedImages[i - 1].src) {
      for (let j = i + 1; j < usedImages.length; j++) {
        if (usedImages[j].src !== usedImages[i].src) {
          const tmp = usedImages[i];
          usedImages[i] = usedImages[j];
          usedImages[j] = tmp;
          break;
        }
      }
    }
  }

  return coords.map((c, i) => ({
    ...c,
    src: usedImages[i].src,
    alt: usedImages[i].alt,
    desc: usedImages[i].desc,
  }));
}

function computeItemBaseRotation(
  offsetX: number,
  offsetY: number,
  sizeX: number,
  sizeY: number,
  segments: number
) {
  const unit = 360 / segments / 2;
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);
  return { rotateX, rotateY };
}

const OurTeam: React.FC = ({
  images = DEFAULT_IMAGES,
  fit = 0.5,
  fitBasis = "auto",
  minRadius = 500,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = "#060010",
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  openedImageWidth = "700px",
  openedImageHeight = "400px",
  imageBorderRadius = "30px",
  openedImageBorderRadius = "30px",
  grayscale = false,
}: DomeGalleryProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const focusedElRef = useRef<HTMLElement | null>(null);
  const originalTilePositionRef = useRef<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const cancelTapRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);
  const pointerTypeRef = useRef<"mouse" | "pen" | "touch">("mouse");
  const tapTargetRef = useRef<HTMLElement | null>(null);
  const openingRef = useRef(false);
  const openStartedAtRef = useRef(0);
  const lastDragEndAt = useRef(0);

  const scrollLockedRef = useRef(false);
  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return;
    scrollLockedRef.current = true;
    document.body.classList.add("dg-scroll-lock");
  }, []);
  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return;
    if (rootRef.current?.getAttribute("data-enlarging") === "true") return;
    scrollLockedRef.current = false;
    document.body.classList.remove("dg-scroll-lock");
  }, []);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = (xDeg: number, yDeg: number) => {
    const el = sphereRef.current;
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  };

  const lockedRadiusRef = useRef<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width),
        h = Math.max(1, cr.height);
      const minDim = Math.min(w, h),
        maxDim = Math.max(w, h),
        aspect = w / h;
      let basis: number;
      switch (fitBasis) {
        case "min":
          basis = minDim;
          break;
        case "max":
          basis = maxDim;
          break;
        case "width":
          basis = w;
          break;
        case "height":
          basis = h;
          break;
        default:
          basis = aspect >= 1.3 ? w : minDim;
      }
      let radius = basis * fit;
      const heightGuard = h * 0.8;
      radius = Math.min(radius, heightGuard);
      radius = clamp(radius, minRadius, maxRadius);
      lockedRadiusRef.current = Math.round(radius);

      const viewerPad = Math.max(8, Math.round(minDim * padFactor));
      root.style.setProperty("--radius", `${lockedRadiusRef.current}px`);
      root.style.setProperty("--viewer-pad", `${viewerPad}px`);
      root.style.setProperty("--overlay-blur-color", overlayBlurColor);
      root.style.setProperty("--tile-radius", imageBorderRadius);
      root.style.setProperty("--enlarge-radius", openedImageBorderRadius);
      root.style.setProperty(
        "--image-filter",
        grayscale ? "grayscale(1)" : "none"
      );
      applyTransform(rotationRef.current.x, rotationRef.current.y);

      const enlargedOverlay = viewerRef.current?.querySelector(
        ".enlarge"
      ) as HTMLElement;
      if (enlargedOverlay && frameRef.current && mainRef.current) {
        const frameR = frameRef.current.getBoundingClientRect();
        const mainR = mainRef.current.getBoundingClientRect();

        const hasCustomSize = openedImageWidth && openedImageHeight;
        if (hasCustomSize) {
          const tempDiv = document.createElement("div");
          tempDiv.style.cssText = `position: absolute; width: ${openedImageWidth}; height: ${openedImageHeight}; visibility: hidden;`;
          document.body.appendChild(tempDiv);
          const tempRect = tempDiv.getBoundingClientRect();
          document.body.removeChild(tempDiv);

          const centeredLeft =
            frameR.left - mainR.left + (frameR.width - tempRect.width) / 2;
          const centeredTop =
            frameR.top - mainR.top + (frameR.height - tempRect.height) / 2;

          enlargedOverlay.style.left = `${centeredLeft}px`;
          enlargedOverlay.style.top = `${centeredTop}px`;
        } else {
          enlargedOverlay.style.left = `${frameR.left - mainR.left}px`;
          enlargedOverlay.style.top = `${frameR.top - mainR.top}px`;
          enlargedOverlay.style.width = `${frameR.width}px`;
          enlargedOverlay.style.height = `${frameR.height}px`;
        }
      }
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [
    fit,
    fitBasis,
    minRadius,
    maxRadius,
    padFactor,
    overlayBlurColor,
    grayscale,
    imageBorderRadius,
    openedImageBorderRadius,
    openedImageWidth,
    openedImageHeight,
  ]);

  useEffect(() => {
    applyTransform(rotationRef.current.x, rotationRef.current.y);
  }, []);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback(
    (vx: number, vy: number) => {
      const MAX_V = 1.4;
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;
      let frames = 0;
      const d = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMul = 0.94 + 0.055 * d;
      const stopThreshold = 0.015 - 0.01 * d;
      const maxFrames = Math.round(90 + 270 * d);
      const step = () => {
        vX *= frictionMul;
        vY *= frictionMul;
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null;
          return;
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null;
          return;
        }
        const nextX = clamp(
          rotationRef.current.x - vY / 200,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };
      stopInertia();
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [dragDampening, maxVerticalRotationDeg, stopInertia]
  );

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (focusedElRef.current) return;
        stopInertia();

        const evt = event as PointerEvent;
        pointerTypeRef.current = (evt.pointerType as any) || "mouse";
        if (pointerTypeRef.current === "touch") evt.preventDefault();
        if (pointerTypeRef.current === "touch") lockScroll();
        draggingRef.current = true;
        cancelTapRef.current = false;
        movedRef.current = false;
        startRotRef.current = { ...rotationRef.current };
        startPosRef.current = { x: evt.clientX, y: evt.clientY };
        const potential = (evt.target as Element).closest?.(
          ".item__image"
        ) as HTMLElement | null;
        tapTargetRef.current = potential || null;
      },
      onDrag: ({
        event,
        last,
        velocity: velArr = [0, 0],
        direction: dirArr = [0, 0],
        movement,
      }) => {
        if (
          focusedElRef.current ||
          !draggingRef.current ||
          !startPosRef.current
        )
          return;

        const evt = event as PointerEvent;
        if (pointerTypeRef.current === "touch") evt.preventDefault();

        const dxTotal = evt.clientX - startPosRef.current.x;
        const dyTotal = evt.clientY - startPosRef.current.y;

        if (!movedRef.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
          if (dist2 > 16) movedRef.current = true;
        }

        const nextX = clamp(
          startRotRef.current.x - dyTotal / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );
        const nextY = startRotRef.current.y + dxTotal / dragSensitivity;

        const cur = rotationRef.current;
        if (cur.x !== nextX || cur.y !== nextY) {
          rotationRef.current = { x: nextX, y: nextY };
          applyTransform(nextX, nextY);
        }

        if (last) {
          draggingRef.current = false;
          let isTap = false;

          if (startPosRef.current) {
            const dx = evt.clientX - startPosRef.current.x;
            const dy = evt.clientY - startPosRef.current.y;
            const dist2 = dx * dx + dy * dy;
            const TAP_THRESH_PX = pointerTypeRef.current === "touch" ? 10 : 6;
            if (dist2 <= TAP_THRESH_PX * TAP_THRESH_PX) {
              isTap = true;
            }
          }

          const [vMagX, vMagY] = velArr;
          const [dirX, dirY] = dirArr;
          let vx = vMagX * dirX;
          let vy = vMagY * dirY;

          if (
            !isTap &&
            Math.abs(vx) < 0.001 &&
            Math.abs(vy) < 0.001 &&
            Array.isArray(movement)
          ) {
            const [mx, my] = movement;
            vx = (mx / dragSensitivity) * 0.02;
            vy = (my / dragSensitivity) * 0.02;
          }

          if (!isTap && (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005)) {
            startInertia(vx, vy);
          }
          startPosRef.current = null;
          cancelTapRef.current = !isTap;

          if (isTap && tapTargetRef.current && !focusedElRef.current) {
            openItemFromElement(tapTargetRef.current);
          }
          tapTargetRef.current = null;

          if (cancelTapRef.current)
            setTimeout(() => (cancelTapRef.current = false), 120);
          if (pointerTypeRef.current === "touch") unlockScroll();
          if (movedRef.current) lastDragEndAt.current = performance.now();
          movedRef.current = false;
        }
      },
    },
    { target: mainRef, eventOptions: { passive: false } }
  );

  useEffect(() => {
    const scrim = scrimRef.current;
    if (!scrim) return;

    const close = () => {
      if (performance.now() - openStartedAtRef.current < 250) return;
      const el = focusedElRef.current;
      if (!el) return;
      const parent = el.parentElement as HTMLElement;
      const overlay = viewerRef.current?.querySelector(
        ".enlarge"
      ) as HTMLElement | null;
      if (!overlay) return;

      const refDiv = parent.querySelector(
        ".item__image--reference"
      ) as HTMLElement | null;

      const originalPos = originalTilePositionRef.current;
      if (!originalPos) {
        overlay.remove();
        if (refDiv) refDiv.remove();
        parent.style.setProperty("--rot-y-delta", `0deg`);
        parent.style.setProperty("--rot-x-delta", `0deg`);
        el.style.visibility = "";
        (el.style as any).zIndex = 0;
        focusedElRef.current = null;
        rootRef.current?.removeAttribute("data-enlarging");
        openingRef.current = false;
        return;
      }

      const currentRect = overlay.getBoundingClientRect();
      const rootRect = rootRef.current!.getBoundingClientRect();

      const originalPosRelativeToRoot = {
        left: originalPos.left - rootRect.left,
        top: originalPos.top - rootRect.top,
        width: originalPos.width,
        height: originalPos.height,
      };

      const overlayRelativeToRoot = {
        left: currentRect.left - rootRect.left,
        top: currentRect.top - rootRect.top,
        width: currentRect.width,
        height: currentRect.height,
      };

      const animatingOverlay = document.createElement("div");
      animatingOverlay.className = "enlarge-closing";
      animatingOverlay.style.cssText = `
        position: absolute;
        left: ${overlayRelativeToRoot.left}px;
        top: ${overlayRelativeToRoot.top}px;
        width: ${overlayRelativeToRoot.width}px;
        height: ${overlayRelativeToRoot.height}px;
        z-index: 99998;
        border-radius: ${openedImageBorderRadius};
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,.35);
        transition: all ${enlargeTransitionMs}ms ease-out;
        pointer-events: none;
        margin: 0;
        transform: none;
        filter: ${grayscale ? "grayscale(1)" : "none"};
      `;

      const originalImg = overlay.querySelector("img");
      if (originalImg) {
        const img = originalImg.cloneNode() as HTMLImageElement;
        img.style.cssText = "width: 100%; height: 100%; object-fit: cover;";
        animatingOverlay.appendChild(img);
      }

      overlay.remove();
      rootRef.current!.appendChild(animatingOverlay);

      void animatingOverlay.getBoundingClientRect();

      requestAnimationFrame(() => {
        animatingOverlay.style.left = originalPosRelativeToRoot.left + "px";
        animatingOverlay.style.top = originalPosRelativeToRoot.top + "px";
        animatingOverlay.style.width = originalPosRelativeToRoot.width + "px";
        animatingOverlay.style.height = originalPosRelativeToRoot.height + "px";
        animatingOverlay.style.opacity = "0";
      });

      const cleanup = () => {
        animatingOverlay.remove();
        originalTilePositionRef.current = null;

        if (refDiv) refDiv.remove();
        parent.style.transition = "none";
        el.style.transition = "none";

        parent.style.setProperty("--rot-y-delta", `0deg`);
        parent.style.setProperty("--rot-x-delta", `0deg`);

        requestAnimationFrame(() => {
          el.style.visibility = "";
          el.style.opacity = "0";
          (el.style as any).zIndex = 0;
          focusedElRef.current = null;
          rootRef.current?.removeAttribute("data-enlarging");

          requestAnimationFrame(() => {
            parent.style.transition = "";
            el.style.transition = "opacity 300ms ease-out";

            requestAnimationFrame(() => {
              el.style.opacity = "1";
              setTimeout(() => {
                el.style.transition = "";
                el.style.opacity = "";
                openingRef.current = false;
                if (
                  !draggingRef.current &&
                  rootRef.current?.getAttribute("data-enlarging") !== "true"
                ) {
                  document.body.classList.remove("dg-scroll-lock");
                }
              }, 300);
            });
          });
        });
      };

      animatingOverlay.addEventListener("transitionend", cleanup, {
        once: true,
      });
      // fallback cleanup in case transitionend doesn't fire (0ms transitions)
      setTimeout(() => {
        if (animatingOverlay.parentElement) cleanup();
      }, Math.max(50, enlargeTransitionMs + 50));
    };

    scrim.addEventListener("click", close);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      scrim.removeEventListener("click", close);
      window.removeEventListener("keydown", onKey);
    };
  }, [enlargeTransitionMs, openedImageBorderRadius, grayscale]);

  const openItemFromElement = (el: HTMLElement) => {
    if (cancelTapRef.current) return;
    if (openingRef.current) return;
    openingRef.current = true;
    openStartedAtRef.current = performance.now();
    lockScroll();
    const parent = el.parentElement as HTMLElement;
    focusedElRef.current = el;
    el.setAttribute("data-focused", "true");
    const offsetX = getDataNumber(parent, "offsetX", 0);
    const offsetY = getDataNumber(parent, "offsetY", 0);
    const sizeX = getDataNumber(parent, "sizeX", 2);
    const sizeY = getDataNumber(parent, "sizeY", 2);
    const parentRot = computeItemBaseRotation(
      offsetX,
      offsetY,
      sizeX,
      sizeY,
      segments
    );
    const parentY = normalizeAngle(parentRot.rotateY);
    const globalY = normalizeAngle(rotationRef.current.y);
    let rotY = -(parentY + globalY) % 360;
    if (rotY < -180) rotY += 360;
    const rotX = -parentRot.rotateX - rotationRef.current.x;
    parent.style.setProperty("--rot-y-delta", `${rotY}deg`);
    parent.style.setProperty("--rot-x-delta", `${rotX}deg`);
    const refDiv = document.createElement("div");
    refDiv.className = "item__image item__image--reference opacity-0";
    refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
    parent.appendChild(refDiv);
    const tileR = refDiv.getBoundingClientRect();
    const mainR = mainRef.current!.getBoundingClientRect();
    const frameR = frameRef.current!.getBoundingClientRect();
    originalTilePositionRef.current = {
      left: tileR.left,
      top: tileR.top,
      width: tileR.width,
      height: tileR.height,
    };
    el.style.visibility = "hidden";
    (el.style as any).zIndex = 0;
    const overlay = document.createElement("div");
    overlay.className = "enlarge";
    overlay.style.cssText = `position:absolute; left:${
      frameR.left - mainR.left
    }px; top:${frameR.top - mainR.top}px; width:${frameR.width}px; height:${
      frameR.height
    }px; opacity:0; z-index:99999; will-change:transform,opacity; transform-origin:top left; transition:transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease; border-radius:${openedImageBorderRadius}; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.35); pointer-events:auto; max-width:calc(100vw - 2rem); max-height:calc(100vh - 2rem);`;
    const rawSrc =
      parent.dataset.src ||
      (el.querySelector("img") as HTMLImageElement)?.src ||
      "";
    const rawAlt =
      parent.dataset.alt ||
      (el.querySelector("img") as HTMLImageElement)?.alt ||
      "";
    const rawDesc = parent.dataset.desc || "";

    // Create container for image and description
    const container = document.createElement("div");
    container.style.cssText =
      "display: flex; width: 100%; height: 100%; background: white;";

    // Create image section
    const imageSection = document.createElement("div");
    imageSection.style.cssText =
      "flex: 1; display: flex; align-items: center; justify-content: center; background: #f5f5f5; padding: 20px;";

    const img = document.createElement("img");
    img.src = rawSrc;
    img.alt = rawAlt;
    img.style.cssText = `max-width: 100%; max-height: 100%; object-fit: contain; filter: ${
      grayscale ? "grayscale(1)" : "none"
    }; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);`;
    imageSection.appendChild(img);

    // Create description section
    const descSection = document.createElement("div");
    descSection.style.cssText =
      "flex: 1; padding: 30px; overflow-y: auto; background: white;";

    const title = document.createElement("h2");
    title.textContent = rawAlt;
    title.style.cssText =
      "font-size: 24px; font-weight: bold; margin: 0 0 20px 0; color: #333; text-transform: capitalize; line-height: 1.2;";

    const descContent = document.createElement("div");
    descContent.innerHTML = rawDesc;
    descContent.style.cssText =
      "color: #666; line-height: 1.6; font-size: 16px;";

    descSection.appendChild(title);
    descSection.appendChild(descContent);

    // Add responsive behavior for mobile
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    if (mediaQuery.matches) {
      container.style.flexDirection = "column";
      imageSection.style.flex = "0 0 60%";
      descSection.style.flex = "1";
    }

    container.appendChild(imageSection);
    container.appendChild(descSection);
    overlay.appendChild(container);
    viewerRef.current!.appendChild(overlay);
    const tx0 = tileR.left - frameR.left;
    const ty0 = tileR.top - frameR.top;
    const sx0 = tileR.width / frameR.width;
    const sy0 = tileR.height / frameR.height;
    overlay.style.transform = `translate(${tx0}px, ${ty0}px) scale(${sx0}, ${sy0})`;
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      overlay.style.transform = "translate(0px, 0px) scale(1, 1)";
      rootRef.current?.setAttribute("data-enlarging", "true");
    });
    const wantsResize = openedImageWidth || openedImageHeight;
    if (wantsResize) {
      const onFirstEnd = (ev?: TransitionEvent) => {
        // allow manual invocation via fallback (ev can be undefined)
        if (ev && ev.propertyName !== "transform") return;
        overlay.removeEventListener("transitionend", onFirstEnd);
        const prevTransition = overlay.style.transition;
        overlay.style.transition = "none";
        const tempWidth = openedImageWidth || `${frameR.width}px`;
        const tempHeight = openedImageHeight || `${frameR.height}px`;
        overlay.style.width = tempWidth;
        overlay.style.height = tempHeight;
        const newRect = overlay.getBoundingClientRect();
        overlay.style.width = frameR.width + "px";
        overlay.style.height = frameR.height + "px";
        void overlay.offsetWidth;
        overlay.style.transition = `left ${enlargeTransitionMs}ms ease, top ${enlargeTransitionMs}ms ease, width ${enlargeTransitionMs}ms ease, height ${enlargeTransitionMs}ms ease`;
        // center on the viewport (screen) rather than relative frame
        const rootRect = rootRef.current!.getBoundingClientRect();
        const centeredLeft =
          (window.innerWidth - newRect.width) / 2 - rootRect.left;
        const centeredTop =
          (window.innerHeight - newRect.height) / 2 - rootRect.top;
        requestAnimationFrame(() => {
          overlay.style.left = `${centeredLeft}px`;
          overlay.style.top = `${centeredTop}px`;
          overlay.style.width = tempWidth;
          overlay.style.height = tempHeight;
        });
        const cleanupSecond = () => {
          overlay.removeEventListener("transitionend", cleanupSecond);
          overlay.style.transition = prevTransition;
        };
        overlay.addEventListener("transitionend", cleanupSecond, {
          once: true,
        });
        // fallback in case transitionend doesn't fire (e.g. 0ms)
        setTimeout(() => {
          if (overlay.parentElement) cleanupSecond();
        }, Math.max(50, enlargeTransitionMs + 50));
      };
      overlay.addEventListener("transitionend", onFirstEnd);
      // fallback to ensure the resize step runs even when transitionend isn't fired
      setTimeout(() => {
        if (overlay.parentElement) onFirstEnd();
      }, Math.max(50, enlargeTransitionMs + 50));
    }
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("dg-scroll-lock");
    };
  }, []);

  const cssStyles = `
    .sphere-root {
      --radius: 520px;
      --viewer-pad: 72px;
      --circ: calc(var(--radius) * 3.14);
      --rot-y: calc((360deg / var(--segments-x)) / 2);
      --rot-x: calc((360deg / var(--segments-y)) / 2);
      --item-width: calc(var(--circ) / var(--segments-x));
      --item-height: calc(var(--circ) / var(--segments-y));
    }
    
    .sphere-root * { box-sizing: border-box; }
    .sphere, .sphere-item, .item__image { transform-style: preserve-3d; }
    
    .stage {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      position: absolute;
      inset: 0;
      margin: auto;
      perspective: calc(var(--radius) * 2);
      perspective-origin: 50% 50%;
    }
    
    .sphere {
      transform: translateZ(calc(var(--radius) * -1));
      will-change: transform;
      position: absolute;
    }
    
    .sphere-item {
      width: calc(var(--item-width) * var(--item-size-x));
      height: calc(var(--item-height) * var(--item-size-y));
      position: absolute;
      top: -999px;
      bottom: -999px;
      left: -999px;
      right: -999px;
      margin: auto;
      transform-origin: 50% 50%;
      backface-visibility: hidden;
      transition: transform 300ms;
      transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg))) 
                 rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg))) 
                 translateZ(var(--radius));
    }
    
    .sphere-root[data-enlarging="true"] .scrim {
      opacity: 1 !important;
      pointer-events: all !important;
      z-index: 99996 !important;
    }
    
    @media (max-aspect-ratio: 1/1) {
      .viewer-frame {
        height: auto !important;
        width: 100% !important;
      }
    }
    
    body.dg-scroll-lock {
      position: fixed !important;
      top: 0;
      left: 0;
      width: 100% !important;
      height: 100% !important;
      overflow: hidden !important;
      touch-action: none !important;
      overscroll-behavior: contain !important;
    }
    .item__image {
      position: absolute;
      inset: 10px;
      border-radius: var(--tile-radius, 12px);
      overflow: hidden;
      cursor: pointer;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      transition: transform 300ms;
      pointer-events: auto;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
    .item__image--reference {
      position: absolute;
      inset: 10px;
      pointer-events: none;
    }
  `;

  const navigate = useNavigate();

  return (
    <>
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-65 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#082A4F"
          activeColor="#ffffff"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Logo */}
      <button
        className="group fixed top-4 left-4 z-50 px-2.5 py-1 rounded-full transition-all hover:shadow-xl"
        onClick={() => navigate("/")}
        style={{ ["--logo-blue" as any]: "#3b82f6" }}
        aria-label="Go home"
      >
        <motion.div
          className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mb-3"
          initial={{ rotateY: 0, opacity: 0 }}
          animate={{ rotateY: 360, opacity: 1 }}
          transition={{
            rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
            opacity: { duration: 1, delay: 0.2 },
          }}
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "visible",
            perspective: "1000px",
          }}
        >
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute inset-0 will-change-transform"
              animate={{
                rotateZ: ring % 2 === 0 ? 360 : -360,
              }}
              transition={{
                duration: 8 * ring,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className={`absolute inset-0 rounded-full border-2 ${
                  ring === 1
                    ? "border-[#00d4ff]/40"
                    : ring === 2
                    ? "border-purple-500/40"
                    : "border-yellow-500/40"
                }`}
                style={{
                  transform: `scale(${1 + ring * 0.12}) rotateX(${
                    ring * 25
                  }deg)`,
                }}
              />
            </motion.div>
          ))}

          <motion.div
            className="relative rounded-full overflow-hidden border-4 border-white/20 shadow-2xl shadow-purple-500/50 m-2 sm:m-3 md:m-4 z-10 bg-blue-600"
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              boxShadow: [
                "0 0 40px rgba(124, 58, 237, 0.5)",
                "0 0 80px rgba(0, 212, 255, 0.5)",
                "0 0 40px rgba(251, 191, 36, 0.5)",
                "0 0 40px rgba(124, 58, 237, 0.5)",
              ],
            }}
            transition={{
              scale: { duration: 0.8, delay: 0.3 },
              boxShadow: { duration: 4, repeat: Infinity },
            }}
          >
            <img
              src={logoImage}
              alt="Mudofaa Vazirligi Sport Markazi Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error("Logo image failed to load:", e);
                (e.target as HTMLImageElement).style.display = "none";
              }}
              onLoad={() => {
                console.log("Logo image loaded successfully");
              }}
            />
          </motion.div>

          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full will-change-transform"
              style={{
                left: "50%",
                top: "50%",
                background: ["#00d4ff", "#7c3aed", "#fbbf24"][i % 3],
              }}
              animate={{
                x: Math.cos((i * Math.PI * 2) / 8) * 40,
                y: Math.sin((i * Math.PI * 2) / 8) * 40,
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}

          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00d4ff] via-purple-500 to-yellow-500 blur-2xl opacity-40"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </button>

      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
      {/* Left side */}
      <div className="absolute left-10 top-[50%] translate-y-[-50%] z-50 text-white max-w-[300px] w-full max-h-[400px] custom-scrollbar overflow-y-auto bg-gradient-to-br from-slate-900/90 to-slate-800/50 rounded-3xl p-6 shadow-2xl transition-all duration-300 hover:shadow-slate-300/60 hover:border-slate-400/70">
        <div className="flex flex-col gap-4">
          <div>
            <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition">
              👥 Jami sportchilar: 200 ta
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center flex-col justify-center bg-blue-100/10 dark:bg-blue-900/20 rounded-xl p-3 shadow">
              {/* <img src={man} alt="Man" className="w-8 h-8" /> */}
              <span className="text-sm">
                O'g'il bollar
              </span>
              <span className="text-blue-500 dark:text-blue-200 font-semibold mt-1">
                136
              </span>
            </div>

            <div className="flex items-center flex-col justify-center bg-pink-100/10 dark:bg-pink-900/20 rounded-xl p-3 shadow">
              {/* <img src={woman} alt="Woman" className="w-8 h-8" /> */}
              <span className="text-sm">
                Qizlar
              </span>
              <span className="text-pink-600 dark:text-pink-200 font-semibold mt-1">
                64
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center justify-center gap-2 p-3 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
              <Trophy className="w-4 h-4 text-yellow-400" />
              15
            </div>
            <div className="flex items-center justify-center gap-2 p-3 bg-gray-500/10 rounded-2xl border border-gray-500/20">
              <Medal className="w-4 h-4 text-gray-400" />7
            </div>
            <div className="flex items-center justify-center gap-2 p-3 bg-orange-500/10 rounded-2xl border border-orange-500/20">
              <Award className="w-4 h-4 text-orange-500" />6
            </div>
          </div>
          <div className="flex items-center gap-2 text-blue-300">
            <Award className="w-4 h-4" />
            Umumiy medallar soni: 28 ta
          </div>
        </div>
      </div>

      <div
        ref={rootRef}
        className="sphere-root relative ml-auto h-full"
        style={
          {
            ["--segments-x" as any]: segments,
            ["--segments-y" as any]: segments,
            ["--overlay-blur-color" as any]: overlayBlurColor,
            ["--tile-radius" as any]: imageBorderRadius,
            ["--enlarge-radius" as any]: openedImageBorderRadius,
            ["--image-filter" as any]: grayscale ? "grayscale(1)" : "none",
          } as React.CSSProperties
        }
      >
        <main
          ref={mainRef}
          className="absolute inset-0 grid place-items-center overflow-hidden select-none bg-transparent mx-auto"
          style={{
            touchAction: "none",
            WebkitUserSelect: "none",
          }}
        >
          <div className="stage">
            <div ref={sphereRef} className="sphere ml-96">
              {items.map((it, i) => (
                <div
                  key={`${it.x},${it.y},${i}`}
                  className="sphere-item absolute m-auto"
                  data-src={it.src}
                  data-alt={it.alt}
                  data-desc={it.desc}
                  data-offset-x={it.x}
                  data-offset-y={it.y}
                  data-size-x={it.sizeX}
                  data-size-y={it.sizeY}
                  style={
                    {
                      ["--offset-x" as any]: it.x,
                      ["--offset-y" as any]: it.y,
                      ["--item-size-x" as any]: it.sizeX,
                      ["--item-size-y" as any]: it.sizeY,
                      top: "-999px",
                      bottom: "-999px",
                      left: "-999px",
                      right: "-999px",
                    } as React.CSSProperties
                  }
                >
                  <div
                    className="item__image absolute block overflow-hidden cursor-pointer bg-white/10 border-1 border-white/20 hover:bg-white/50 transition-all duration-300"
                    role="button"
                    tabIndex={0}
                    aria-label={it.alt || "Open image"}
                    onClick={(e) => {
                      if (performance.now() - lastDragEndAt.current < 80)
                        return;
                      openItemFromElement(e.currentTarget as HTMLElement);
                    }}
                    onTouchEnd={(e) => {
                      if (performance.now() - lastDragEndAt.current < 80)
                        return;
                      openItemFromElement(e.currentTarget);
                    }}
                    style={{
                      inset: "10px",
                      borderRadius: `var(--tile-radius, ${imageBorderRadius})`,
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <img
                      src={it.src}
                      draggable={false}
                      alt={it.alt}
                      className="w-full h-full object-cover pointer-events-none"
                      style={{
                        backfaceVisibility: "hidden",
                        filter: `var(--image-filter, ${
                          grayscale ? "grayscale(1)" : "none"
                        })`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="absolute inset-0 m-auto z-[3] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(235, 235, 235, 0) 65%, var(--overlay-blur-color, ${overlayBlurColor}) 100%)`,
            }}
          />

          <div
            className="absolute left-0 right-0 top-0 h-[120px] z-[90] pointer-events-none rotate-180"
            style={{
              background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))`,
            }}
          />
          <div
            className="absolute left-0 right-0 bottom-0 h-[120px] z-[5] pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))`,
            }}
          />

          <div
            ref={viewerRef}
            className="absolute inset-0 z-[99990] pointer-events-none flex items-center justify-center"
            style={{ padding: "var(--viewer-pad)" }}
          >
            <div
              ref={scrimRef}
              className="scrim absolute inset-0 z-[99995] pointer-events-none opacity-0 transition-opacity duration-500"
              style={{
                background: "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(3px)",
              }}
            />
            <div
              ref={frameRef}
              className="viewer-frame h-full aspect-square flex"
              style={{
                borderRadius: `var(--enlarge-radius, ${openedImageBorderRadius})`,
              }}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default OurTeam;
